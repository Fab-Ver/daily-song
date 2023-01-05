<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $templateParams["title"] = "Nome sito - Home";
    $templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js", "js/like.js", "js/home.js", "utils/functions.js");
    
    require 'template/base.php';
} else {
    header('Location: index.php');
}

?>