<?php
session_start();
define("UPLOAD_DIR", "./res/");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "web", 3307);
?>