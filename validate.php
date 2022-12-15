<?php
require_once 'bootstrap.php';

if(isset($_POST["checkEmail"])){
    $result["errorEmail"] = false;
    if(count($dbh->getUser($_POST["checkEmail"])) > 0){
        $result["errorEmail"] = true;
    }
} else if (isset($_POST["checkUsername"])){
    $result["errorUsername"] = false;
    if(count($dbh->checkUsername($_POST["checkUsername"])) > 0){
        $result["errorUsername"] = true;
    }
} else if(isset($_POST["email"]) &&
          isset($_POST["first_name"]) &&
          isset($_POST["last_name"]) &&
          isset($_POST["birth_date"]) && 
          isset($_POST["telephone"]) &&
          isset($_POST["username"]) &&
          isset($_POST["password"]) &&
          isset($_POST["profile_picture"]) &&
          isset($_POST["notification"])){
        $hash = password_hash($_POST["password"],PASSWORD_DEFAULT);
        if($dbh->insertUser($_POST["email"],$_POST["first_name"],$_POST["last_name"],$_POST["birth_date"],$_POST["telephone"],$_POST["username"],$hash,$_POST["profile_picture"],$_POST["notification"])){
            $result["validateError"] = false;
            session_regenerate_id();
            $_SESSION['loggedIn'] = true;
            $_SESSION['email'] = $_POST["email"];
            $_SESSION['id'] = $_POST["username"];
        } else {
            $result["validateError"] = true;
        }         
} else {
    $result["validateError"] = true;
}

header('Content-Type: application/json');
echo json_encode($result);
