<?php
require_once 'bootstrap.php';
secure_session_start();
$result['errorNewPost'] = false;

if(isUserLoggedIn()){
    $result["loggedIn"] = true;
    if (isset($_POST["description"],$_POST["activeComments"],$_POST["trackID"],$_POST["genresID"],$_POST["dateTime"])){
           $postID = $dbh->insertPost($_POST["description"],$_POST["activeComments"],$_POST["dateTime"],$_POST["trackID"],$_SESSION['username']);
           if($postID != -1){
                $genresIDs = json_decode($_POST["genresID"]);
                $dbh->insertPostGenres($postID,$genresIDs);
           } else {
                $result['errorNewPost'] = true;
           }
    }
} else {
    $result["loggedIn"] = false;
}

header('Content-Type: application/json');
echo json_encode($result);
?>