<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $templateParams["title"] = "Nome sito - Settings";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/settings.js","js/modal.js");

    require 'template/base.php';
} else {
    header('Location: index.php');
}

?>