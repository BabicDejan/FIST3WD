<?php
require_once "db.php";

$username  = trim($_POST['username']);
$email     = trim($_POST['email']);
$password  = trim($_POST['password']);
$confirm   = trim($_POST['confirm_password']);
$contact   = trim($_POST['contact_no']);


//validaciju podataka ne moramo raditi jer vec imamo JS funkciju za to, pokazno, radi primjera

//filter_var metoda za validaciju, FILTER_VALIDATE_EMAIL ugradjeni regex plus odredjena pravila
//radi sa metodom filter_var
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Greška: email adresa nije ispravna!");
}


if($password!==$confirm){
    die("Lozinke se ne poklapaju");
}

//preg_match metoda za provjeravanje stringa putem regex-a
//regex za broj telefona
if (!preg_match('/^[0-9+\s]{6,20}$/', $contact)) {
    die("Greška: broj telefona nije validan!");
}

//kveri za provjeru duplikata, povucemo sve korisnike
$query = "SELECT * FROM users WHERE username = ? OR email = ? OR contact_no=?";

//prepare metoda, priprema kveri, dodatni sloj zastite od SQL injekcije
//takodje korisna ako isti kveri vise puta ponavljate u kodu

$execStatement = $connection->prepare($query);

//bind_param metoda dodaje stvarne vrijednosti u kveri
//s - govori da je tip podatka na poziciji string
// i - integer; d - double; b; blob - blob je binarni podatak, najcesce media fajlovi
$execStatement->bind_param("sss", $username,$email, $contact);

$execStatement->execute();

$result = $execStatement->get_result();

if($result->num_rows>0){
    die("Greška: Korisnik sa ovim podacima već postoji!");
}

//ne morate za ispit, ali korisno da znate, korisnicke lozinke se nikada ne cuvaju u bazi kao cisti tekst
//vec se hesiraju, a u radnoj memoriji, putem programa desifruju, tako niko ne moze da "zna" vasu sifru

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

//CREATE, upis u bazu

$insertQuery = "INSERT INTO users(username, password, email, contact_no) VALUES (?,?,?,?)";

$execStatement = $connection->prepare($insertQuery);

$execStatement->bind_param("ssss",$username,$hashedPassword,$email,$contact);

if($execStatement->execute()){
    echo "Registracija uspjesna!<br>";
    echo "<a href='login.php'>Kliknite ovdje za login</a>";
}else{
    echo "Greska pri unosu, pokusajte ponovo..";
}


//obavezno zatvaranje objekata konekcije!
$execStatement->close();
$connection->close();




?>