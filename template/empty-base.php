<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/form_style.css" />
    
    <!--Pico.css-->
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
</head>
<body>
    <?php
        if(!isset($templateParams["error"])){
            echo '<header>
                <h1>Nome sito</h1>
            </header>';
        }
    ?>
    <main class="container">
    <?php
    if(isset($templateParams["error"])){
        echo $templateParams["error"];
    }
    ?>
    </main>
    <?php
    if(isset($templateParams["js"])):
        foreach($templateParams["js"] as $script):
    ?>
        <script src="<?php echo $script; ?>"></script>
    <?php
        endforeach;
    endif;
    ?>
</body>
</html>