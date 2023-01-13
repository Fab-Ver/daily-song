<?php
require("bootstrap.php");
secure_session_start();

if(isUserLoggedIn()){
    /**
     * Insert all the profile data
     */
    $result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];
    $result["sessionUsername"] = $_SESSION["username"];
    $result["isMyProfile"] = $_SESSION["username"] == $result["username"];
    $result["canFollow"] = $result["isMyProfile"] ? false : canFollow($result["username"], $dbh->getUserFollowed($_SESSION["username"]));
    $user = $dbh->getUserProfile($result["username"]);
    $result["firstName"] = $user["firstName"];
    $result["lastName"] = $user["lastName"];
    $result["profilePicture"] = UPLOAD_DIR.$user["profilePicture"];
    $result["profileNumberOfFollowed"] = count($dbh->getUserFollowed($result["username"]));
    $result["profileNumberOfFollower"] = count($dbh->getUserFollower($result["username"]));
    $result["preferredGenres"] = $dbh->getUserPreferredGenres($result["username"]);
    $result["posts"] = $dbh->getUserPosts($result["username"]);
    foreach($result["posts"] as &$post){
        $post["comments"] = $dbh->getPostComments($post["postID"]);
        for ($j = 0; $j < count($post["comments"]); $j++){
            $post["comments"][$j]["profilePicture"] = UPLOAD_DIR.$post["comments"][$j]["profilePicture"];
        }
        $post["reactions"] = $dbh->getReactions($post["postID"]);
        $post["isMyReaction"] = count($dbh->checkReaction($post["postID"], $_SESSION["username"]));
        if($post["isMyReaction"]){
            $post["myReaction"] = $dbh->checkReaction($post["postID"], $_SESSION["username"])[0]["likes"];
        }
        $post["numLike"] = count(array_filter($post["reactions"], function($p) { return $p["likes"]; }));
        $post["numDislike"] = count(array_filter($post["reactions"], function($p) { return !$p["likes"]; }));
    }
}

header("Content-Type: application/json");
echo json_encode($result);
