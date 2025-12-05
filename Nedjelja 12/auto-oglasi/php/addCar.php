<?php
session_start();

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dodaj novi oglas</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">

    <style>
        body {
            background-color: #f4f7fa;
        }
        .form-box {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            width: 450px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="form-box">
        <h3 class="text-center mb-4">Dodaj novi oglas</h3>

        <!-- enctype mora biti postavljen kada su u pitanju uploadi putem forme! -->
        <form action="insertCar.php" method="POST" enctype="multipart/form-data">

            <div class="mb-3">
                <label class="form-label">Marka</label>
                <input type="text" name="brand" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Model</label>
                <input type="text" name="model" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Godina</label>
                <input type="number" name="year" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Cijena (e)</label>
                <input type="number" name="price" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Opis</label>
                <textarea name="opis" class="form-control" rows="4"></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Slika vozila</label>
                <input type="file" name="slika" class="form-control" accept="image/*" required>
            </div>

            <button type="submit" class="btn btn-success w-100">
                Dodaj oglas
            </button>

        </form>
    </div>

    <script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>