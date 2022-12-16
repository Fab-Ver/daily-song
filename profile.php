<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Nome sito - Profilo";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/profile.js");

require 'template/base.php'
?>