<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {
    /**
     * Check if the user wants to remove a notification
     */
    if(isset($_POST["notId"])){
        $dbh->removeNotification($_POST["notId"]);
    }
    /**
     * Get the list of notifications
     */
    $result = $dbh->getNotification($_SESSION["username"]);
}else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>