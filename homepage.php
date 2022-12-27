<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $templateParams["title"] = "Nome sito - Home";
    $templateParams["js"] = array("js/config.js","js/home.js");
    $genres = $dbh->getGenres();

    require 'template/base.php';
} else {
    header('Location: index.php');
}

?>