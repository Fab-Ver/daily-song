<?php
require_once 'bootstrap.php';

$genres = $dbh->getGenres();

header('Content-Type: application/json');
echo json_encode($genres);
?>