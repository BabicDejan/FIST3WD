<?php
session_start();?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/override.css">

    <title>Auto Oglasi</title>
</head>

<body>

    <!-- HEADER -->
    <header id="headerSlider" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
    <div class="carousel-inner">

        <!-- slajd prva slika -->
        <div class="carousel-item active">
            <div class="slider-img" style="background-image: url('../img/car1.jpeg');"></div>
            <div class="overlay d-flex flex-column justify-content-center align-items-center">
                <h1 class="display-3 fw-bold text-white">Auto Oglasi</h1>
                <p class="lead text-white">Prodaja automobila • Brzo • Jednostavno • Pouzdano</p>
            </div>
        </div>

        <!-- slajd druga slika -->
        <div class="carousel-item">
            <div class="slider-img" style="background-image: url('../img/car2.jpg');"></div>
            <div class="overlay d-flex flex-column justify-content-center align-items-center">
                <h1 class="display-3 fw-bold text-white">Auto Oglasi</h1>
                <p class="lead text-white">Najbolje ponude na jednom mjestu</p>
            </div>
        </div>

        <!-- slajd treca slika -->
        <div class="carousel-item">
            <div class="slider-img" style="background-image: url('../img/car3.jpg');"></div>
            <div class="overlay d-flex flex-column justify-content-center align-items-center">
                <h1 class="display-3 fw-bold text-white">Auto Oglasi</h1>
                <p class="lead text-white">Pronađi idealan automobil</p>
            </div>
        </div>

    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#headerSlider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>

    <button class="carousel-control-next" type="button" data-bs-target="#headerSlider" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</header>


    <!-- navigacija -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div class="container">

            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="mainNav">
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-house-fill"></i> Početna
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#autolista">Automobili</a>
                    </li>
                    
                    <?php if(!isset($_SESSION['user_id'])):?>
                        <li class="nav-item">
                            <a class="nav-link" href="php/login.php">
                                <i class="bi bi-person-circle"></i> Prijava
                            </a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#registracija">
                            <i class="bi bi-pencil-square"></i> Zelis da objavis oglas? Registruj se
                        </a>
                    </li>
                    <?php endif; ?>
                    
                    <?php if(isset($_SESSION['user_id'])):?>
                        <li class="nav-item">
                            <a class="nav-link" href="userPage.php">
                                <i class="bi bi-person-circle"></i> Vas profil
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="logout.php">
                                <i class="bi bi-box-arrow-right"></i> Izlogujte se
                            </a>
                        </li>
                    <?php endif; ?>

                </ul>
            </div>

        </div>
    </nav>

    <section class="container my-5">
        <h2 class="text-center mb-4">Dobrodošli na Auto Oglase</h2>

        <p class="lead text-center w-75 mx-auto">
            Ovdje možete pronaći veliki izbor polovnih i novih automobila. 
            Pregledajte oglase ili postavite svoj — sve potpuno besplatno.  
            Jednostavno, brzo i pregledno.
        </p>
    </section>

    <!--sekcija za oglase, popularno, registraciju-->
    <section id="autolista" class="text-white" 
         style="background: url('../img/road.jpeg') center/cover no-repeat; height: 400px;">

        <div class="h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
            <div class="container py-5">
                <div class="row g-4 text-center">

                    <div class="col-md-4">
                        <a href="php/oglasi.php" style="text-decoration: none;">
                            <div class="p-4 auto-card">
                                <h4 class="text-decoration-underline">Najnoviji oglasi</h4>
                                <p class="lead">Pogledajte najnovije automobile koje su postavljeni danas.</p>
                            </div>
                        </a>
                    </div>

                    <div class="col-md-4">
                        <a href="php/popularno.php" style="text-decoration: none;">
                            <div class="p-4 auto-card">
                                <h4 class="text-decoration-underline">Popularni modeli</h4>
                                <p class="lead">Audi, BMW, Mercedes — sve na jednom mjestu.</p>
                            </div>
                        </a>
                    </div>

                    <div class="col-md-4">
                        <a href="#registracija" style="text-decoration: none;">
                            <div class="p-4 auto-card">
                                <h4 class="text-decoration-underline">Dodaj oglas</h4>
                                <p class="lead">Imate auto za prodaju? Postavite oglas za manje od 1 minuta.</p>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>

    </section>

<!-- Counteri za brojke -->
    <section id="statistika" class="py-5 text-center" style="background-color: #f4f7fa;">
    <div class="container-fluid bg-white">
        <div class="row g-5 justify-content-center">

            <!-- Kupci -->
            <div class="col-md-4">
                <i class="bi bi-heart-fill fs-1 mb-3 i-hover" style="color: #0a192f;"></i>
                <h2 class="counter display-4 fw-bold" data-target="1000">0</h2>
                <p class="lead">Zadovoljnih kupaca</p>
            </div>

            <!-- Oglasi -->
            <div class="col-md-4">
                <i class="bi bi-newspaper fs-1 mb-3 i-hover" style="color: #0a192f;"></i>
                <h2 class="counter display-4 fw-bold" data-target="10000">0</h2>
                <p class="lead">Oglasa postavljeno</p>
            </div>

            <!-- Iskustvo -->
            <div class="col-md-4">
                <i class="bi bi-award fs-1 mb-3 i-hover" style="color: #0a192f;"></i>
                <h2 class="counter display-4 fw-bold" data-target="15">0</h2>
                <p class="lead">Godina iskustva</p>
            </div>

        </div>
    </div>
</section>



    <!-- registracija, ovdje je bitno obratiti paznju na formu -->
    <section id="registracija" class="container my-5 w-75">

        <h2 class="text-center mb-4">Registracija korisnika</h2>

        <div class="row g-5">

            <!-- INFO -->
            <div class="col-md-6 col-sm-12">
                <h4>Napravite nalog</h4>
                <p>Kreiranjem naloga možete postavljati oglase, uređivati ih i pratiti statistiku pregleda.</p>

                <p><strong>Prednosti naloga:</strong></p>
                <ul>
                    <li>Brzo postavljanje oglasa</li>
                    <li>Uređivanje i brisanje postojećih oglasa</li>
                </ul>
            </div>

            <!-- FORMA -->
            <div class="col-md-6 col-sm-12">
                <form action="php/registracija.php" method="POST" id="registerForm">

                <div class="mb-3">
                    <label class="form-label">Ime i prezime</label>
                    <input type="text" class="form-control" name="username" id="username" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" name="email" id="email" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Lozinka</label>
                    <input type="password" class="form-control" name="password" id="password" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Ponovi lozinku</label>
                    <input type="password" class="form-control" name="confirm_password" id="confirm_password" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Kontakt telefon</label>
                    <input type="text" class="form-control" name="contact_no" id="contact_no" required>
                </div>

                <button type="submit" class="btn btn-primary w-100">Kreiraj nalog</button>

                </form>
                <p id="errorMsg" class="text-danger fw-bold mt-3"></p>

            </div>

        </div>

    </section>

    <!-- FOOTER -->
    <footer class="text-center text-white py-3">
        &copy; 2025 Auto Oglasi
    </footer>

    <script src="../js/bootstrap.bundle.min.js"></script>
    <script src="../js/counter.js"></script>
    <script src="../js/validacijaForme.js"></script>
</body>
</html>
