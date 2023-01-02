<?php
require("bootstrap.php");
secure_session_start();

$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

if(isset($_POST["postID"]) && isset($_POST["isLike"])){
    $result["updateLike"] = $dbh->insertLike($_POST["postID"], $result["username"], $isLike);
    $result["posts"] = $dbh->getUserPosts($result["username"]);
}

header("Content-Type: application/json");
echo json_encode($result);
?>