<?php
require_once 'bootstrap.php';
$result["loggedIn"] = false;

if(isset($_POST["checkEmail"])){
    $result["errorEmail"] = false;
    if(count($dbh->getUser($_POST["checkEmail"])) == 0){
        $result["errorEmail"] = true;
    }
} else {
    $email = $_POST["email"];
    $password = $_POST["password"];

    /*if(login_check($dbh)){
        $result["loggedIn"] = true;
    } else {*/
        $user = $dbh->getUser($email);
        $hash = $user[0]["passwordHash"];
        $result["errorPassword"] = false;
        if($dbh->checkbrute($user[0]["username"])){
            $result["brute"] = true;
        } else {
            if(password_verify($password,$hash)){
                $_SESSION['loggedIn'] = true;
                $_SESSION['email'] = $user[0]["email"];
                $_SESSION['username'] = $user[0]["username"];
                $result["loggedIn"] = true;
            } else {
                $dbh->insertLoginAttempts($user[0]["username"]);
                $result["errorPassword"] = true;
            }
        }
    //}
}

header('Content-Type: application/json');
echo json_encode($result);
