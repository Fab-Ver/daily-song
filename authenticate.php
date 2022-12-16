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

    if(!isset($_SESSION["loggedIn"]) && !isset($email) && !isset($password)){
        $result["loggedIn"] = false;
    } else if(isset($_SESSION["loginIn"])){
        $result["loggedIn"] = true;
    } else {
        $user = $dbh->getUser($email);
        $hash = $user[0]["passwordHash"];
        $result["errorPassword"] = false;
        if(password_verify($password,$hash)){
            session_regenerate_id();
            $_SESSION['loggedIn'] = true;
            $_SESSION['email'] = $user[0]["email"];
            $_SESSION['id'] = $user[0]["username"];
            $result["loggedIn"] = true;
        } else {
            $result["errorPassword"] = true;
        }
    }
}


header('Content-Type: application/json');
echo json_encode($result);
