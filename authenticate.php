<?php
require_once 'bootstrap.php';
secure_session_start();
$result['loggedIn'] = false;
$result["errorPassword"] = false;
$result["checkBrute"] = false;

if(!isUserLoggedIn()){
    if(isset($_POST["checkEmail"])){
        $result["errorEmail"] = false;
        if(count($dbh->getUser($_POST["checkEmail"])) == 0){
            $result["errorEmail"] = true;
        }
    } else if (isset($_POST["email"]) && isset($_POST["password"])){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $user = $dbh->getUser($email);
        $hash = $user[0]["passwordHash"];
        if($dbh->checkBrute($user[0]["username"])){
            $result["checkBrute"] = true;
        } else {
            if(password_verify($password,$hash)){
                registerLoggedUser($user[0]['username'],$user[0]['email']);
                $result["loggedIn"] = true;
            } else {
                $dbh->insertLoginAttempts($user[0]["username"]);
                $result["errorPassword"] = true;
            }
        }
    }
} else {
    $result["loggedIn"] = true;
}

header('Content-Type: application/json');
echo json_encode($result);
