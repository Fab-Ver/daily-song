<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $templateParams["title"] = "Nome sito - Settings";
    $templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js","js/settings.js");

    require 'template/base.php';
} else {
    header('Location: index.php');
}

?>