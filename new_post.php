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
        $templateParams['title'] = "Nome sito - New Post";
        $templateParams['error'] = '
            <article>
                <h2>You already posted</h2>
                <p>Come back here tomorrow to post your new song of the day</p>
            </article>
        ';
        require 'template/base.php';
    } else {
        $templateParams['title'] = 'Nome sito - New Post';
        $templateParams["js"] = array("js/config.js","https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/new_post.js");
    
        require 'template/base.php';
    }
} else {
    header('Location: index.php');
}

?>