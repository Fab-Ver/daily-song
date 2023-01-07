<?php

require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $result['errorMsg'] = "";
    if(isset($_POST['posts'],$_POST['comments'],$_POST['followers'],$_POST['account'])){
        $posts = Input::validate_boolean($_POST['posts']);
        $comments = Input::validate_boolean($_POST['comments']);
        $followers = Input::validate_boolean($_POST['followers']);
        $account = Input::validate_boolean($_POST['account']);
        $username = Input::filter_string($_SESSION['username']);

        if(count($dbh->getSettingsByUsername($username)) != 0){
            $result['updated'] = $dbh->updateSettings($username,$posts,$comments,$followers,$account,$username);
        } else {
            $result['updated'] = $dbh->insertSettings($username,$posts,$comments,$followers,$account,$username);
        }

        if(!$result['updated']){
            $result['errorMsg'] = UNDEFINED;
        }

    } else if(isset($_GET['settings']) && $_GET['settings'] === 'get'){
        $username = Input::filter_string($_SESSION['username']);
        if(count($dbh->getSettingsByUsername($username)) != 0){
            $settings = $dbh->getSettingsByUsername($username)[0];
            $result['settings'] = array();
            array_push($result['settings'],Input::validate_boolean($settings['postNotification']));
            array_push($result['settings'],Input::validate_boolean($settings['commentNotification']));
            array_push($result['settings'],Input::validate_boolean($settings['followerNotification']));
            array_push($result['settings'],Input::validate_boolean($settings['accountNotification']));
        } else {
            $result['settings'] = array(true,true,true,true);
        }
        $result['favoriteGenres'] = $dbh->getUserPreferredGenres($username);

    } else if(isset($_POST['favoriteGenres'])){
        $genresIDs = json_decode($_POST['favoriteGenres']);
        $username = Input::filter_string($_SESSION['username']);
        /**
         * Check for favoriteGenres validity
         */
        if(count($genresIDs) == 0 || count($genresIDs) > 5){
            $result['errorMsg'] .= '<li>'.GENRES_ID_NUM.'</li>';
        } else {
            if(!Input::validate_genresID($genresIDs)){
                $result['errorMsg'] .= '<li>'.INVALID_GENRES_ID.'</li>';
            }
        }

        if(empty($result['errorMsg'])){
            $dbh->removeAllFavoriteGenres($username);
            $dbh->insertFavoriteGenres($username,$genresIDs);
            $result['updated'] = true;
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        }
    } else {
        $result['errorMsg'] = 'Bad Request';
    }

    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    header('Location: index.php');
}
?>