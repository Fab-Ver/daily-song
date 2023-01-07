<?php
require_once 'bootstrap.php';
secure_session_start();

$result['loggedIn'] = false;

if(!isUserLoggedIn()){
    $result['errorMsg'] = "";
    if(isset($_POST['checkEmail'])){
        $email = Input::filter_string($_POST["checkEmail"]);
        if(Input::validate_email($email)){
            if(count($dbh->findUsernameByEmail($email)) != 0){
                $result['errorMsg'] = EMAIL_IN_USE;
            }
        } else {
            $result['errorMsg'] = INVALID_EMAIL;
        }
    } else if(isset($_POST['checkUsername'])){
        $username = Input::filter_string($_POST['checkUsername']);
        if(!empty($username)){
            if(count($dbh->findUserByUsername($username)) != 0){
                $result['errorMsg'] = USERNAME_IN_USE;
            }
        } else {
            $result['errorMsg'] = USERNAME_REQUIRED;
        }
    } else if (isset($_POST['email'],$_POST['first_name'],$_POST['last_name'],$_POST['birth_date'],$_POST['telephone'],$_POST['username'],$_POST['password'],$_POST['confirmPassword'],$_POST['notification'],$_POST['favoriteGenres'])){
        $result['errorElem'] = array();
        $email = Input::filter_string($_POST['email']);
        $first_name = Input::filter_string($_POST['first_name']);
        $last_name = Input::filter_string($_POST['last_name']);
        $birth_date = Input::filter_string($_POST['birth_date']);
        $telephone = filter_var($_POST['telephone'], FILTER_SANITIZE_NUMBER_INT);
        $username = Input::filter_string($_POST['username']);
        $password = Input::filter_string($_POST['password']);
        $confirmPassword = Input::filter_string($_POST['confirmPassword']);
        $notification = Input::validate_boolean($_POST['notification']);
        $genresIDs = json_decode($_POST['favoriteGenres']);

        /**
         * Check for email validity
         */
        if(Input::validate_email($email)){
            if(count($dbh->findUsernameByEmail($email)) != 0){
                $result['errorMsg'] .= '<li>'.EMAIL_IN_USE.'</li>';
                array_push($result['errorElem'],'email');
            }
        } else {
            $result['errorMsg'] .= '<li>'.INVALID_EMAIL.'</li>';
            array_push($result['errorElem'],'email');
        }

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
         * Check for birth date validity
         */
        if(Input::validate_date($birth_date)){
            if(!Input::validate_birth_date($birth_date)){
                $result['errorMsg'] .= '<li>'.WRONG_DATE.'</li>';
                array_push($result['errorElem'],'birth_date');
            }
        } else {
            $result['errorMsg'] .= '<li>'.INVALID_DATE.'</li>';
            array_push($result['errorElem'],'birth_date');
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
         * Check for password validity
         */
        [$secure,$errorPassword] = Input::is_secure_password($password);
        if(!$secure){
            $result['errorMsg'] .= '<li>'.$errorPassword.'</li>';
            array_push($result['errorElem'],'password');
        }

        /**
         * Check for confirm password validity
         */
        if(strcmp($password,$confirmPassword) !== 0){
            $result['errorMsg'] .= '<li>'.PASSWORD_MISMATCH.'</li>';
            array_push($result['errorElem'],'confirmPassword');
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
            $hash = password_hash($password,PASSWORD_DEFAULT);
            if($dbh->insertUser($email,$first_name,$last_name,$birth_date,$telephone,$username,$hash,$profile_picture)){
                $dbh->insertSettings($username,$notification,$notification,$notification,$notification);
                $dbh->insertFavoriteGenres($username,$genresIDs);
                registerLoggedUser($username,$email,$hash);
                $result['loggedIn'] = true;
            } else {
                $result['errorMsg'] = UNDEFINED;
            }
        } else {
            $result['errorMsg'] = 'While processing your data the following errors occurred: '.'<ul>'. $result['errorMsg'].'<ul>';
        }
    } else {
        $result['errorMsg'] = 'Bad Request';
    }
} else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);