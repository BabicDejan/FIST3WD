<?php
session_start();
require_once "db.php";

// Ako korisnik nije ulogovan
if (!isset($_SESSION['user_id'])) {
    die("Morate se ulogovati! <a href='login.php'>Login</a>");
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Ako je admin  prikazujemo sva auta
if ($username === "admin") {
    $query = "SELECT cars.*, users.username 
              FROM cars 
              JOIN users ON cars.owner_id = users.ID";
    $stmt = $connection->prepare($query);
} 
// Inače prikazujemo samo njegova auta
else {
    $query = "SELECT * FROM cars WHERE owner_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $user_id);
}

$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <title>Korisnički panel</title>

    <style>
        .car-card {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            background: white;
            transition: 0.3s;
        }
        .car-card:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .car-card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
        }

    </style>
</head>
<body class="bg-light">

    <div class="container py-5">

        <!-- header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <!-- htmlspecialchars funkcija se koristi da izbjegne HTML injekciju, moze i bez ovoga, ovo je prikaza radi -->
            <h2>Dobrodošli, <strong><?php echo htmlspecialchars($username); ?></strong></h2>

            <div class="d-flex gap-2">
                <a href="addCar.php" class="btn btn-success">
                    + Dodaj novi oglas
                </a>

                <a href="logout.php" class="btn btn-danger" onClick="return confirm('Da li ste sigurni?')">
                    Izlogujte se
                </a>
            </div>
        </div>

        <hr>

        <h4 class="mb-3">
            <?php if($username=="admin"):?>
            <?php "Svi dostupni oglasi:"?> 
            <?php else: "Vasi oglasi: "?>
            <?php endif; ?>
        </h4>

        <div class="row g-4">

            <?php while ($car = $result->fetch_assoc()): ?>
                <div class="col-md-4">
                    <div class="car-card">

                        <h5 class="fw-bold"><?php echo htmlspecialchars("{$car['car']} {$car['model']}"); ?></h5>
                        <img src="../uploads/cars/<?php echo htmlspecialchars($car['image']); ?>" 
                            alt="Slika vozila" class="img-fluid rounded mb-3">
                        <p><strong>Godina:</strong> <?php echo htmlspecialchars($car['year']); ?></p>
                        <p><strong>Cijena:</strong> <?php echo htmlspecialchars($car['price']); ?> €</p>

                        <?php if ($username === "admin"): ?>
                            <p><strong>Postavio:</strong> <?php echo htmlspecialchars($car['username']); ?></p>
                        <?php endif; ?>
                        
                        <div class="mt-3 d-flex gap-2">
                            <a href="editCar.php?id=<?php echo $car['ID']; ?>" 
                            class="btn btn-warning w-50">Izmijeni</a>

                            <a href="deleteCar.php?id=<?php echo $car['ID']; ?>" 
                            onclick="return confirm('Da li ste sigurni da želite obrisati ovaj oglas?');"
                            class="btn btn-danger w-50">Obriši</a>
                        </div>
                        
                    </div>
                </div>
            <?php endwhile; ?>

        </div>

    </div>

</body>
</html>
