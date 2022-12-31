const datiMenu = [{
    "Link": "profile.php",
    "Immagine": "./upload/user.png",
    "Alt": "profile user",
    "Name": "Profile"
},{
    "Link": "homepage.php",
    "Immagine": "./upload/home.png",
    "Alt": "home",
    "Name": "Home"
},{
    "Link": "new_post.php",
    "Immagine": "./upload/add.png",
    "Alt": "add new post",
    "Name": "New Post"
},{
    "Link": "search.php",
    "Immagine": "./upload/search.png",
    "Alt": "search profile",
    "Name": "Search"
},{
    "Link": "settings.php",
    "Immagine": "./upload/settings.png",
    "Alt": "settings",
    "Name": "Settings"
},{
    "Link": "logout.php",
    "Immagine": "./upload/logout.png",
    "Alt": "logout",
    "Name": "Logout"
}]

const ul_menu = document.querySelector("aside").querySelector("nav").querySelector("ul");

for(let i=0; i<datiMenu.length; i++) {
    const li = `
    <li class="li-profile">
        <a role="button" class="contrast" href="${datiMenu[i].Link}">
            <figure>
                <img src="${datiMenu[i].Immagine}" alt="${datiMenu[i].Alt}">
                <figcaption>${datiMenu[i].Name}</figcaption>
            </figure>
        </a>
    </li>
    `;
    ul_menu.innerHTML = ul_menu.innerHTML + li;
}


const ul_genre = document.querySelector("div").querySelector(".track_genres").querySelector("ul");

