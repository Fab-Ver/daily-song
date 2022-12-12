<?php
session_start();
define("UPLOAD_DIR", "./res/");
require_once("db/database.php");
require_once("utils/functions.php");
$dbh = new DatabaseHelper("localhost", "root", "", "db", 3306);
?>