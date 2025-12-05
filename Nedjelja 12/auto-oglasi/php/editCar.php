<?php
session_start();
require_once "db.php";

if(!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];


//ovo je vrlo bitno, proslijedjeno u header-u zahtjeva! link?id=; id je id auta
$car_id = $_GET['id'];


$query = "SELECT * FROM cars WHERE ID = ?";
$stmt  = $connection->prepare($query);
$stmt->bind_param("i", $car_id);
$stmt->execute();
$result = $stmt->get_result();

$result = $result->fetch_assoc();

//treba da kreiramo formu ponovo, ali ovaj put njene vrijednosti moramo da postavimo!
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
        <h3 class="text-center mb-4">Izmijenite oglas</h3>

        <!-- enctype mora biti postavljen kada su u pitanju uploadi putem forme! -->
        <form action="updateCar.php" method="POST">

            <div class="mb-3">
                <label class="form-label">Marka</label>
                <input type="text" name="brand" class="form-control" value="<?php echo $result['car'];?>"   required>
            </div>

            <div class="mb-3">
                <label class="form-label">Model</label>
                <input type="text" name="model" class="form-control" value="<?php echo $result['model']?>"  required>
            </div>

            <div class="mb-3">
                <label class="form-label">Godina</label>
                <input type="number" name="year" class="form-control" value="<?php echo $result['year']?>"   required>
            </div>

            <div class="mb-3">
                <label class="form-label">Cijena (e)</label>
                <input type="number" name="price" class="form-control" value="<?php echo $result['price']?>"  required>
            </div>

            <div class="mb-3">
                <label class="form-label">Opis</label>
                <textarea name="description" class="form-control" rows="4" >"<?php echo $result['description']?>"</textarea>
            </div>

            <button type="submit" class="btn btn-warning w-100">
                Izmijenite oglas
            </button>

            <input type="hidden" name="id" value="<?php echo $car_id; ?>">


        </form>
    </div>

    <script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>