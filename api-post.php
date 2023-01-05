<?php
require("bootstrap.php");
secure_session_start();

if (isUserLoggedIn()){
    if(isset($_POST["postID"]) && isset($_POST["isLike"])){
        $likeValue = Input::validate_boolean($_POST["isLike"]);
        if(count($dbh->checkReaction($_POST["postID"], $_SESSION["username"])) > 0){
            $result["updateLike"] = $dbh->updateLike($likeValue, $_POST["postID"], $_SESSION["username"]);
        } else {
            $result["updateLike"] = $dbh->insertLike($_POST["postID"], $_SESSION["username"], $likeValue);
        }
        //aggiorno il numero dei like e dislike del post
        $result["reactions"] = $dbh->getReactions($_POST["postID"]);
        $result["numLike"] = count(array_filter($result["reactions"], function($p) { return $p["likes"]; }));
        $result["numDislike"] = count(array_filter($result["reactions"], function($p) { return !$p["likes"]; }));
    }
}


header("Content-Type: application/json");
echo json_encode($result);
?>