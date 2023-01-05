<?php
require("bootstrap.php");
secure_session_start();

if (isUserLoggedIn()){
    if(isset($_POST["postID"]) && isset($_POST["isLike"])){
        $result["updateLike"] = $dbh->insertLike($_POST["postID"], $_SESSION["username"], $_POST["isLike"] ? 1 : 0);
        //aggiorno il numero dei like e dislike del post
        $result["reactions"] = $dbh->getReactions($_POST["postID"]);
        $result["numLike"] = count(array_filter($result["reactions"], function($p) { return $p["likes"]; }));
        $result["numDislike"] = count(array_filter($result["reactions"], function($p) { return !$p["likes"]; }));
    }
}


header("Content-Type: application/json");
echo json_encode($result);
?>