function showSearchResult(searchResult){
    let result = "";
    for (let user of searchResult) {
        let profile = `
        <div>
            <img src="${user["profilePicture"]}" alt="" width="5%"/>
            <a href="profile.php?user=${user["username"]}">${user["username"]}</a>
            ${generateFollowButton(user["canFollow"], user["username"])}
        </div>
        `;
        result += profile;
    }
    return result;
}

function generateFollowButton(canFollow, profileUser) {
    if (canFollow) {
        return `<button id="followButton" name="follow" onclick="updateFollowed(true, ${profileUser})">Follow</button>`;
    } else {
        return `<button id="followButton" class="secondary" name="unfollow" onclick="updateFollowed(false, ${profileUser})">Unfollow</button>`;
    }
}

function updateFollowed(canFollow, profileUser){
    let formData = new FormData();
    formData.append('username', profileUser);
    formData.append('value', canFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            document.getElementById("followButton").outerHTML = generateFollowButton(!canFollow);
        }
    });
}

axios.get('api-follower.php'+location.search).then(response => {
    console.log(response.data);
    const searchResult = showSearchResult(response.data["searchResult"]);
    const content = document.querySelector("#content");
    content.innerHTML = searchResult;
});

