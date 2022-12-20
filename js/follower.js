function showSearchResult(searchResult){
    let result = "";
    for (let user of searchResult) {
        let profile = `
        <div><a href="profile.php?user=${user}">@${user}</a></div>
        `;
        //<img src="${searchResult[i]["profilePicture"]}" alt="" width="50%"/>
        //<p>@${user["username"]}</p>
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

