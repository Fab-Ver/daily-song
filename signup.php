<?php
require_once 'bootstrap.php';
secure_session_start();

if(!isUserLoggedIn()){
    $templateParams["title"] = "Nome sito - Sign Up";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/signup.js");

    require 'template/empty-base.php';
} else {
    header('Location: homepage.php');
}
?>