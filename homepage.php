<?php
require_once 'bootstrap.php';
secure_session_start();

if(/*isUserLoggedIn()*/true){
    $templateParams["title"] = "Nome sito - New Post";
    $templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/homepage.js");
    $genres = $dbh->getGenres();

    require 'template/base.php';
} else {
    header('Location: index.php');
}

?>