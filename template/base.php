<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="decription" content="is a digital music social that gives you the possibility to share a day song with your friends"/>
</head>
<body>
    <aside class="menu">
        <nav class="container-fluid">
            <ul></ul>
            <script src="js/base.js" type="text/javascript"></script>
        </nav>
    </aside>
    <div class="main-div">
        <h1>Title</h1>
        <nav class="container">
            <details role="list" class="music-genre">
                <summary aria-haspopup="listbox" role="link">Music genre</summary>
                <ul role="listbox">
                    <?php foreach($genres as $genre): ?>
                    <li>
                        <label for="switch <?php echo $genre["tag"]; ?>">
                            <input type="checkbox" id="switch<?php echo $genre["genreID"]; ?>" role="switch">
                            <?php echo $genre["tag"]; ?>
                        </label>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </details>
            <details role="list" class="notification">
                <summary aria-haspopup="listbox" role="link">3 Notification</summary>
                <ul role="listbox">
                    <li>Text shbyhdbsw hxcbuxusnx uhxhs</p></li>
                    <li>Text shbyhdbsw hxcbuxusnx uhxhs</li>
                </ul>
            </details>
        </nav>
        <main></main>

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