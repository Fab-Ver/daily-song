<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="decription" content="is a digital music social that gives you the possibility to share a day song with your friends"/>
</head>
<body>
    <aside class="menu">
        <nav class="container-fluid">
            <ul></ul>
        </nav>
    </aside>
    <div class="main-div">
        <section class="grid">
            <h1>Title</h1>
            <section class="grid">
                <details id="track_genres" role="list" class="track_genres">
                    <summary aria-haspopup="listbox">Select music genres</summary>
                    <ul id="genres_list" role="listbox">
                        <li>
                            <input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()">
                        </li>
                    </ul>
                </details>
                <input type="date" id="date" name="date">
                <details id="notification" role="list" class="notification">
                    <summary aria-haspopup="listbox">3 Notification</summary>
                    <ul id="notification_list" role="listbox">
                        <li>Text shbyhdbsw hxcbuxusnx uhxhs</p></li>
                        <li>Text shbyhdbsw hxcbuxusnx uhxhs</li>
                    </ul>
                </details>
            </section>
        </section>
        <main></main>

        <script src="js/base.js" type="text/javascript"></script>
        <?php
        if(isset($templateParams["js"])):
            foreach($templateParams["js"] as $script):
        ?>
            <script src="<?php echo $script; ?>"></script>
        <?php
            endforeach;
        endif;
        if(isset($templateParams["error"])):
            echo $templateParams["error"];
        endif;
        ?>
        
    </div>
</body>
</html>