<?php
require("bootstrap.php");
secure_session_start();

//$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

if(isset($_POST["postID"]) && isset($_POST["isLike"]) && isset($_POST["user"])){
    $result["updateLike"] = $dbh->insertLike($_POST["postID"], $_POST["user"], $_POST["isLike"] ? 1 : 0);
    //aggiorno il numero dei like e dislike del post
    $result["reactions"] = $dbh->getReactions($_POST["postID"]);
    $result["numLike"] = count(array_filter($result["reactions"], function($p) { return $p["likes"]; }));
    $result["numDislike"] = count(array_filter($result["reactions"], function($p) { return !$p["likes"]; }));
}

header("Content-Type: application/json");
echo json_encode($result);
?>