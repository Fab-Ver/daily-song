const datiMenu = [{
    "Link": "profile.php",
    "Immagine": "./res/user.png",
    "Alt": "profile user",
    "Name": "Profile"
},{
    "Link": "homepage.php",
    "Immagine": "./res/home.png",
    "Alt": "home",
    "Name": "Home"
},{
    "Link": "new_post.php",
    "Immagine": "./res/add.png",
    "Alt": "add new post",
    "Name": "New Post"
},{
    "Link": "search.php",
    "Immagine": "./res/search.png",
    "Alt": "search profile",
    "Name": "Search"
},{
    "Link": "settings.php",
    "Immagine": "./res/settings.png",
    "Alt": "settings",
    "Name": "Settings"
},{
    "Link": "logout.php",
    "Immagine": "./res/logout.png",
    "Alt": "logout",
    "Name": "Logout"
}]

const menu = document.getElementById("menu");

for(let i=0; i<datiMenu.length; i++) {
    const button = `
    <button onclick = "window.location.href='${datiMenu[i].Link}';">
        <img src="${datiMenu[i].Immagine}" alt="${datiMenu[i].Alt}" />
        <span>${datiMenu[i].Name}</span>
    </button>
    `;
    menu.innerHTML += button;
}