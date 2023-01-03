<?php
require_once 'remember.php';

function isActive($pagename){
    if(basename($_SERVER['PHP_SELF'])==$pagename){
        echo " class='active' ";
    }
}

function secure_session_start(){
    $session_name = 'secure_session_id';
    $secure = false; /** Set to true to use HTTPS protocol */
    $http_only = true;
    ini_set('session.use_only_cookies',1);
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $http_only);
    session_name($session_name);
    session_start();
    session_regenerate_id();
}

function isUserLoggedIn() : bool{
    global $dbh;
    if(isset($_SESSION['username'], $_SESSION['email'], $_SESSION['login_string'])){
        $username = Input::filter_string($_SESSION['username']);
        $login_string = $_SESSION['login_string'];
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        $user = $dbh->findUserByUsername($username);
        if(count($user) != 0){
            $passwordHash = $user[0]['passwordHash'];
            if(password_verify($passwordHash.$user_browser,$login_string)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    $token = filter_input(INPUT_COOKIE, 'remember_me', FILTER_UNSAFE_RAW);

    if($token && token_is_valid($token)){
        $user = $dbh->findUserByToken($token);
        if($user){
            $user_data = $dbh->findUserByUsername($user[0]['username']);
            return registerLoggedUser($user_data[0]['username'],$user_data[0]['email'],$user_data[0]['passwordHash']);
        }
    }
    return false;
}

function registerLoggedUser(string $username, string $email, string $passwordHash) : bool{
    if(session_regenerate_id()){
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        $_SESSION['login_string'] = password_hash($passwordHash.$user_browser,PASSWORD_DEFAULT);
        return true;
    }
    return false;
}

function canFollow($user1, $user2follower){
    foreach($user2follower as $u){
        if($u["username"] == $user1){
            return false;
        }
    }
    return true;
}

/**
 * Compute the difference in hours between to dates. 
 */
function hours_date_diff(string $dateString1, string $dateString2) : int{
    $date1 = date_create($dateString1);
    $date2 = date_create($dateString2);
    $diff=date_diff($date1,$date2);
    $hours = $diff->h;
    $hours = $hours + ($diff->days*24);
    return $hours;
}

/**
 * Log the user in the website, return true if the user is logged in false otherwise. 
 */
function login(string $username, string $password, bool $remember) : bool {
    global $dbh;
    $user = $dbh->findUserByUsername($username);
    if(count($user) != 0 && password_verify($password,$user[0]['passwordHash'])){
        registerLoggedUser($user[0]['username'],$user[0]['email'],$user[0]['passwordHash']);
        if($remember){
            remember_me($user[0]['username']);
        }
        return true;
    } else {
        $dbh->insertFailedLoginAttempts($user[0]['username']);
    }
    return false;
}

/**
 * Saves the login for a specified number of days. 
 * By default, it remembers the login for 30 days.
 */
function remember_me(string $username, int $day = 30){
    global $dbh;
    [$selector,$validator,$token] = generate_tokens();

    /*Remove all the existing token associated with username*/
    $dbh->deleteUserToken($username);

    $expired_seconds = time() + 60 * 60 * 24 * $day;

    $hash_validator = password_hash($validator,PASSWORD_DEFAULT);
    $expiry = date('Y-m-d H:i:s', $expired_seconds);

    /*Insert new token */
    if($dbh->insertUserToken($username,$selector,$hash_validator,$expiry)){
        setcookie('remember_me', $token, $expired_seconds);
    }
}

?>