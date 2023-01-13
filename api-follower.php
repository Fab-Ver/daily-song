<?php
require("bootstrap.php");
require("utils/mail_helper.php");
secure_session_start();

if (isUserLoggedIn()){
    $result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];
    $result["sessionUser"] = $_SESSION["username"];
    /**
    * Check if I have to update the database with post request data
    */
    if(isset($_POST["username"]) && isset($_POST["value"])){
        /**
         * Check if I have to add or remove a follow
         */
        if($_POST["value"] == "add"){
            $result["followButton"] = $dbh->insertFollowed($_POST["username"], $result["username"]);
            /**
            * Check if all went good and send notification and email
            */
            if($result["followButton"]){     
                $check = $dbh->checkFollowerNotification($_POST["username"]);
                if(count($check) != 0){
                    $dbh->insertNotification(date('Y-m-d H-i-s'), 0, $_SESSION["username"], $_POST["username"]);
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
    /**
    * Check if I have to show the list of follower of followed
    */
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