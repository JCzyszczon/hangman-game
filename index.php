<!-- PHP - starting a database connection and randomizing categories + game passwords -->
<?php
    session_start();

    require_once "connect.php";
    
    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);

    // Depending on which button we click (Main Menu Section) - game password is taken from diffrent tables

    if(isset($_POST['wybor-tytuly'])) {
        $sql = "SELECT haslo, kategoria FROM tytuly ORDER BY RAND() LIMIT 1";
        $result = $polaczenie->query($sql);
        while($rows=$result->fetch_assoc())
        {
            $var = $rows['haslo'];
            $var2 = $rows['kategoria'];
        }
        $polaczenie->close();
    }
    if(isset($_POST['wybor-postacie'])) {
        $sql = "SELECT haslo, kategoria FROM postacie ORDER BY RAND() LIMIT 1";
        $result = $polaczenie->query($sql);
        while($rows=$result->fetch_assoc())
        {
            $var = $rows['haslo'];
            $var2 = $rows['kategoria'];
        }
        $polaczenie->close();
    }
    if(isset($_POST['wybor-przyslowia'])) {
        $sql = "SELECT haslo, kategoria FROM rozne ORDER BY RAND() LIMIT 1";
        $result = $polaczenie->query($sql);
        while($rows=$result->fetch_assoc())
        {
            $var = $rows['haslo'];
            $var2 = $rows['kategoria'];
        }
        $polaczenie->close();
    }
    
?>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gra w Wisielca - Start</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="x-icon" href="img/icon.jpg">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <script src="https://kit.fontawesome.com/5b97fedfc1.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Start Section -->
    <section id="start">
        <div class="border-gradient">
            <h1 class="title">Gra w wisielca</h1>
            <img src="img/s9.jpg" alt="">
            <span id="start-button">start</span>
        </div>
    </section>
    <!-- Main Menu Section -->
    <section id="wybor-kategorii">
        <div class="border-gradient">
            <div class="icons">
                <i class='bx bx-slider' id="settings"></i>
                <i class='bx bx-volume-full' id="volume-icon"></i>
                <i class='bx bxs-volume-mute' id="volume-icon-mute"></i>
            </div>
            <h1 class="title2">Wybierz Kategorie</h1>
            <form method="POST" action="index.php">
                <input type="submit" name="wybor-tytuly" value="Tytuły" class="border-gradient bttn" id="toGame">
                <input type="submit" name="wybor-postacie" value="Postacie" class="border-gradient bttn" id="toGame2">
                <input type="submit" name="wybor-przyslowia" value="Przysłowia" class="border-gradient bttn" id="toGame3">
            </form>
        </div>
    </section>
    <!-- Settings Section -->
    <section id="ustawienia">
        <div class="border-gradient">
            <div class="icons">
                <i class='bx bx-arrow-back' id="back"></i>
            </div>
            <h1 class="title2">Ustawienia Dzwięku</h1>
            <div class="music-container">
                <h3>Muzyka</h3>
                <i class='bx bx-minus' id="minus"></i>
                <i class='bx' id="volume">0%</i>
                <i class='bx bx-plus' id="plus"></i>
            </div>
            <div class="sound-container">
                <h3>Dźwięki</h3>
                <div class="sounds">
                    <div id="wl" class="sound-bttn">On</div>
                    <div id="wyl" class="sound-bttn">Off</div>
                    <div style="clear: both;"></div>
                </div>
            </div>
            <div class="sound-container">
                <h3>Klik</h3>
                <div class="sounds">
                    <div id="wl2" class="sound-bttn">On</div>
                    <div id="wyl2" class="sound-bttn">Off</div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </section>
    <!-- Game Section -->
    <section id="game">
        <div class="border-gradient">
            <div class="icons">
                <i class='bx bx-arrow-back' id="back2"></i>
                <h3 id="points">Punkty: 0</h3>
            </div>
            <div class="content">
                <div id="plansza">

                </div>
                <div id="szubienica">
                    <img src="img/s0.jpg" class="img-szubienica" alt="">
                </div>
                <div id="alfabet">
                    
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="info">
                <div id="zycia">Życia: 9</div>
                <div id="kategoria"></div>
            </div>
        </div>
    </section>
    <!-- Footer Link Section -->
    <footer>
        <div>
            <span><a href="https://github.com/JCzyszczon" target="_blank">jczyszczon</a></span>
        </div>
    </footer>
    <!-- Passing variables from PHP to JS -->
    <script>
        var haslo = "<?= $var ?>";
        var kategoria = "<?= $var2 ?>";
    </script>
    <script src="main.js"></script>
</body>
</html>