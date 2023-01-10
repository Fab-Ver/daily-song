<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    if(isset($_GET['postID'])) {
        $username = Input::filter_string($_SESSION['username']);
        $postID = intval($_GET['postID']);
        $post = $dbh->getSinglePost($username,$postID);
        if(count($post) > 0){
            $templateParams['title'] = 'Nome sito - Modify Post';
            $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/modify-post.js");
            require 'template/base.php';
        } else {
            $templateParams['error'] = INVALID_POST_ID;
            require 'template/base.php';
        }
    } else if(isset($_POST['postID'])){
        $username = Input::filter_string($_SESSION['username']);
        $postID = intval($_POST['postID']);
        $result['post'] = $dbh->getSinglePost($username,$postID);
        //$dbh->getPostPreferredGenres()

        header('Content-Type: application/json');
        echo json_encode($result);
    } else {
        $templateParams['error'] = INVALID_POST_ID;
        require 'template/base.php';
    }
        
} else {
    header('Location: index.php');
}

?>