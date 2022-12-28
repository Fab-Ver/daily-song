<?php
require_once 'bootstrap.php';
secure_session_start();

$templateParams["title"] = "Nome sito - Reset Password";

if(isset($_POST["password"])){
    $result["tokenError"] = false;
    $result["errorReset"] = false;
    $request = $dbh->getResetRequest($_SESSION["token"]);
    if(count($request)!=0){
        if(hours_date_diff(date("Y-m-d H:i:s"),$request[0]["expDate"]) < 24){
            $email = $request[0]["email"];
            $password = password_hash($_POST["password"],PASSWORD_DEFAULT);
            $res = $dbh->resetPassword($email,$password);
            if($res){
                $dbh->removeToken($_SESSION["token"]);
                unset($_SESSION["token"]);
            } else {
                $result["errorReset"] = true;
            }
        } else {
            $result["tokenError"] = true;
        }
    } else {
        $result["tokenError"] = true;
    }
    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    if(!isUserLoggedIn()){
        if(isset($_GET["token"])){
            $request = $dbh->getResetRequest($_GET["token"]);
            if(count($request)!=0){
                if(hours_date_diff(date("Y-m-d H:i:s"),$request[0]["expDate"]) < 24){
                    $_SESSION["token"] = $_GET["token"];
                    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/reset_password.js");
                    require 'template/empty-base.php';
                } else {
                    $templateParams["error"] = '
                    <article>
                        <h2>Expired Link</h2>
                        <p>The link is expired. You are trying to use an expired link, which is valid for only 24 hours (1 days after request).</p>
                        <p><a href="forgot_password.php">Click here</a> to reset password.</p>
                    </article>';
                    require 'template/empty-base.php';
                }
            } else {
                $templateParams["error"] = '
                <article>
                    <h2>Invalid Link</h2>
                    <p>The link is invalid/expired. Either you did not copy the correct link from the email, or you have already used the token (in this case it is has been disabled).</p>
                    <p><a href="forgot_password.php">Click here</a> to reset password.</p>
                </article>';
                require 'template/empty-base.php';
            }
            
        } else {
            header('Location: index.php');
        }
    } else {
        header('Location: homepage.php');
    }
}
?>