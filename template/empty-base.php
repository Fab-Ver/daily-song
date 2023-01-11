<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>">
    <link rel="stylesheet" type="text/css" href="./css/form_style.css" />
    
    <!--Pico.css-->
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
    <link rel="stylesheet" type="text/css" href="./css/default_style.css" />
</head>
<body>
    <?php
        if(!isset($templateParams["error"])){
            echo '<header>
                <img src="'.UPLOAD_DIR.'logo.png" alt=""></img>
                <h1>DailySong</h1>
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