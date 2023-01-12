<?php
require_once 'bootstrap.php';

$templateParams["title"] = "DailySong - Profile";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "utils/functions.js", "js/like.js", "js/profile_header.js",  "js/profile.js", "js/modal.js");

require 'template/base.php'
?>