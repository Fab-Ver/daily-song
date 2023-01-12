<?php
require("bootstrap.php");
require("utils/mail_helper.php");
secure_session_start();

if (isUserLoggedIn()){
    $result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];
    $result["sessionUser"] = $_SESSION["username"];
    if(isset($_POST["username"]) && isset($_POST["value"])){
        if($_POST["value"] == "add"){
            $result["followButton"] = $dbh->insertFollowed($_POST["username"], $result["username"]);
            if($result["followButton"]){
                $check = $dbh->checkFollowerNotification($_POST["username"]);
                if(count($check) != 0){
                    try{
                        $mail = new MailHelper();
                        $mail->sendEmailNotification($check[0]["email"], createNewFollowerEmail($check[0]["username"], $_SESSION["username"]), "Someone started following you");
                    } catch(Exception $e){
                        /**Mail doesn't work because config.php variables not set,no action required */
                    }
                }
            }
        } else if($_POST["value"] == "remove"){
            $result["followButton"] = $dbh->removeFollowed($_POST["username"], $result["username"]);
        }
    } else if (isset($_GET["kind"])) {
        $data = $_GET["kind"];
        if($data=="follower"){
            $result["searchResult"] = $dbh->getUserFollower($result["username"]);
            $result["typeOfSearch"] = "follower";
        }
        else if($data=="followed"){
            $result["searchResult"] = $dbh->getUserFollowed($result["username"]);
            $result["typeOfSearch"] = "followed";
        }
        foreach($result["searchResult"] as &$user){
            $user["profilePicture"] = UPLOAD_DIR.$user["profilePicture"];
            $user["canFollow"] = canFollow($user["username"], $dbh->getUserFollowed($_SESSION["username"]));
        }
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>