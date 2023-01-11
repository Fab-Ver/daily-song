<?php
require_once 'bootstrap.php';
require 'utils/mail_helper.php';

secure_session_start();

if(!isUserLoggedIn()){
    if(isset($_POST['email'])){
        $result['errorMsg'] = "";
        $result['sent'] = false;
        $email = Input::filter_string($_POST['email']);
        if(Input::validate_email($email)){
            if(count($dbh->findUsernameByEmail($email)) != 0){
                $token = bin2hex(random_bytes(50));
                $expDate = date("Y-m-d H:i:s");
                if(!$dbh->insertResetRequest($email,$token,$expDate)){
                    $result['errorMsg'] = UNDEFINED;
                } else {
                    try{
                        $mail = new MailHelper();
                        if(!$mail->sendResetPasswordEmail($email,$token)){
                            $result['errorMsg'] = MAIL_NOT_SENT;
                        } else {
                            $result['sent'] = true;
                        }
                    } catch (Exception $e){
                        /**Mail doesn't work because config.php variables not set*/
                        $result['errorMsg'] = MAIL_NOT_SENT;
                    }
                }
            }
        } else {
            $result['errorMsg'] = INVALID_EMAIL;
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