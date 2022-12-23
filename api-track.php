<?php
require_once 'bootstrap.php';

$result["checkTrackID"] = false;

if(isset($_POST["checkTrackID"])){
    $result["checkTrackID"] = $dbh->checkTrack($_POST["checkTrackID"]);
} else if (isset($_POST["trackID"]) && 
           isset($_POST["urlSpotify"]) &&
           isset($_POST["urlImage"]) &&
           isset($_POST["urlPreview"]) &&
           isset($_POST["title"]) &&
           isset($_POST["artist"]) &&
           isset($_POST["albumName"])){
        $dbh->insertTrack($_POST["trackID"], $_POST["urlSpotify"], $_POST["urlImage"], $_POST["urlPreview"], $_POST["title"], $_POST["artist"], $_POST["albumName"]);
}

header('Content-Type: application/json');
echo json_encode($result);
?>