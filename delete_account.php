<?php
require_once 'bootstrap.php';
secure_session_start();

if(isUserLoggedIn()){
    $username = Input::filter_string($_SESSION['username']);
    /**Delete user from database */
    $dbh->deleteUser($username);

    /*Delete session variables*/
    unset($_SESSION['username'], $_SESSION['email'], $_SESSION['login_string']);

    /*Remove the remember_me cookie*/
    if(isset($_COOKIE['remember_me'])){
        unset($_COOKIE['remember_me']);
        setcookie('remember_user', null, -1);
    }

    $params = session_get_cookie_params();

    setcookie(session_name(),'',time()-42000,$params["path"],$params["domain"], $params["secure"], $params["httponly"]);

    /*Remove all session data*/
    session_destroy();
}

header('Location: index.php');

?>