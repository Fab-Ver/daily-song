<?php
require("bootstrap.php");
secure_session_start();

if(isUserLoggedIn()) {
    /**
     * Filter all the users based on the searchBar value sent by get request
     */
    if(isset($_GET["searchValue"])) {
        $allUsers = $dbh->getAllUsers();
        $result = [];
        foreach($allUsers as $user){
            if(str_contains(strtolower($user["username"]), strtolower($_GET["searchValue"]))){
                $temp = $dbh->getUserProfile($user["username"]);
                $user["profilePicture"] = UPLOAD_DIR.$temp["profilePicture"];
                $user["canFollow"] = canFollow($temp["username"], $dbh->getUserFollowed($_SESSION["username"]));
                array_push($result, $user);
            }
            
        }
    }
}

header("Content-Type: application/json");
echo json_encode($result);
