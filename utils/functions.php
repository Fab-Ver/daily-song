<?php
require_once 'remember.php';
require_once 'error_msg.php';

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

function uploadImage($path, $image){
    $imageName = basename($image['name']);
    $fullPath = $path.$imageName;
    
    $maxKB = 2000;
    $acceptedExtensions = array("jpg", "jpeg", "png", "gif");
    $result = false;
    $msg = "";
    /*Check if uploaded file is an image*/
    $imageSize = getimagesize($image['tmp_name']);
    
    if($imageSize === false) {
        $msg .= '<li>'.INVALID_IMAGE.'</li>';
    } else {
        $width = $imageSize[0];
        $height = $imageSize[1];
    }
    /*Check image dimension < 2 MB */
    if ($image['size'] > $maxKB * 1024) {
        $msg .= '<li>'."Uploaded file too large, maximum dimension".$maxKB."KB".'</li>';
    }

    /*Check if the image is a square */
    if(isset($width,$height)){
        if($width !== $height){
            $msg .= '<li>'.IMAGE_DIMENSION.'</li>';
        }
    }
    /*Check file extension*/
    $imageFileType = strtolower(pathinfo($fullPath,PATHINFO_EXTENSION));
    if(!in_array($imageFileType, $acceptedExtensions)){
        $msg .= '<li>'.FILE_EXTENSION.implode(",", $acceptedExtensions).'</li>';
    }

    /*Search for file with the same name; if found rename the file. */
    if (file_exists($fullPath)) {
        $i = 1;
        do{
            $i++;
            $imageName = pathinfo(basename($image['name']), PATHINFO_FILENAME)."_$i.".$imageFileType;
        }
        while(file_exists($path.$imageName));
        $fullPath = $path.$imageName;
    }

    /*If no error occurred, we move the file form the temp location to upload dir*/
    if(strlen($msg)==0){
        if(!move_uploaded_file($image['tmp_name'], $fullPath)){
            $msg.= '<li>'.ERROR_UPLOAD.'</li>';
        }
        else{
            $result = true;
            $msg = $imageName;
        }
    }

    if(!$result) {
        $msg = 'File errors: <ul>'.$msg.'</ul>';
    }

    return array($result, $msg);
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

function createNewAccessEmail(string $username) : string{
   
    $body='<p><h1>New access to DailySong </h1></p>';
    $body.='<p>-------------------------------------------------------------</p>';
    $body.='<p><b>'.$username.'</b> we noticed you logged in from a new device. If so, then you don\'t have to do anything about it.</p>';	
    $body.='<p>Date & Time: '.date("Y-m-d H:i:s");	
    $body.='<p>-------------------------------------------------------------</p>';
    $body.='<p>Wasn\'t you? Please make sure you update your password</p>'; 	
    $body.='<p>by DailySong</p>';
    return $body;
}

function createNewPostEmail(string $my_username, string $post_username) : string{
    $body='<p>Hey there, '.$my_username.'</p>';
    $body.='<p><b>'.$post_username.'</b> just shared a new post.</p>';	
    $body.='<p>Date & Time: '.date("Y-m-d H:i:s");	
    $body.='<p>-------------------------------------------------------------</p>';
    $body.='<p>We send this email when one of your follower publish a new post, you can disable this email in your account settings.</p>'; 
    $body.='<p>by DailySong</p>';
    return $body;
}

function createNewFollowerEmail(string $my_username, string $follower_username) : string{
    $body='<p>Hey there, '.$my_username.'</p>';
    $body.='<p>You have a new follower on DailySong  :<b>'.$follower_username.'</b>!</p>';	
    $body.='<p>Date & Time: '.date("Y-m-d H:i:s");	
    $body.='<p>-------------------------------------------------------------</p>';
    $body.='<p>We send this email when people follow you on DailySong, you can disable this email in your account settings.</p>'; 
    $body.='<p>by DailySong </p>';
    return $body;
}

function createNewCommentEmail(string $usernameReceiver, string $usernameSender) : string {
    $body='<p>Hey there, '.$usernameReceiver.'</p>';
    $body.='<p><b>'.$usernameSender.'</b> just comments one of your posts. </p>';	
    $body.='<p>Date & Time: '.date("Y-m-d H:i:s");	
    $body.='<p>-------------------------------------------------------------</p>';
    $body.='<p>We send this email when someone comments one of your posts on DailySong, you can disable this email in your account settings.</p>'; 
    $body.='<p>by DailySong </p>';
    return $body;
}

?>