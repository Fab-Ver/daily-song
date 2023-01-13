/**
 * Create the initial part of a user profile with image, username, full name, follower, followed, posts, favourite genres 
 * and a follow button if its not me.
 * @returns div containing the user profile infos
 */
function showProfileHeader(result){
    return `
        <div class="main-header">
            <div class="profile-header">
                <img class="profile-image" src="${result["profilePicture"]}" alt=""/>
                <div class="center-text header-div">
                    <label id="profileUsername" class="header-element">${result["username"]}</label>
                    <label class="header-element">${result["firstName"]} ${result["lastName"]}</label>
                </div>
            </div>
            <div class="profile-header">
                <div class="center-text header-div">
                    <label class="header-element">${result["profileNumberOfFollower"]}</label>
                    <a class="header-element" href="follower.php?user=${result["username"]}&kind=follower">follower</a>
                </div>
                <div class="center-text header-div">
                    <label class="header-element">${result["profileNumberOfFollowed"]}</label>
                    <a class="header-element" href="follower.php?user=${result["username"]}&kind=followed">followed</a>
                </div>
                <div class="center-text header-div">
                    <label class="header-element">${result["posts"].length}</label>
                    <a class="header-element" href="profile.php">posts</a>
                </div>
                ${result["isMyProfile"] ? '' : generateFollowButton(result["canFollow"])}
            </div>
        </div>
    `;
}  

/**
 * Create the button to follow or unfollow a user.
 * @returns button containing follow or unfollow
 */
function generateFollowButton(canFollow) {
    if (canFollow) {
        return '<button id="followButton" class="followButton" name="follow" onclick="updateFollowed(true)">Follow</button>';
    } else {
        return '<button id="followButton" class="secondary followButton unfollowerButton" name="unfollow" onclick="updateFollowed(false)">Unfollow</button>';
    }
}

/**
 * Send a post request with username of who I want to follow or unfollow to update the database,
 * then change the followButton.
 * @returns buttons containing like or dislike
 */
function updateFollowed(canFollow){
    let button = document.getElementById("followButton");
    button.disabled = true;
    let formData = new FormData();
    username = document.getElementById("profileUsername").innerText;
    formData.append('username', username);
    formData.append('value', canFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        if(response.data["followButton"]){
            document.getElementById("followButton").outerHTML = generateFollowButton(!canFollow);
        }
    });
}

/**
 * Select the main and insert the divisions of profile page.
 */
const main = document.querySelector("main");
main.innerHTML = `
                    <div id="header"></div>
                    <p id="genres"></p>
                    <div id="content"></div>
                `;

/**
 * Send a get request with location.search to know who's profile I have to show.
 */
axios.get('api-profile.php'+location.search).then(response => {
    const profileHeader = showProfileHeader(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profileHeader;
});

