const menuSettings = ["Theme", "description"];

const main = document.querySelector("main");

for(let i=0; i<menuSettings.length; i++) {
    const set = `
        <a href="#" role="button" class="contrast">${menuSettings[i]}</a>
    `;
    main.innerHTML = main.innerHTML + set;
}

document.querySelectorAll("main a")[0].addEventListener("click", function(){
    console.log("theme clicked");
});