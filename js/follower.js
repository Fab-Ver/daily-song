/**
 * Create a div with the list of all the user follower/d and a button to follow them.
 * @returns div containing users
 */
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
            isNotMe = generateFollowerButton(user["canFollow"], user["username"]);
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

/**
 * Generate a button to follow or unfollow a user.
 * @returns button
 */
function generateFollowerButton(canFollow, profileUser) {
    if (canFollow) {
        return `<button class="followerButton" id="followerButton_${profileUser}" name="follow" onclick="updateFollower(true, this.id)"> Follow </button>`;
    } else {
        return `<button class="followerButton secondary unfollowerButton" id="followerButton_${profileUser}" name="unfollow" onclick="updateFollower(false, this.id)"> Unfollow </button>`;
    }
}

/**
 * Send a post request with the username that I want to follow or unfollow.
 */
function updateFollower(wantToFollow, id){
    let button = document.getElementById(id);
    button.disabled = true;
    let profileUsername = id.replace("followerButton_", "");
    let formData = new FormData();
    formData.append('username', profileUsername);
    formData.append('value', wantToFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        if(response.data["followButton"]){
            document.getElementById(id).outerHTML = generateFollowerButton(!wantToFollow, profileUsername);
        }
    });
}

/**
 * Send a get request with the location.search to create the follower user section.
 */
axios.get('api-follower.php'+location.search).then(response => {
    const searchResult = showSearchResult(response.data);
    const content = document.querySelector("#content");
    content.innerHTML = searchResult;
});

