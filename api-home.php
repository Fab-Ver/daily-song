<?php
require_once 'bootstrap.php';
secure_session_start();

if (isUserLoggedIn()) {

    if(isset($_POST["comment"],$_POST["post_id"])){
        /**
         * Add a comment and send the notification
         */
        $username = $_SESSION["username"];
        $text = Input::filter_string($_POST["comment"]);
        $text = strlen($text > 250) ? substr($text,0,250) : $text;
        $postID = (int)$_POST["post_id"];
        $date = date('Y-m-d H:i:s');

        $dbh->insertPostComment($text, $date, $username, $postID);
        $temp = $dbh->getUserByPost($postID)[0]["username"];
        if(count($dbh->checkCommentNotification($temp)) !== 0){
            $dbh->insertNotification(date('Y-m-d H-i-s'), 2, $_SESSION["username"], $temp);
        }

        $result["comments"] = $dbh->getPostComments($postID);

        for ($j = 0; $j < count($result["comments"]);$j++){
            $result["comments"][$j]["profilePicture"] = UPLOAD_DIR . $result["comments"][$j]["profilePicture"];
        }
    }else if(isset($_POST["idComment"])){
        /**
         * Remove a comment
         */
        $dbh->deletePostComment($_POST["idComment"]);
        $result["comments"] = $dbh->getPostComments($_POST["idPost"]);
        for ($j = 0; $j < count($result["comments"]);$j++){
            $result["comments"][$j]["profilePicture"] = UPLOAD_DIR . $result["comments"][$j]["profilePicture"];
        }
    }else{
        /**
         * Return the list of selected posts or, failing that, a string of no posts
         * If you don't select date or genres, return today's posts
         */
        if(isset($_POST["day"])){
            $result = $dbh->getPostOfDay($_SESSION["username"],$_POST["day"]);
            $today = 0;
        }else if(isset($_POST["idGenres"])){
            $result = $dbh->getPostByIdGenre($_SESSION["username"],json_decode($_POST["idGenres"]));
            $today = 1;
        }else{
            $result = $dbh->getPostOfDay($_SESSION["username"],date('Y-m-d'));
            $today = 2;
        }
        
        if(count($result) <= 0 && $today === 0){
            $result["no_post"] = "No posts on " . $_POST["day"];
        }else if(count($result) <= 0 && $today === 1){
            $result["no_post"] = "No posts from selected geners";
        }else if(count($result) <= 0 && $today === 2){
            $result["no_post"] = "No post today";
        }else{
            $i = 0;
            foreach($result as $post){
                $time_ago = $dbh->getTimePost($post["postID"]);
                if($today === 0){
                    $result[$i]["time_ago"] = ($time_ago["hour"] < 10 ? '0'.$time_ago["hour"] : $time_ago["hour"]). ":" . ($time_ago["minute"] < 10 ? '0'.$time_ago["minute"] : $time_ago["minute"]);
                }else if($today === 1){
                    $result[$i]["time_ago"] = (string)$time_ago["day"];
                }else{
                    $diffHours = date('H') - $time_ago["hour"];
                    if($diffHours <= 0){
                        $diffMinute = date('i') - $time_ago["minute"];
                        if($diffMinute <= 0){
                            $result[$i]["time_ago"] = "now";
                        }else{
                            $result[$i]["time_ago"] = "$diffMinute minute ago";
                        }
                    }else{
                        $result[$i]["time_ago"] = "$diffHours hours ago";
                    }
                }
        
                $result[$i]["profilePicture"] = UPLOAD_DIR.$dbh->getUserProfile($post["username"])["profilePicture"];
        
                $result[$i]["reactions"] = $dbh->getReactions($post["postID"]);
                $result[$i]["isMyReaction"] = count($dbh->checkReaction($post["postID"], $_SESSION["username"]));
                if($result[$i]["isMyReaction"] > 0){
                    $result[$i]["myReaction"] = $dbh->checkReaction($post["postID"], $_SESSION["username"])[0]["likes"];
                }
                $result[$i]["numLike"] = count(array_filter($result[$i]["reactions"], function($p) { return $p["likes"]; }));
                $result[$i]["numDislike"] = count(array_filter($result[$i]["reactions"], function($p) { return !$p["likes"]; }));
        
                if($dbh->checkTrack($post["trackID"])){
                    $result[$i]["track"] = $dbh->getTrack($post["trackID"])[0];
                }
        
                $result[$i]["genre"] = $dbh->getPostGenres($post["postID"]);
    
                $result[$i]["comments"] = $dbh->getPostComments($post["postID"]);
    
                for ($j = 0; $j < count($result[$i]["comments"]);$j++){
                    $result[$i]["comments"][$j]["profilePicture"] = UPLOAD_DIR . $result[$i]["comments"][$j]["profilePicture"];
                }
                
                $result[$i]["user"] = $_SESSION["username"];
                $i++;
            }
        }
    
    }

} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>