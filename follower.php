<?php
require_once 'bootstrap.php';

$templateParams["title"] = "DailySong - Follower";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/profile_header.js", "js/follower.js");

require 'template/base.php'
?>