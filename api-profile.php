<?php
require("bootstrap.php");
$_SESSION["username"] = "sara-capp";
$result["username"] = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["username"];
$result["isMyProfile"] = $_SESSION["username"] == $result["username"];
$result["canFollow"] = true;
$user = $dbh->getUserProfile($result["username"]);
$result["firstName"] = $user["firstName"];
$result["lastName"] = $user["lastName"];
$result["profilePicture"] = UPLOAD_DIR."profilo.jpg"; //$user["profilePicture"];
$result["profileNumberOfFollowed"] = "70"; //$dbh->length(getUserFollowed($result["username"]));
$result["profileNumberOfFollower"] = "120"; //$dbh->length(getUserFollower($result["username"]));
$result["preferredGenres"] = ["rock", "indie", "pop", "metal", "latina", "tecno"];//$dbh->getUserPreferredGenres($result["username"]);
$result["posts"] = [UPLOAD_DIR."post1.jpg", UPLOAD_DIR."post2.jpg", UPLOAD_DIR."post3.jpg", UPLOAD_DIR."post4.jpg"]; //$dbh->getUserPosts($result["username"]);

if(isset($_POST["username"]) && isset($_POST["value"])){
    if($_POST["value"] == "add"){
        var_dump($_POST["username"]);
        //$dbh->AddFollowed($result["username"], $_POST["username"]);
    } else if($_POST["value"] == "remove"){
        //$dbh->RemoveFollowed($result["username"], $_POST["username"]);
    }
}

header("Content-Type: application/json");
echo json_encode($result);

/*$result["canFollow"] = $result["isMyProfile"] ? false : canFollow($_SESSION["id"], $dbh->getUserFollower($result["username"]));

function canFollow($user1, $user2follower){
    return in_array($user1, $user2follower["username"]);
}*/
?>