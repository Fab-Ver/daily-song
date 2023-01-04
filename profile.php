<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - Profile";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/profile_header.js", "js/profile.js", "js/modal.js", "js/selector.js");

require 'template/base.php'
?>