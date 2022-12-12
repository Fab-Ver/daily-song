<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - Sign Up";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/signup.js");

require 'template/empty-base.php';

?>