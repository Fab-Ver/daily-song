<?php
require_once 'bootstrap.php';
secure_session_start();

if(!isUserLoggedIn()){
    $templateParams["title"] = "DailySong  - Forgot Password";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/forgot_password.js");
    require 'template/empty-base.php';
} else {
    header('Location: homepage.php');
}

?>