<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    if(isset($_POST['trackID'],$_POST['genresID'],$_POST['description'],$_POST['activeComments'])){
        $result['errorMsg'] = "";
        $username = $_SESSION['username'];
        $trackID = Input::filter_string($_POST['trackID']);
        $genresIDSs = json_decode($_POST['genresID']);
        $description = Input::filter_string($_POST['description']);
        $activeComments = Input::validate_boolean($_POST['activeComments']);
        $dateTime = date("Y-m-d H:i:s");

        /**
         * Check for track ID validity
         */
        if(!empty($trackID)){
            if(!$dbh->checkTrack($trackID)){
                $result['errorMsg'] = '<li>'.INVALID_TRACK_ID.'</li>';
            }
        } else {
            $result['errorMsg'] = '<li>'.EMPTY_TRACK_ID.'</li>';
        }

        /**
         * Trim description to 500 char
         */
        $description = strlen($description > 500) ? substr($description,0,500) : $description;

        /**
         * Check for genresIDs validity
         */
        if(count($genresIDs) == 0 || count($genresIDs) > 3){
            $result['errorMsg'] .= '<li>'.GENRES_ID_NUM.'</li>';
        } else {
            if(!Input::validate_genresID($genresIDs)){
                $result['errorMsg'] .= '<li>'.INVALID_GENRES_ID.'</li>';
            }
        }

        if(empty($result['errorMsg'])){
            [$response,$postID] = $dbh->insertPost($username,$trackID,$description,$activeComments,$dateTime);
            if($response){
                $dbh->insertPostGenres($postID,$genresIDs);
            } else {
                $result['errorMsg'] = UNDEFINED;
            }
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        }
    }
} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>