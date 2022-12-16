<?php
require("bootstrap.php");

//$result["username"] = $_SESSION["id"];
//$result["firstName"] = $dbh->getUserProfile()["firstName"];
//$result["lastName"] = $dbh->getUserProfile()["lastName"];
$result["profilePicture"] = UPLOAD_DIR."prova.jpg"; //$dbh->getUserProfile()["profilePicture"]
//$result["profileFollowed"] = $dbh->getUserFollowed($result["username"]);
//$result["profileFollower"] = $dbh->getUserFollower($result["username"]);
//$result["preferredGenres"] = $dbh->getUserPreferredGenres($result["username"]);
//$result["posts"] = $dbh->getUserPosts($result["username"]);

header("Content-Type: application/json");
echo json_encode($result);
?>