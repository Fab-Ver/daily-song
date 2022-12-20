<?php
require("bootstrap.php");

if(isset($_GET["kind"])) {
    $data = $_GET["kind"];
    if($data=="follower"){
        $result["searchResult"] = ["mario", "bigo", "fabio", "rachele"]; //$dbh->getUserFollower($result["username"]);
        $result["typeOfSearch"] = "follower";
    }
    else if($data=="followed"){
        $result["searchResult"] = ["gianni", "arianna", "michele"]; //$dbh->getUserFollowed($result["username"]);
        $result["typeOfSearch"] = "followed";
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>