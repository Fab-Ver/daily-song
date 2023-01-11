<?php
require_once 'bootstrap.php';
require 'utils/mail_helper.php';
secure_session_start();
$result['loggedIn'] = false;

if(!isUserLoggedIn()){
    $result['errorMsg'] = "";
    $result['elemID'] = "";
    if(isset($_POST["checkEmail"])){
        $result['valid'] = false;
        $email = Input::filter_string($_POST['checkEmail']);
        if(Input::validate_email($email)){
            if(count($dbh->findUsernameByEmail($email)) == 0){
                $result['errorMsg'] = NO_USER;
            } else {
                $result['valid'] = true;
            }
        } else {
            $result['errorMsg'] = INVALID_EMAIL;
        }
    } else if (isset($_POST['email'], $_POST['password'], $_POST['remember_me'])){
        $email = Input::filter_string($_POST['email']);
        $password = Input::filter_string($_POST['password']);
        $remember_me = Input::validate_boolean($_POST['remember_me']);

        if(Input::validate_email($email)){
            $user = $dbh->findUsernameByEmail($email);
            if(count($user) != 0){
                $username = $user[0]['username'];
                if($dbh->isUserActive($username)){
                    if(login($username,$password,$remember_me)){
                        $result['loggedIn'] = true;
                        try {
                            $mail = new MailHelper();
                            if($dbh->checkAccountNotification($username)){
                                $mail->sendEmailNotification($email,createNewAccessEmail($username),"New access to DailySong");
                            }
                        } catch (Exception $e) {
                            /**Mail doesn't work because config.php variables not set,no action required */
                        }
                        
                    } else {
                        $result['errorMsg'] = WRONG_PASSWORD;
                        $result['elemID'] = 'login_password';
                    }
                } else {
                    try{
                        $mail = new MailHelper();
                        $mail->sendBlockedAccountEmail($email);
                    } catch (Exception $e){
                        /**Mail doesn't work because config.php variables not set, no action required*/
                    }
                    $result['errorMsg'] = DISABLED_USER;
                }
            } else {
                $result['errorMsg'] = NO_USER;
                $result['elemID'] = 'login_email';
            }
        } else {
            $result['errorMsg'] = INVALID_EMAIL;
            $result['elemID'] = 'login_email';
        } 
    } else {
        $result['errorMsg'] = 'Bad Request';
    }
} else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>