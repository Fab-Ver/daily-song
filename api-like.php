<?php
require("bootstrap.php");
secure_session_start();


$result["prova"] = $_SERVER['REQUEST_URI'];

header("Content-Type: application/json");
echo json_encode($result);
?>
