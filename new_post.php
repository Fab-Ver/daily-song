<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - New Post";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/new_post.js");

require 'template/base.php';
?>