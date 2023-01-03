<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn() || (isset($_GET['genre']) && $_GET['genre'] == 'get')){
    $genres = $dbh->getGenres();
    header('Content-Type: application/json');
    echo json_encode($genres);
} else {
    header('Location: index.php');
}
?>