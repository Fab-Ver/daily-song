<!DOCTYPE html>
<html lang="it">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["titolo"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>
<body>
    <header>
        <h1>Nome sito</h1>
    </header>
    <nav>
        <ul>
            <li><a href="homepage.php">Home</a></li><li><a href="profilo.php">Profilo</a></li><li><a href="impostazioni.php">Impostazioni</a></li><li><a href="notifiche.php">Notifiche</a></li>
        </ul>
    </nav>
    <main>
    <?php
    if(isset($templateParams["nome"])){
        require($templateParams["nome"]);
    }
    ?>
    </main>
    <footer>
        <p>Nome sito</p>
    </footer>
</body>
</html>