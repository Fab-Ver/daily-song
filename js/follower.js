function showSearchResult(data){
    let result = "";
    for (let user of data["searchResult"]) {
        let startProfile = `
            <div class="follower left-text">
                <div class="followerDiv">
                    <img class="followerImage" src="${user["profilePicture"]}" alt=""/>
                    <a href="profile.php?user=${user["username"]}">${user["username"]}</a>
                </div>
                <div class="followerButtonDiv">
        `;
        let isNotMe = "";
        if(data["sessionUser"] != user["username"]){
            isNotMe = generateFollowButton(user["canFollow"], user["username"]);
        }
        let endProfile = `
            </div>
            </div>
        `;
        startProfile += isNotMe;
        startProfile += endProfile
        result += startProfile;
    }
    return result;
}

function generateFollowButton(canFollow, profileUser) {
    if (canFollow) {
        return `<button class="followerButton" id="followButton_${profileUser}" name="follow" onclick="updateFollowed(true, this.id)"> Follow </button>`;
    } else {
        return `<button class="followerButton secondary unfollowerButton" id="followButton_${profileUser}" name="unfollow" onclick="updateFollowed(false, this.id)"> Unfollow </button>`;
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
    const searchResult = showSearchResult(response.data);
    const content = document.querySelector("#content");
    content.innerHTML = searchResult;
});

