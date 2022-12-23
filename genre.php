<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $genres = $dbh->getGenres();
    header('Content-Type: application/json');
    echo json_encode($genres);
} else {
    header('Location: index.php');
}
?>