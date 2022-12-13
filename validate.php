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
}

header('Content-Type: application/json');
echo json_encode($result);
?>