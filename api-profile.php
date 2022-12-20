<?php
require("bootstrap.php");
$_SESSION["id"] = "saracappe";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["id"];
$result["isMyProfile"] = $_SESSION["id"] == $result["username"];
$result["canFollow"] =true;
$user = $dbh->getUserProfile($result["username"]);
$result["firstName"] = $user["firstName"];
$result["lastName"] = $user["lastName"];
$result["profilePicture"] = UPLOAD_DIR.$user["profilePicture"];
$result["profileNumberOfFollowed"] = "70"; //$dbh->length(getUserFollowed($result["username"]));
$result["profileNumberOfFollower"] = "120"; //$dbh->length(getUserFollower($result["username"]));
//$result["preferredGenres"] = $dbh->getUserPreferredGenres($result["username"]);
$result["posts"] = [UPLOAD_DIR."post1.jpg", UPLOAD_DIR."post2.jpg", UPLOAD_DIR."post3.jpg", UPLOAD_DIR."post4.jpg"]; //$dbh->getUserPosts($result["username"]);

header("Content-Type: application/json");
echo json_encode($result);
?>