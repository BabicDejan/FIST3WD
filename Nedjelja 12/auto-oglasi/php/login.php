<?php
//session_start() omogucava pristup varijabli sesije - asocijativna lista

session_start();
require_once "db.php"; // ako je db.php u php/ folderu

// Ako je forma poslana
$loginError = "";
//isset - da li varijabla postoji i da li nije null - vraca true ako postoji
if (isset($_POST['username'], $_POST['password'])) {

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Provjera u bazi
    $query = "SELECT * FROM users WHERE username = ?";
    $execStatement = $connection->prepare($query);
    $execStatement->bind_param("s", $username);
    $execStatement->execute();
    $result = $execStatement->get_result();

    if ($result->num_rows === 0) {
        $loginError = "Korisnik ne postoji!";
    } else {
        //fetch_assoc() smjesta podatke 
        $user = $result->fetch_assoc();
        
        //password_verify - de-hesira sifru
        if (!password_verify($password, $user['password'])) {
            $loginError = "Pogrešna lozinka!";
        } else {
            // Ako je login ok, onda idemo na stranicu za logovanog korisnika
            $_SESSION['user_id'] = $user['ID']; //ovo je korisno konkretno da bi povukli sva auta korisnika!
            $_SESSION['username'] = $user['username'];

            //header funkcija omogucava navigiranje! HTTP zahtjev
            echo "Logovali smo se";
            header("Location: index.php");
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prijava korisnika</title>

    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <style>
        body {
            background-color: #f4f7fa;
        }
        .login-card {
            background: #ffffff;
            padding: 35px;
            border-radius: 12px;
            width: 350px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        h2 {
            color: #0a192f;
            font-weight: 700;
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="login-card">

        <h2 class="text-center mb-4">Prijava</h2>

        <?php if ($loginError !== ""): ?>
            <div class="alert alert-danger"><?= $loginError ?></div>
        <?php endif; ?>

        <form action="" method="POST">

            <div class="mb-3">
                <label class="form-label">korisničko ime</label>
                <input type="text" name="username" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Lozinka</label>
                <input type="password" name="password" class="form-control" required>
            </div>

            <button type="submit" class="btn btn-primary w-100">Prijavi se</button>
        </form>

        <p class="text-center mt-3">
            Nemaš nalog? <a href="registracija.php">Registruj se</a>
        </p>

    </div>

    <script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>
