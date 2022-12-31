<?php
require_once 'bootstrap.php';
secure_session_start();

/*$result['loggedIn'] = false;
$result["errorEmail"] = false;
$result["errorUsername"] = false;
$result["validateError"] = false;*/
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
    } else if (isset($_POST['email'],$_POST['first_name'],$_POST['last_name'],$_POST['birth_date'],$_POST['telephone'],$_POST['username'],$_POST['password'],$_POST['confirmPassword'],$_POST['profile_picture'],$_POST['notification'],$_POST['favoriteGenres'])){
        /*Aggiungere tutti i controlli */
        $result['errorElem'] = array();
        $email = Input::filter_string($_POST['email']);
        $first_name = Input::filter_string($_POST['first_name']);
        $last_name = Input::filter_string($_POST['last_name']);
        $birth_date = Input::filter_string($_POST['birth_date']);
        $telephone = filter_var($_POST['telephone'], FILTER_SANITIZE_NUMBER_INT);
        $username = Input::filter_string($_POST['username']);
        $password = Input::filter_string($_POST['password']);
        $confirmPassword = Input::filter_string($_POST['confirmPassword']);
        $profile_picture = Input::filter_string($_POST['profile_picture']);
        $notification = Input::validate_boolean($_POST['notification']);
        $genresIDs = json_decode($_POST['favoriteGenres']);

        /**
         * Check for email validity
         */
        if(Input::validate_email($email)){
            if(count($dbh->findUsernameByEmail($email)) != 0){
                $result['errorMsg'] .= EMAIL_IN_USE.'<br>';
                array_push($result['errorElem'],'email');
            }
        } else {
            $result['errorMsg'] .= INVALID_EMAIL.'<br>';
            array_push($result['errorElem'],'email');
        }

        /**
         * Check for first name validity
         */
        if(!Input::validate_name($first_name)){
            $result['errorMsg'] .= NAME.'<br>';
            array_push($result['errorElem'],'first_name');
        }

        /**
         * Check for last name validity
         */
        if(!Input::validate_name($last_name)){
            $result['errorMsg'] .= NAME.'<br>';
            array_push($result['errorElem'],'last_name');
        }

        /**
         * Check for birth date validity
         */
        if(Input::validate_date($birth_date)){
            if(!Input::validate_birth_date($birth_date)){
                $result['errorMsg'] .= WRONG_DATE.'<br>';
                array_push($result['errorElem'],'birth_date');
            }
        } else {
            $result['errorMsg'] .= INVALID_DATE.'<br>';
            array_push($result['errorElem'],'birth_date');
        }

        /**
         * Check for telephone validity
         */
        if(!empty($telephone) && !Input::validate_phone_number($telephone)){
            $result['errorMsg'] .= INVALID_TELEPHONE.'<br>';
            array_push($result['errorElem'],'telephone');
        }

        /**
         * Check for username validity
        */
        if(!empty($username)){
            if(count($dbh->findUserByUsername($username)) != 0){
                $result['errorMsg'] .= USERNAME_IN_USE.'<br>';
                array_push($result['errorElem'],'username');
            }
        } else {
            $result['errorMsg'] .= USERNAME_REQUIRED.'<br>';
            array_push($result['errorElem'],'username');
        }

        /**
         * Check for password validity
         */
        [$secure,$errorPassword] = Input::is_secure_password($password);
        if(!$secure){
            $result['errorMsg'] .= $errorPassword.'<br>';
            array_push($result['errorElem'],'password');
        }

        /**
         * Check for confirm password validity
         */
        if(strcmp($password,$confirmPassword) !== 0){
            $result['errorMsg'] .= PASSWORD_MISMATCH.'<br>';
            array_push($result['errorElem'],'confirmPassword');
        }

        /**
         * Check for favoriteGenres validity
         */
        if(count($genresIDs) == 0 || count($genresIDs) > 5){
            $result['errorMsg'] .= GENRES_ID_NUM.'<br>';
        } else {
            if(!Input::validate_genresID($genresIDs)){
                $result['errorMsg'] .= INVALID_GENRES_ID.'<br>';
            }
        }
        
        $hash = password_hash($password,PASSWORD_DEFAULT);
        if($dbh->insertUser($email,$first_name,$last_name,$birth_date,$telephone,$username,$hash,$profile_picture)){
            $dbh->insertSettings($username,$notification);
            $dbh->insertFavoriteGenres($username,$genresIDs);
            registerLoggedUser($username,$email,$hash);
            $result['loggedIn'] = true;
        } else {
            $result['errorMsg'] = UNDEFINED;
        }
    } else {
        header('Location: signup.php');
    }
} else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);

/**
 * if(isset($_POST["checkEmail"])){
        if(count($dbh->getUser($_POST["checkEmail"])) > 0){
            $result["errorEmail"] = true;
        }
    } else if (isset($_POST["checkUsername"])){
        if(count($dbh->checkUsername($_POST["checkUsername"])) > 0){
            $result["errorUsername"] = true;
        }
    } else if(isset($_POST["email"],$_POST["first_name"],$_POST["last_name"],$_POST["birth_date"],$_POST["telephone"],$_POST["username"],$_POST["password"],$_POST["profile_picture"],$_POST["notification"],$_POST["favoriteGenres"])){
            $hash = password_hash($_POST["password"],PASSWORD_DEFAULT);
            if($dbh->insertUser($_POST["email"],$_POST["first_name"],$_POST["last_name"],$_POST["birth_date"],$_POST["telephone"],$_POST["username"],$hash,$_POST["profile_picture"])){
                $dbh->insertSettings($_POST["username"],$_POST["notification"]);
                $genresIDs = json_decode($_POST["favoriteGenres"]);
                $dbh->insertFavoriteGenres($_POST["username"],$genresIDs);
                registerLoggedUser($_POST["username"],$_POST["email"],$hash);
                $result['loggedIn'] = true;
            } else {
                $result["validateError"] = true;
            }         
    } else {
        $result["validateError"] = true;
    }
 */