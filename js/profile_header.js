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

function generateFollowButton(canFollow) {
    if (canFollow) {
        return '<button id="followButton" class="followButton" name="follow" onclick="updateFollowed(true)">Follow</button>';
    } else {
        return '<button id="followButton" class="secondary followButton" name="unfollow" onclick="updateFollowed(false)">Unfollow</button>';
    }
}

function updateFollowed(canFollow){
    let formData = new FormData();
    username = document.getElementById("profileUsername").innerText;
    formData.append('username', username);
    formData.append('value', canFollow ? "add" : "remove");
    axios.post('api-profile.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            document.getElementById("followButton").outerHTML = generateFollowButton(!canFollow);
        }
    });
}

const main = document.querySelector("main");
main.innerHTML = `<div id="header"></div>
                  <p id="genres"></p>
                  <div id="content"></div>`;

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const profileHeader = showProfileHeader(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profileHeader;
});

