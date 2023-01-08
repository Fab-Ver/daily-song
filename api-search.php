<?php
require("bootstrap.php");
secure_session_start();

if(isUserLoggedIn()) {
    if(isset($_POST["searchValue"])) {
        $allUsers = $dbh->getAllUsernames();
        $result["searchResult"] = array_filter($allUsers["username"], function($p) { return str_starts_with($p, $_POST["searchValue"]); });
        foreach($result["searchResult"] as &$user){
            $temp = $dbh->getUserProfile($user["username"]);
            $user["profilePicture"] = UPLOAD_DIR.$temp["profilePicture"];
            $user["canFollow"] = canFollow($temp["username"], $dbh->getUserFollowed($_SESSION["username"]));
        }
    }
}

header("Content-Type: application/json");
echo json_encode($result);
