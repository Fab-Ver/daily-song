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
        $result['accountData'] = $dbh->getUserProfile($username);
        $result['accountData']['profilePicture'] = UPLOAD_DIR.$result['accountData']['profilePicture'];

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
    } else if(isset($_POST['checkUsername'])){
        $username = Input::filter_string($_POST['checkUsername']);
        if(!empty($username)){
            if($username !== Input::filter_string($_SESSION['username'])){
                if(count($dbh->findUserByUsername($username)) != 0){
                    $result['errorMsg'] = USERNAME_IN_USE;
                }
            }
        } else {
            $result['errorMsg'] = USERNAME_REQUIRED;
        }
    } else if (isset($_POST['first_name'],$_POST['last_name'],$_POST['telephone'],$_POST['username'])){
        $result['errorElem'] = array();
        $first_name = Input::filter_string($_POST['first_name']);
        $last_name = Input::filter_string($_POST['last_name']);
        $telephone = filter_var($_POST['telephone'], FILTER_SANITIZE_NUMBER_INT);
        $username = Input::filter_string($_POST['username']);
        $current_username = Input::filter_string($_SESSION['username']);

        /**
         * Check for first name validity
         */
        if(!Input::validate_name($first_name)){
            $result['errorMsg'] .= '<li>'."First".NAME.'</li>';
            array_push($result['errorElem'],'first_name');
        }

        /**
         * Check for last name validity
         */
        if(!Input::validate_name($last_name)){
            $result['errorMsg'] .= '<li>'."Last".NAME.'</li>';
            array_push($result['errorElem'],'last_name');
        }

        /**
         * Check for telephone validity
         */
        if(!empty($telephone) && !Input::validate_phone_number($telephone)){
            $result['errorMsg'] .= '<li>'.INVALID_TELEPHONE.'</li>';
            array_push($result['errorElem'],'telephone');
        }

        /**
         * Check for username validity
        */
        if(!empty($username)){
            if(count($dbh->findUserByUsername($username)) != 0){
                $result['errorMsg'] .= '<li>'.USERNAME_IN_USE.'</li>';
                array_push($result['errorElem'],'username');
            }
        } else {
            $result['errorMsg'] .= '<li>'.USERNAME_REQUIRED.'</li>';
            array_push($result['errorElem'],'username');
        }

        /**
         * Check for profile picture validity.
         */
        $profile_picture = "";
        if(isset($_FILES['profile_picture'])){
            [$response,$msg] = uploadImage(UPLOAD_DIR,$_FILES['profile_picture']);
            if(!$response){
                $result['errorMsg'] .= '<li>'.$msg.'</li>';
                array_push($result['errorElem'],'profile_picture');
            } else {
                $profile_picture = $msg;
            }
        } else {
            $profile_picture = 'default.png';
        }

        if(empty($result['errorMsg'])){
            if($dbh->updateUserData($first_name,$last_name,$telephone,$username,$profile_picture,$current_username)){
                $user = $dbh->findUserByUsername($username)[0];
                registerLoggedUser($user['username'],$user['email'],$user['passwordHash']);
                $result['updated'] = true;
            } else {
                $result['errorMsg'] = UNDEFINED;
            }
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        } 
    }else{
        $result['errorMsg'] = 'Bad Request';
    }

    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    header('Location: index.php');
}
?>