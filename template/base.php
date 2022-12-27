<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta neme="decription" content="is a digital music social that gives you the possibility to share a day song with your friends"/>
</head>
<body>
    <aside>
        <nav>
            <ul>
                <li>
                    <a <?php isActive("profile.php");?> href="profile.php">
                        <img src="upload/user.png" alt="user" width="20%" height="20%">
                        Profilo
                    </a>
                </li>
                <li>
                    <a <?php isActive("homepage.php");?> href="homepage.php">
                        <img src="upload/home.png" alt="home" width="20%" height="20%">
                        Home
                    </a>
                </li>
                <li>
                    <a <?php isActive("new_post.php");?> href="new_post.php">
                        <img src="upload/add.png" alt="add" width="20%" height="20%">
                        New Post
                    </a>
                </li>
                <li>
                    <a <?php isActive(".php");?> href="#">
                        <img src="upload/search.png" alt="search" width="20%" height="20%">
                        Search
                    </a>
                </li>
                <li>
                    <details role="list">
                        <summary aria-haspopup="listbox" role="link" class="music_genre">
                        <img src="upload/songs-folder.png" alt="songs_folder" width="30%" height="30%">    
                        <label for="Music genre">Music genre</label> 
                        </summary>
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
                </li>
                <li>
                    <a <?php isActive("settings.php");?> href="settings.php">
                        <img src="upload/settings.png" alt="settings" width="20%" height="20%">
                        Settings
                    </a>
                </li>
                <li>
                    <a <?php isActive("logout.php");?> href="logout.php">
                        <img src="upload/logout.png" alt="logout" width="20%" height="20%">
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
    <div>
        <section>
            <h1>Titolo</h1>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="button" class="notification">
                    <img src="upload/notify.png" alt="notify" width="30%" height="30%">
                    3 <!--TO GET -->
                </summary>
                <ul role="listbox">
                    <li>Text shbyhdbsw hxcbuxusnx uhxhs<input type="checkbox"></li>
                    <li>Text shbyhdbsw hxcbuxusnx uhxhs<input type="checkbox"></li>
                </ul>
            </details>
        </section>
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
</body>
</html>