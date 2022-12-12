<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - Login";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/index.js");

require 'template/empty-base.php';

?>