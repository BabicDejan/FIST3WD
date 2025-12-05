<?php
session_start();
require_once "db.php";

if (!isset($_SESSION['user_id'])) {
    die("Niste ulogovani!");
}

$user_id  = $_SESSION['user_id'];
$username = $_SESSION['username'];

// PODACI IZ FORME
$car_id = intval($_POST['id']);
$brand = trim($_POST['brand']);
$model = trim($_POST['model']);
$year = intval($_POST['year']);
$price = floatval($_POST['price']);
$description  = trim($_POST['description']);

//prvo izvlacimo vlasnika auta (oglasa) iz baze
$query = "SELECT owner_id FROM cars WHERE ID = ?";
$stmt  = $connection->prepare($query);
$stmt->bind_param("i", $car_id);
$stmt->execute();
$result = $stmt->get_result();

//ukoliko ne postoji sa datim id-em, nista, odradite redirect
if ($result->num_rows === 0) {
    echo $car_id;
    die("Oglas ne postoji.");
}

$car = $result->fetch_assoc();

// samo vlasnik ili admin mogu da uređuju auto
if ($car['owner_id'] != $user_id && $username !== "admin") {
    die("Nemate pravo da uređujete ovaj oglas.");
}

//vase je da napravite i da se slika updajtuje:D
$update = "UPDATE cars 
           SET car = ?, model = ?, year = ?, price = ?, description = ?
           WHERE ID = ?";

$stmt = $connection->prepare($update);
$stmt->bind_param("sssisi", $brand, $model, $year, $price, $description, $car_id);

if ($stmt->execute()) {
    echo "<h3 style='color:green;'>Oglas uspješno ažuriran!</h3>";
    echo "<p>Preusmjeravanje...</p>";
    header("Refresh:2; url=userPage.php");
    exit;
} else {
    echo "Greška pri ažuriranju oglasa.";
}

$stmt->close();
$connection->close();
?>
