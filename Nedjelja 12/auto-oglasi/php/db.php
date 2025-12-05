<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "autoglasi";
$port = 3307;

$connection = new mysqli($host, $user, $pass, $db,$port);

if ($connection->connect_error) {
    die("Greška sa konekcijom: " . $connection->connect_error);
}
?>