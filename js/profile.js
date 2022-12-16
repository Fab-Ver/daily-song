function showProfile(result){
 let profile = `
    <div>
        <img src="${result["profilePicture"]}" alt="" width = "20%" height = "20%"/>
    </div>
    `;
 return profile;
}

axios.get('api-profile.php').then(response => {
    console.log(response.data["profilePicture"]);
    const profile = showProfile(response.data);
    const main = document.querySelector("main");
    main.innerHTML = profile;
});

