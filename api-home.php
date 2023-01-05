<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {

    $posts = $dbh->getPostOfDay("2023-01-04");//date('Y-m-d')
    if(!isset($posts) || count($posts) <= 0){
        var_dump("non ci sono post oggi");
    }

    //$posts["sessionUsername"] = $_SESSION["username"];
    $i = 0;
    foreach($posts as $post){
        $time_ago = $dbh->getTimePost($post["postID"]);
        $diffHours = date('H') - $time_ago["hour_part"];
        
        if($diffHours <= 0){
            $diffMinute = date('i') - $time_ago["minute_part"];
            if($diffMinute <= 0){
                $posts[$i]["time_ago"] = "now";
            }else{
                $posts[$i]["time_ago"] = "$diffMinute minute ago";
            }
        }else{
            $posts[$i]["time_ago"] = "$diffHours hours ago";
        }

        $posts[$i]["profilePicture"] = $dbh->getUserProfile($post["username"])["profilePicture"];

        $posts[$i]["reactions"] = $dbh->getReactions($post["postID"]);
        $posts[$i]["numLike"] = count(array_filter($posts[$i]["reactions"], function($p) { return $p["likes"]; }));
        $posts[$i]["numDislike"] = count(array_filter($posts[$i]["reactions"], function($p) { return !$p["likes"]; }));

        if($dbh->checkTrack($post["trackID"])){
            $posts[$i]["track"] = $dbh->getTrack($post["trackID"]);
        }

        $posts[$i]["genre"] = $dbh->getPostPreferredGenres($post["postID"]);

        $i++;
    }

} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($posts);
?>