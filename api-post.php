<?php
require("bootstrap.php");
secure_session_start();

if(isUserLoggedIn()) {
    if(isset($_POST["postID"]) && isset($_POST["likeValue"])) {
        $likeValue = Input::validate_boolean($_POST["likeValue"]);
        if(count($dbh->checkReaction($_POST["postID"], $_SESSION["username"])) > 0) {
            if($dbh->checkReaction($_POST["postID"], $_SESSION["username"])[0]["likes"] == $_POST["likeValue"]) {
                $result["updateLike"] = $dbh->removeLike($_POST["postID"], $_SESSION["username"]);
                $result["isMyReaction"] = false;
            } else {
                $result["updateLike"] = $dbh->updateLike($_POST["postID"], $_SESSION["username"], $likeValue);
                $result["isMyReaction"] = true;
            }
        } else {
            $result["updateLike"] = $dbh->insertLike($_POST["postID"], $_SESSION["username"], $likeValue);
            $result["isMyReaction"] = true;
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