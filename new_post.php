<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - New Post";
$templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/new_post.js");

require 'template/base.php';
?>