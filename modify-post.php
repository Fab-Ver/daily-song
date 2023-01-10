<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    if(isset($_GET['postID'])) {
        $username = Input::filter_string($_SESSION['username']);
        $postID = intval(Input::filter_string($_GET['postID']));
        $post = $dbh->getSinglePost($username,$postID);
        if(count($post) > 0){
            $templateParams['title'] = 'DailySong - Modify Post';
            $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/modify-post.js");
            require 'template/base.php';
        } else {
            $templateParams['error'] = INVALID_POST_ID;
            require 'template/base.php';
        }
    } else if(isset($_POST['postID'],$_POST['description'],$_POST['activeComments'],$_POST['genresID'])){
        $result['errorMsg'] = "";
        $result['updated'] = false;
        $username = Input::filter_string($_SESSION['username']);
        $description = Input::filter_string($_POST['description']);
        $activeComments = Input::validate_boolean($_POST['activeComments']);
        $genresIDs = json_decode($_POST['genresID']);
        $postID = Input::filter_string($_POST['postID']);

        /**
         * Trim description to 500 char
         */
        $description = strlen($description > 500) ? substr($description,0,500) : $description;

        /**
         * Check for genresIDs validity
         */
        if(count($genresIDs) == 0 || count($genresIDs) > 3){
            $result['errorMsg'] .= '<li>'.GENRES_ID_POST.'</li>';
        } else {
            if(!Input::validate_genresID($genresIDs)){
                $result['errorMsg'] .= '<li>'.INVALID_GENRES_ID.'</li>';
            }
        }

        /**
         * Check for postID validity
         */
        if(is_numeric($postID)){
            if(count($dbh->getSinglePost($username,intval($postID))) === 0){
                $result['errorMsg'] .= '<li>'.'The specified postID do not match any of the user posts'.'</li>';
            }
        } else {
            $result['errorMsg'] .= '<li>'.NUMERIC_POST_ID.'</li>';
        }

        if(empty($result['errorMsg'])){
            if($dbh->updatePost(intval($postID),$description,$activeComments)){
                $result['updated'] = true;
                if($dbh->deletePostGenres(intval($postID))){
                    $dbh->insertPostGenres($postID,$genresIDs);
                }
            } else {
                $result['errorMsg'] .= UNDEFINED;
            }
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        }

        header('Content-Type: application/json');
        echo json_encode($result);
    }else if(isset($_POST['postID'])){
        $result['errorMsg'] = "";
        $username = Input::filter_string($_SESSION['username']);
        $postID = intval(Input::filter_string($_POST['postID']));
        $post = $dbh->getSinglePost($username,$postID);
        if(count($post) > 0){
            $result['post'] = $post[0];
            $result['post']['genres'] = $dbh->getPostGenres($postID);
        } else {
            $result['errorMsg'] .= 'The specified postID do not match any of the user posts';
        }
        header('Content-Type: application/json');
        echo json_encode($result);
    }  else {
        $templateParams['error'] = INVALID_POST_ID;
        require 'template/base.php';
    }
        
} else {
    header('Location: index.php');
}

?>