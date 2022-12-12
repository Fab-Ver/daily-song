<?php
require_once 'bootstrap.php';
$result["loggedIn"] = false;

$email = $_POST["email"];
$password = $_POST["password"];

if(!isset($_SESSION["loggedIn"]) && !isset($email) && !isset($password)){
    $result["loggedIn"] = false;
} else if(isset($_SESSION["loginIn"])){
    $result["loggedIn"] = true;
} else {
    $user = $dbh->getUser($email);
    if(count($user) > 0){
        $hash = $user[0]["passwordHash"];
        if(password_verify($password,$hash)){
            session_regenerate_id();
            $_SESSION['loggedIn'] = true;
            $_SESSION['email'] = $user[0]["email"];
            $_SESSION['id'] = $user[0]["username"];
            $result["loggedIn"] = true;
        } else {
            $result["errorPassword"] = "Wrong password";
        }
    } else {
        $result["errorEmail"] = "Email not found";
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>