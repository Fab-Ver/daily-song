<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>">
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
    <link rel="stylesheet" type="text/css" href="./css/default_style.css" />
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="decription" content="is a digital music social that gives you the possibility to share a day song with your friends"/>
</head>
<body>
    <aside class="menu_bar">
        <div id="menu"></div>
    </aside>
    <div class="main-div">
        <section class="grid">
            <h1>DailySong</h1>
            <details id="notification" role="list">
                <summary id="notification_summury" aria-haspopup="listbox"></summary>
                <ul id="notification_list" role="group" title="notification list"></ul>
            </details>
        </section>
        <main>
            <?php
            if(isset($templateParams["error"])):
                echo $templateParams["error"];
            endif;
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
        <script src="js/base.js" type="text/javascript"></script>
        <script src="js/notification.js" type="text/javascript"></script>
        
    </div>
</body>
</html>