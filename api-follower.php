<?php
require("bootstrap.php");

$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

if(isset($_GET["kind"])) {
    $data = $_GET["kind"];
    if($data=="follower"){
        $result["OldSearchResult"] = $dbh->getUserFollower($result["username"]);
        $result["typeOfSearch"] = "follower";
    }
    else if($data=="followed"){
        $result["OldSearchResult"] = $dbh->getUserFollowed($result["username"]);
        $result["typeOfSearch"] = "followed";
    }
    $result["searchResult"] = array();
    foreach($result["OldSearchResult"] as $user){
        $newUser = array("username" => $user["username"],"profilePicture" => UPLOAD_DIR.$user["profilePicture"]);
        array_push($result["searchResult"], $newUser);
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>