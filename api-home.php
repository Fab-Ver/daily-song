<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {

    if(isset($_POST["comment"])){
        $username = $_SESSION["username"];
        $text = Input::filter_string($_POST["comment"]);
        $text = strlen($text > 250) ? substr($text,0,250) : $text;
        $postID = (int)$_POST["post_id"];
        $date = date('Y-m-d H:i:s');

        $dbh->insertPostComment($text, $date, $username, $postID);

        $result["comments"] = $dbh->getPostComments($postID);

        for ($j = 0; $j < count($result["comments"]);$j++){
            $result["comments"][$j]["profilePicture"] = UPLOAD_DIR . $result["comments"][$j]["profilePicture"];
        }

    }else{
        $result = $dbh->getPostOfDay("2023-01-04");//date('Y-m-d')
        if(!isset($result) || count($result) <= 0){
            var_dump("non ci sono post oggi");
        }
    
        $i = 0;
        foreach($result as $post){
            $time_ago = $dbh->getTimePost($post["postID"]);
            $diffHours = date('H') - $time_ago["hour_part"];
            
            if($diffHours <= 0){
                $diffMinute = date('i') - $time_ago["minute_part"];
                if($diffMinute <= 0){
                    $result[$i]["time_ago"] = "now";
                }else{
                    $result[$i]["time_ago"] = "$diffMinute minute ago";
                }
            }else{
                $result[$i]["time_ago"] = "$diffHours hours ago";
            }
    
            $result[$i]["profilePicture"] = UPLOAD_DIR.$dbh->getUserProfile($post["username"])["profilePicture"];
    
            $result[$i]["reactions"] = $dbh->getReactions($post["postID"]);
            $result[$i]["numLike"] = count(array_filter($result[$i]["reactions"], function($p) { return $p["likes"]; }));
            $result[$i]["numDislike"] = count(array_filter($result[$i]["reactions"], function($p) { return !$p["likes"]; }));
    
            if($dbh->checkTrack($post["trackID"])){
                $result[$i]["track"] = $dbh->getTrack($post["trackID"]);
            }
    
            $result[$i]["genre"] = $dbh->getPostPreferredGenres($post["postID"]);

            $result[$i]["comments"] = $dbh->getPostComments($post["postID"]);

            for ($j = 0; $j < count($result[$i]["comments"]);$j++){
                $result[$i]["comments"][$j]["profilePicture"] = UPLOAD_DIR . $result[$i]["comments"][$j]["profilePicture"];
            }
    
            $i++;
        }
    }

} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>