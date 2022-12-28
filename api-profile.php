<?php
require("bootstrap.php");
secure_session_start();

$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

if(isset($_POST["username"]) && isset($_POST["value"])){
    if($_POST["value"] == "add"){
        $result["followButton"] = $dbh->insertFollowed($_POST["username"], $result["username"]);
    } else if($_POST["value"] == "remove"){
        $result["followButton"] = $dbh->removeFollowed($_POST["username"], $result["username"]);
    }
} else {
    $result["isMyProfile"] = $_SESSION["username"] == $result["username"];
    $result["canFollow"] = $result["isMyProfile"] ? false : canFollow($result["username"], $dbh->getUserFollowed($_SESSION["username"]));
    $user = $dbh->getUserProfile($result["username"]);
    $result["firstName"] = $user["firstName"];
    $result["lastName"] = $user["lastName"];
    $result["profilePicture"] = UPLOAD_DIR.$user["profilePicture"];
    $result["profileNumberOfFollowed"] = count($dbh->getUserFollowed($result["username"]));
    $result["profileNumberOfFollower"] = count($dbh->getUserFollower($result["username"]));
    $result["preferredGenres"] = $dbh->getUserPreferredGenres($result["username"]);
    $result["posts"] = [UPLOAD_DIR."post1.jpg", UPLOAD_DIR."post2.jpg", UPLOAD_DIR."post3.jpg", UPLOAD_DIR."post4.jpg"]; //$dbh->getUserPosts($result["username"]);
}

header("Content-Type: application/json");
echo json_encode($result);
?>