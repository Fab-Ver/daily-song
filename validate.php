<?php
require_once 'bootstrap.php';
secure_session_start();

$result['loggedIn'] = false;
$result["errorEmail"] = false;
$result["errorUsername"] = false;
$result["validateError"] = false;

if(!isUserLoggedIn()){
    if(isset($_POST["checkEmail"])){
        if(count($dbh->getUser($_POST["checkEmail"])) > 0){
            $result["errorEmail"] = true;
        }
    } else if (isset($_POST["checkUsername"])){
        if(count($dbh->checkUsername($_POST["checkUsername"])) > 0){
            $result["errorUsername"] = true;
        }
    } else if(isset($_POST["email"],$_POST["first_name"],$_POST["last_name"],$_POST["birth_date"],$_POST["telephone"],$_POST["username"],$_POST["password"],$_POST["profile_picture"],$_POST["notification"],$_POST["favoriteGenres"])){
            $hash = password_hash($_POST["password"],PASSWORD_DEFAULT);
            if($dbh->insertUser($_POST["email"],$_POST["first_name"],$_POST["last_name"],$_POST["birth_date"],$_POST["telephone"],$_POST["username"],$hash,$_POST["profile_picture"])){
                $dbh->insertSettings($_POST["username"],$_POST["notification"]);
                $genresIDs = json_decode($_POST["favoriteGenres"]);
                $dbh->insertFavoriteGenres($_POST["username"],$genresIDs);
                registerLoggedUser($_POST["username"],$_POST["email"]);
                $result['loggedIn'] = true;
            } else {
                $result["validateError"] = true;
            }         
    } else {
        $result["validateError"] = true;
    }
} else {
    $result['loggedIn'] = true;
}

header('Content-Type: application/json');
echo json_encode($result);
