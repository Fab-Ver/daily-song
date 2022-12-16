<?php
require("bootstrap.php");

$result["username"] = "saracappp"; //$_SESSION["id"];
$result["firstName"] = "Sara"; //$dbh->getUserProfile()["firstName"];
$result["lastName"] = "Cappelletti"; //$dbh->getUserProfile()["lastName"];
$result["profilePicture"] = UPLOAD_DIR."prova.jpg"; //$dbh->getUserProfile()["profilePicture"]
$result["profileFollowed"] = "70"; //$dbh->getUserFollowed($result["username"]);
$result["profileFollower"] = "120"; //$dbh->getUserFollower($result["username"]);
//$result["preferredGenres"] = $dbh->getUserPreferredGenres($result["username"]);
$result["posts"] = [UPLOAD_DIR."post1.jpg", UPLOAD_DIR."post2.jpg", UPLOAD_DIR."post3.jpg", UPLOAD_DIR."post4.jpg", UPLOAD_DIR."post5.jpg"]; //$dbh->getUserPosts($result["username"]);

header("Content-Type: application/json");
echo json_encode($result);
?>