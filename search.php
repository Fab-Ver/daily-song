<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - Search";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/search.js");

require 'template/base.php'
?>