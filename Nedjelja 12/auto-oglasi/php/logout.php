<?php
session_start();

$_SESSION = [];

session_destroy();

echo "Vracamo se na pocetnu stranu...";
header("Refresh:2, url='../index.html'");
exit;
?>