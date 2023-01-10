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
        return `<button id="followButton_${profileUser}" name="follow" onclick="updateFollowed(true, this.id)"> Follow</button>`;
    } else {
        return `<button id="followButton_${profileUser}" class="secondary" name="unfollow" onclick="updateFollowed(false, this.id)">Unfollow</button>`;
    }
}

function updateFollowed(wantToFollow, id){
    let profileUsername = id.replace("followButton_", "");
    let formData = new FormData();
    formData.append('username', profileUsername);
    formData.append('value', wantToFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            document.getElementById(id).outerHTML = generateFollowButton(!wantToFollow, profileUsername);
        }
    });
}

axios.get('api-follower.php'+location.search).then(response => {
    console.log(response.data);
    const searchResult = showSearchResult(response.data["searchResult"]);
    const content = document.querySelector("#content");
    content.innerHTML = searchResult;
});

