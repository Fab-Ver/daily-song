<?php
require_once 'bootstrap.php';
secure_session_start();
$result["checkTrackID"] = false;

if(isUserLoggedIn()){
    $result['loggedIn'] = true;
    if(isset($_POST["checkTrackID"])){
        $result["checkTrackID"] = $dbh->checkTrack($_POST["checkTrackID"]);
    } else if (isset($_POST["trackID"],$_POST["urlSpotify"],$_POST["urlImage"],$_POST["urlPreview"],$_POST["title"],$_POST["artist"],$_POST["albumName"])){
        $dbh->insertTrack($_POST["trackID"], $_POST["urlSpotify"], $_POST["urlImage"], $_POST["urlPreview"], $_POST["title"], $_POST["artist"], $_POST["albumName"]);
    }
} else {
    $result['loggedIn'] = false;
}

header('Content-Type: application/json');
echo json_encode($result);
?>