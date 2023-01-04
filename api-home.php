<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {
    $_SESSION["username"] = "sara-capp";
    //$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];

    $posts = $dbh->getPostOfDay(date('Y-m-d'));
    if(!isset($posts) || count($posts) <= 0){
        var_dump("non ci sono post oggi");
    }
    
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

        $posts[$i]["like"] = count($dbh->getReactions($post["postID"]));

        if($dbh->checkTrack($post["trackID"])){
            $posts[$i]["track"] = $dbh->getTrack($post["trackID"]);
        }

        $i++;
    }
    //var_dump($posts);

} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($posts);
?>