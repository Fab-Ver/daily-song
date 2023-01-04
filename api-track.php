<?php
require_once 'bootstrap.php';
secure_session_start();
$result["checkTrackID"] = false;

if(isUserLoggedIn()){
    $result['errorMsg'] = "";
    if(isset($_POST['checkTrackID'])){
        $trackID = Input::filter_string($_POST['checkTrackID']);
        if(!empty($trackID)){
            if(!Input::is_base62($trackID)){
                $result['errorMsg'] .= '<li>'.WRONG_FORMAT_TRACK_ID.'</li>';
            }
        } else {
            $result['errorMsg'] .= '<li>'.EMPTY_TRACK_ID.'</li>';
        }
        if(empty($result['errorMsg'])){
            $result['checkTrackID'] = $dbh->checkTrack($trackID);
        }
    } else if (isset($_POST['trackID'],$_POST['urlSpotify'],$_POST['urlImage'],$_POST['urlPreview'],$_POST['title'],$_POST['artist'],$_POST['albumName'])){
        $result['insertTrack'] = false;
        $trackID = Input::filter_string($_POST['trackID']);
        [$responseSpotify,$urlSpotify] = Input::validate_URL($_POST['urlSpotify']);
        [$responseImage,$urlImage] = Input::validate_URL($_POST['urlImage']);
        $title = Input::filter_string($_POST['title']);
        $artist = Input::filter_string($_POST['artist']);
        $albumName = Input::filter_string($_POST['albumName']);

        /**
         * Check track ID validity 
         */
        if(!empty($trackID)){
            if(!Input::is_base62($trackID)){
                $result['errorMsg'] .= '<li>'.WRONG_FORMAT_TRACK_ID.'</li>';
            } else {
                if($dbh->checkTrack($trackID)){
                    $result['errorMsg'] .= '<li>'.TRACK_ID_IN_USE.'</li>';
                }
            }
        } else {
            $result['errorMsg'] .= '<li>'.EMPTY_TRACK_ID.'</li>';
        }

        /**
         * Check urlSpotify validity
         */
        if($responseSpotify){
            [$resp,$id] = Input::validate_SpotifyURL($urlSpotify);
            if($resp){
                if(strcmp($id,$trackID) !== 0){
                    $result['errorMsg'] .= '<li>'.ID_MISMATCH.'</li>';
                }
            } else {
                $result['errorMsg'] .= '<li>'.'Spotify link '.INVALID_URL.'</li>';
            }
        } else {
            $result['errorMsg'] .= '<li>'.'Spotify link '.INVALID_URL.'</li>';
        }

        /**
         * Check urlImage validity
         */
        if(!$responseImage){
            $result['errorMsg'] .= '<li>'.'Image '.INVALID_URL.'</li>';
        }

        /**
         * Check urlPreview validity
         */
        
        if($_POST['urlPreview'] === 'null'){
            $urlPreview = $_POST['urlPreview'];
        } else {
            [$responsePreview,$urlPreview] = Input::validate_URL($_POST['urlPreview']);
            if(!$responsePreview){
                $result['errorMsg'] .= '<li>'.'Preview '.INVALID_URL.'</li>';
            }
        }

        /**
         * Check title validity
        */
        if(empty($title)){
            $result['errorMsg'] .= '<li>'.EMPTY_TITLE.'</li>';
        }

        /**
         * Check artists names validity
         */
        if(empty($artist)){
            $result['errorMsg'] .= '<li>'.EMPTY_ARTIST.'</li>';
        }

        /**
         * Check albumName validity
         */
        if(empty($albumName)){
            $result['errorMsg'] .= '<li>'.EMPTY_ALBUM.'</li>';
        }

        if(empty($result['errorMsg'])){
            $result['insertTrack']=$dbh->insertTrack($trackID, $urlSpotify, $urlImage, $urlPreview, $title, $artist, $albumName);
            if(!$result['insertTrack']){
                $result['errorMsg'] = UNDEFINED;
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