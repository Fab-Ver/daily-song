<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Nome sito - Follower";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/follower.js");

if(isset($_GET["data"])) {
    $data = $_GET["data"];
    if($data == "follower"){
        $result["typeOfSearch"] = "follower";
    }
    else{
        $result["typeOfSearch"] = "followed";
    }
}

require 'template/base.php'
?>