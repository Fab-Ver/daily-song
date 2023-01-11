<?php
require_once 'bootstrap.php';
require 'utils/mail_helper.php';
secure_session_start();

if(isUserLoggedIn()){
    $result['errorMsg'] = "";
    if(isset($_POST['trackID'],$_POST['genresID'],$_POST['description'],$_POST['activeComments'])){
        $result['postInserted'] = false;
        $username = $_SESSION['username'];
        $trackID = Input::filter_string($_POST['trackID']);
        $genresIDs = json_decode($_POST['genresID']);
        $description = Input::filter_string($_POST['description']);
        $activeComments = Input::validate_boolean($_POST['activeComments']);
        $dateTime = date("Y-m-d H:i:s");

        /**
         * Check for track ID validity
         */
        if(!empty($trackID)){
            if(!$dbh->checkTrack($trackID)){
                $result['errorMsg'] .= '<li>'.INVALID_TRACK_ID.'</li>';
            }
        } else {
            $result['errorMsg'] .= '<li>'.EMPTY_TRACK_ID.'</li>';
        }

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

        if(empty($result['errorMsg'])){
            [$response,$postID] = $dbh->insertPost($username,$trackID,$description,$activeComments,$dateTime);
            if($response){
                $result['postInserted'] = true;
                $dbh->insertPostGenres($postID,$genresIDs);
                $followers = $dbh->selectPostNotification($username);
                if(count($followers) != 0){
                    foreach($followers as $follower){
                        /**Aggiungi notifiche al database */
                        try {
                            $mail = new MailHelper();
                            $mail->sendEmailNotification($follower['email'],createNewPostEmail($follower['username'],$username),'Someone just share a post');
                        } catch (Exception $e) {
                            /**Mail doesn't work because config.php variables not set,no action required */
                        }
                    }
                }
            } else {
                $result['errorMsg'] .= UNDEFINED;
            }
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        }
    } else {
        $result['errorMsg'] = 'Bad Request';
    }
} else {
    header('Location: index.php');
}

header('Content-Type: application/json');
echo json_encode($result);
?>