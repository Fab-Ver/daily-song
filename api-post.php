<?php
require("bootstrap.php");
secure_session_start();

$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

if(isset($_POST["postID"]) && isset($_POST["isLike"])){
    if($_POST["isLike"] == "like"){
        $result["updateLike"] = $dbh->insertLike($_POST["postID"], $result["username"]);
        $result["posts"] = $dbh->getUserPosts($result["username"]);
    } else if($_POST["value"] == "dislike"){
        $result["updateLike"] = $dbh->insertDislike($_POST["postID"], $result["username"]);
        $result["posts"] = $dbh->getUserPosts($result["username"]);
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>