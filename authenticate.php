<?php
require_once 'bootstrap.php';
secure_session_start();
$result['loggedIn'] = false;

if(!isUserLoggedIn()){
    $result['errorMsg'] = "";
    $result['elemID'] = "";
    if(isset($_POST["checkEmail"])){
        $email = $_POST['checkEmail'];
        if(validateEmail($email)){
            if(count($dbh->findUsernameByEmail($email)) == 0){
                $result['errorMsg'] = NO_USER;
            }
        } else {
            $result['errorMsg'] = INVALID_EMAIL;
        }
    } else if (isset($_POST['email'], $_POST['password'], $_POST['remember_me'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $remember_me = filter_var($_POST['remember_me'], FILTER_VALIDATE_BOOLEAN);

        if(validateEmail($email)){
            $user = $dbh->findUsernameByEmail($email);
            if(count($user) != 0){
                $username = $user[0]['username'];
                if($dbh->isUserActive($username)){
                    if(login($username,$password,$remember_me)){
                        $result['loggedIn'] = true;
                    } else {
                        $result['errorMsg'] = WRONG_PASSWORD;
                        $result['elemID'] = 'login_password';
                    }
                } else {
                    /**
                    * Aggiungere mail all'utente disabilitato
                    */
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
    }
} else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>