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
<body class="container-fluid">
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
                    <a <?php isActive(".php");?> href="#">
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
                        <summary aria-haspopup="listbox" role="link">Music genre</summary>
                        <ul role="listbox">
                            <li>
                                <label for="switch_Rock">
                                    <input type="checkbox" id="switch_Rock" name="switch_Rock" role="switch">
                                    Rock
                                </label>
                            </li>
                            <li>
                                <label for="switch_Metal">
                                    <input type="checkbox" id="switch_Metal" name="switch_Metal" role="switch">
                                    Metal
                                </label>
                            </li>
                            <li>
                                <label for="switch_Pop">
                                    <input type="checkbox" id="switch_Pop" name="switch_Pop" role="switch">
                                    Pop
                                </label>
                            </li>
                            <li>
                                <label for="switch_Indie">
                                    <input type="checkbox" id="switch_Indie" name="switch_Indie" role="switch">
                                    Indie
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li class="settings">
                    <a <?php isActive("settings.php");?> href="settings.php">
                        <img src="upload/settings.png" alt="settings" width="20%" height="20%">
                        Settings
                    </a>
                </li>
                <li>
                    <a <?php isActive(".php");?> href="#">
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
                    <span class="badge">3</span>
                    </summary>
                <ul role="listbox">
                    <li><a href="text">Text shbyhdbsw hxcbuxusnx uhxhs</a></li>
                    <li><a href="text">Text shbyhdbsw hxcbuxusnx uhxhs</a></li>
                </ul>
            </details>
        </section>
        <main>
            <p>main</p>
        </main>
    </div>
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