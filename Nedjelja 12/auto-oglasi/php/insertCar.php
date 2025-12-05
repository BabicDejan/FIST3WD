<?php
session_start();
require_once "db.php"; 


if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];


$brand   = trim($_POST['brand']);
$model  = trim($_POST['model']);
$year   = intval($_POST['year']); // pretvaranje u integer
$price  = floatval($_POST['price']); // pretravanje u decimalni zapis (float)
$opis   = trim($_POST['opis']);

//$_FILES je asocijativna lista koja se proslijedjuje kroz POST zahtjev kada imate file input
if (!isset($_FILES['slika']) || $_FILES['slika']['error'] !== UPLOAD_ERR_OK) {
    die("Greška pri uploadu slike.");
}


$originalName = $_FILES['slika']['name'];

//tmp je zapravo mjesto gdje PHP cuva uplodovani fajl prije finalnog ubacanja na adresu koju postavite
$tmpName = $_FILES['slika']['tmp_name'];


//pathinfo, zajedno sa PATHINFO_EXTENSION vam daje ekstenziju fajla 
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

// Dozvoljene ekstenzije
$allowed = ["jpg", "jpeg", "png", "webp"];

if (!in_array($ext, $allowed)) {
    die("Nedozvoljen format slike!");
}

// kreiramo jedinstveno ime fajla da ne bi doslo do podudaranja imena fajlova
//funkcija time() vraca trenutno vrijeme - poprilicno dobra kombinacija da imate unikatno ime fajla
$newFileName = $brand . "_" . $model . "_" . time() . "." . $ext;

//mjesto gdje cemo sacuvati nasu sliku
$uploadPath = "../uploads/cars/" . $newFileName;

// tipicna funkcija provjere postojanja foldera, zatim kreiranja istog ako ga nema
if (!is_dir("../uploads/cars")) {
    //nije kao python :) - morate oznaciti koje su dozvole prema folderu, 0777 kod za sve (citanje, dodavanje, izvrsavanje)
    mkdir("../uploads/cars", 0777, true);
}

//iz temp storage-a prebacamo sliku na novu lokaciju ../uploads/cars/imefajlavrijeme.image
if (!move_uploaded_file($tmpName, $uploadPath)) {
    die("Greška pri snimanju slike.");
}


$query = "INSERT INTO cars (owner_id, car, model, year, price, description, image) 
          VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $connection->prepare($query);
$stmt->bind_param("isssdss", $user_id, $brand, $model, $year, $price, $opis, $newFileName);

if ($stmt->execute()) {
    echo "Oglas uspješno dodat! <br>";
    header("Location: userPage.php");
} else {
    echo "Greška pri unosu u bazu: " . $connection->error;
}

$stmt->close();
$connection->close();
?>
