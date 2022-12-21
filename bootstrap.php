<?php
define("UPLOAD_DIR", "./res/");
require_once("db/database.php");
require_once("utils/functions.php");
secure_session_start();
$dbh = new DatabaseHelper("localhost", "secure_user", "p5N3RHN9fWE5QRvxxuPcpJXZ", "db", 3306);
?>