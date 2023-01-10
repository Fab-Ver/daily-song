<?php
require("bootstrap.php");
secure_session_start();

if(isUserLoggedIn()) {
    if(isset($_GET["searchValue"])) {
        $allUsers = $dbh->getAllUsers();
        $result = [];
        //$result["searchResult"] = array_filter($allUsers["username"], function($p) { return str_starts_with($p, $_GET["searchValue"]); });
        foreach($allUsers as $user){
            //if(str_starts_with(strtolower($user["username"]), strtolower($_GET["searchValue"]))){
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
