<?php
session_start();
require_once "db.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];


//ovo je vrlo bitno, proslijedjeno u header-u zahtjeva! link?id=
$car_id = $_GET['id'];


$query = "SELECT owner_id, image FROM cars WHERE ID = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("i",$car_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Oglas ne postoji.");
}

$car = $result->fetch_assoc();

//provjera da li je dozvoljeno brisanje, mada ne bi trebalo da je moguce, osim ako direktno ne gadjemo link:)
if ($car['owner_id'] != $user_id && $username !== "admin") {
    die("Nemate pravo da obrišete ovaj oglas.");
}

//brisanje slike radimo ovako: 
$slikaPath = "../uploads/cars/" . $car['image'];
if (file_exists($slikaPath)) {
    unlink($slikaPath); //brise fajl na lokaciji
}


$deleteQuery = "DELETE FROM cars WHERE ID = ?";
$stmt = $connection->prepare($deleteQuery);
$stmt->bind_param("i", $car_id);

//ovako mozemo da obavijestimo korisnika da je radnja uspjesno zavrsena
//putem JS-a (window.location.href="url")
//ili koristeci Refresh i url u header funkciji
if ($stmt->execute()) {
    echo "Oglas uspješno obrisan.<br> Nazad na korisnicku stranu, redirekcija...";
    echo "<script> setTimeout(()=>{window.location.href='userPage.php'}, 3000)</script>";
    //ili sa PHP-om, zakomentarisite script echo tag iznad i otkomentarisite ovaj ispod da testirate
    //header("Refresh:3; url=userPage.php");
    //exit;
} else {
    echo "Greška pri brisanju. Nesto nije u redu.";
    echo "<script> setTimeout(()=>{window.location.href='userPage.php'}, 3000)</script>";
}
