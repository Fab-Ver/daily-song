<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    if(isset($_GET['action']) && $_GET['action'] === 'getPost'){
        $username = Input::filter_string($_SESSION['username']);
        $result['post'] = $dbh->getAllUserPosts($username);
        if(count($result['post']) > 0){
            for($i=0;$i<count($result['post']);$i++){
                $result['post'][$i]['comments'] = count($dbh->getPostComments($result['post'][$i]['postID']));
                $result['post'][$i]['reactions'] = count($dbh->getReactions($result['post'][$i]['postID']));
            }
        }
        
        header('Content-Type: application/json');
        echo json_encode($result);
    } else if(isset($_POST['postID'], $_POST['action']) || isset($_POST['postID'], $_POST['action'], $_POST['archived'])){
        $result['errorMsg'] = "";
        $result['done'] = false;
        if($_POST['action'] === 'delete'){
            if(!$dbh->deletePost($_POST['postID'])){
                $result['errorMsg'] = UNDEFINED;
            } else {
                $result['done'] = true;
            }
        } else if($_POST['action'] === 'archive'){
            $archived = Input::validate_boolean($_POST['archived']);
            if(!$dbh->updatePostStatus(intval($_POST['postID']),$archived)){
                $result['errorMsg'] = UNDEFINED;
            } else {
                $result['done'] = true;
            }
        }
        header('Content-Type: application/json');
        echo json_encode($result);
    } else {
        $templateParams['title'] = 'DailySong   - Post Manager';
        $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/modal.js","js/post-manager.js");
    
        require 'template/base.php';
    }   
} else {
    header('Location: index.php');
}

?>