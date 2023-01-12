<?php
require_once 'bootstrap.php';
secure_session_start();

$templateParams["title"] = "DailySong - Reset Password";

if(!isUserLoggedIn()){
    if(isset($_GET['token'])){
        $token = $_GET['token'];
        if(Input::is_hex($token)){
            $request = $dbh->getResetRequest($token);
            if(count($request) != 0){
                if(hours_date_diff(date("Y-m-d H:i:s"),$request[0]['expDate']) < 24){
                    $_SESSION['token'] = $_GET['token'];
                    $templateParams['js'] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/reset_password.js");
                    require 'template/empty-base.php';
                } else {
                    $templateParams['error'] = EXPIRED_LINK;
                    require 'template/empty-base.php';
                }
            } else {
                $templateParams['error'] = INVALID_LINK;
                require 'template/empty-base.php';
            }
        } else {
            $templateParams['error'] = INVALID_LINK;
            require 'template/empty-base.php';
        }
    } else if (isset($_POST['password'], $_POST['confirmPassword'])){
        $result['errorMsg'] = "";
        $result['reset'] = false;
        $password = Input::filter_string($_POST['password']);
        $confirmPassword = Input::filter_string($_POST['confirmPassword']);
        [$secure,$errorPassword] = Input::is_secure_password($password);
        if($secure){
            if(strcmp($password,$confirmPassword) === 0){
                if(isset($_SESSION['token']) && Input::is_hex($_SESSION['token'])){
                    $token = $_SESSION['token'];
                    $request = $dbh->getResetRequest($token);
                    if(count($request)!=0){
                        if(hours_date_diff(date("Y-m-d H:i:s"),$request[0]['expDate']) < 24){
                            $email = $request[0]['email'];
                            $hash_password = password_hash($password,PASSWORD_DEFAULT);
                            if($dbh->resetPassword($email,$hash_password)){
                                $result['reset'] = true;
                                $dbh->removeTokens($email);
                                unset($_SESSION['token']);
                            } else {
                                $result['errorMsg'] = UNDEFINED;
                            }
                        } else {
                            $result['errorMsg'] = EXPIRED_TOKEN;
                        }
                    } else {
                        $result['errorMsg'] = INVALID_TOKEN;
                    }
                } else {
                    $result['errorMsg'] = INVALID_TOKEN;
                }
            } else {
                $result['errorMsg'] = PASSWORD_MISMATCH;
            }
        } else {
            $result['errorMsg'] = $errorPassword;
        }
        header('Content-Type: application/json');
        echo json_encode($result);
    } else {
        $templateParams["error"] = INVALID_LINK;
        require 'template/empty-base.php';
    }
} else {
    if(isset($_POST['password'], $_POST['confirmPassword'])) {
        $result['errorMsg'] = "";
        $result['reset'] = false;
        $password = Input::filter_string($_POST['password']);
        $confirmPassword = Input::filter_string($_POST['confirmPassword']);
        $email = Input::filter_string($_SESSION['email']);
        $username = Input::filter_string($_SESSION['username']);
        [$secure,$errorPassword] = Input::is_secure_password($password);
        if($secure){
            if(strcmp($password,$confirmPassword) === 0){
                $hash_password = password_hash($password,PASSWORD_DEFAULT);
                if($dbh->resetPassword($email,$hash_password)){
                    $result['reset'] = true;
                    $user = $dbh->findUserByUsername($username)[0];
                    registerLoggedUser($user['username'],$user['email'],$user['passwordHash']);
                } else {
                    $result['errorMsg'] = UNDEFINED;
                } 
            } else {
                $result['errorMsg'] = PASSWORD_MISMATCH;
            }
        } else {
            $result['errorMsg'] = $errorPassword;
        }
        header('Content-Type: application/json');
        echo json_encode($result);
    } else {
        $templateParams['js'] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/reset_password.js");
        require 'template/empty-base.php';
    }
}
?>