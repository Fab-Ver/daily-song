<?php
require_once 'bootstrap.php';

$templateParams["title"] = "DailySong - Search";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/search.js");

require 'template/base.php'
?>