<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $dates = $dbh->getUserPostsDate($_SESSION['username']);
    $alreadyPost = false;
    foreach($dates as $date){
        if(date("Y-m-d") === $date['postDate']){
            $alreadyPost = true;
        }
    }
    if($alreadyPost){
        $templateParams['title'] = "DailySong - New Post";
        $templateParams['error'] = '
            <article id="already_post">
                <img src="'.UPLOAD_DIR.'logo.png" alt=""></img>
                <hgroup>
                <h2>You already posted</h2>
                <small>Come back here tomorrow to post your new song of the day</small>
                <hgroup>
            </article>
        ';
        require 'template/base.php';
    } else {
        $templateParams['title'] = 'DailySong - New Post';
        $templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/new_post.js");
    
        require 'template/base.php';
    }
} else {
    header('Location: index.php');
}

?>