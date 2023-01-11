<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {
    if(isset($_POST["notId"])){
        $dbh->removeNotification($_POST["notId"]);
    }
    $result = $dbh->getNotification($_SESSION["username"]);
}else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>