<?php
require("bootstrap.php");
secure_session_start();

if (isUserLoggedIn()){
    $result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];
    $result["sessionUser"] = $_SESSION["username"];
    if(isset($_POST["username"]) && isset($_POST["value"])){
        if($_POST["value"] == "add"){
            $result["followButton"] = $dbh->insertFollowed($_POST["username"], $result["username"]);
        } else if($_POST["value"] == "remove"){
            $result["followButton"] = $dbh->removeFollowed($_POST["username"], $result["username"]);
        }
    } else if (isset($_GET["kind"])) {
        $data = $_GET["kind"];
        if($data=="follower"){
            $result["searchResult"] = $dbh->getUserFollower($result["username"]);
            $result["typeOfSearch"] = "follower";
        }
        else if($data=="followed"){
            $result["searchResult"] = $dbh->getUserFollowed($result["username"]);
            $result["typeOfSearch"] = "followed";
        }
        foreach($result["searchResult"] as &$user){
            $user["profilePicture"] = UPLOAD_DIR.$user["profilePicture"];
            $user["canFollow"] = canFollow($user["username"], $dbh->getUserFollowed($_SESSION["username"]));
        }
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>