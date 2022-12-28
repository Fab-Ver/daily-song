function showSearchResult(searchResult){
    let result = "";
    for (let user of searchResult) {
        let profile = `
        <div>
            <img src="${user["profilePicture"]}" alt="" width="5%"/>
            <a href="profile.php?user=${user["username"]}">${user["username"]}</a>
        </div>
        `;
        result += profile;
    }
    return result;
}

axios.get('api-follower.php'+location.search).then(response => {
    console.log(response.data);
    const searchResult = showSearchResult(response.data["searchResult"]);
    console.log(searchResult);
    const content = document.querySelector("#content");
    content.innerHTML = searchResult;
});

