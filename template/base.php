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
        ?>
    </div>
    <aside class="menu">
        <nav class="container-fluid">
            <ul>
                <li class="li-profile">
                    <a <?php isActive("profile.php");?> href="profile.php">
                        <img src="upload/user.png" alt="user">
                        <label for="profile">Profile</label>
                    </a>
                </li>
                <li class="li-home">
                    <a <?php isActive("homepage.php");?> href="homepage.php">
                        <img src="upload/home.png" alt="home"><label for="home">Home</label>
                    </a>
                </li>
                <li class="li-new-post">
                    <a <?php isActive("new_post.php");?> href="new_post.php">
                        <img src="upload/add.png" alt="add">
                        <label for="new post">New Post</label>
                    </a>
                </li>
                <li class="li-search">
                    <a <?php isActive(".php");?> href="#">
                        <img src="upload/search.png" alt="search">
                        <label for="search">Search</label>
                    </a>
                </li>
                <li class="li-settings">
                    <a <?php isActive("settings.php");?> href="settings.php">
                        <img src="upload/settings.png" alt="settings">
                        <label for="settings">Settings</label>
                    </a>
                </li>
                <li class="li-logout">
                    <a <?php isActive("logout.php");?> href="logout.php">
                        <img src="upload/logout.png" alt="logout">
                        <label for="logout">Logout</label>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</body>
</html>