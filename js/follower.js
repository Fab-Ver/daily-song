function showProfile(result){
    let profile = `
       <div class="grid">
           <img src="${result["profilePicture"]}" alt="" width="50%"/>
           <p>@${result["username"]}<br> ${result["firstName"]} ${result["lastName"]}</p>
           <p>${result["profileNumberOfFollower"]} <br> <a href="follower.php?data=follower">follower</a></p>
           <p>${result["profileNumberOfFollowed"]} <br> <a href="follower.php?data=followed">followed</a></p>
           <p>${result["posts"].length} <br> post</p>
           <p>${result["typeOfSearch"]}</p>
       </div>
       <div class="grid" id="searchResult">

       </div>
       `;
    return profile;
}

function showSearchResult(searchResult){
    let result = "";
    let max = result["typeOfSearch"] == "follower" ? result["profileNumberOfFollower"] 
                                                   : result["profileNumberOfFollowed"];
    for(let i=0; i < max; i++){
        let profile = `
            <img src="${searchResult[i]["profilePicture"]}" alt="" width="50%"/>
            <p>@${searchResult[i]["username"]}</p>
        `;
        result += profile;
    }
    return result;
}

axios.get('api-follower.php').then(response => {
    console.log(response.data);
    const profile = showProfile(response.data);
    const searchResult = showSearchResult(response["searchResult"]);
    console.log(searchResult);
    const main = document.querySelector("main");
    main.innerHTML = profile;
    const div = document.querySelector("#searchResult");
    div.innerHTML = searchResult;
});

