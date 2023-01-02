function showProfileHeader(result){
    return `
        <div class="grid">
            <img class="profile-image" src="${result["profilePicture"]}" alt=""/>
            <div class="center-text">
                <div id="profileUsername">${result["username"]}</div>
                <div>${result["firstName"]} ${result["lastName"]}</div>
            </div>
            <div class="center-text">
                <div>${result["profileNumberOfFollower"]}</div>
                <div><a href="follower.php?user=${result["username"]}&kind=follower">follower</a></div>
            </div>
            <div class="center-text">
                <div>${result["profileNumberOfFollowed"]}</div>
                <div><a href="follower.php?user=${result["username"]}&kind=followed">followed</a></button></div>
            </div>
            <div class="center-text">
                <div>${result["posts"].length}</div>
                <div><a href="profile.php?user=${result["username"]}">posts</a></div>
            </div>
            ${result["isMyProfile"] ? '' : generateFollowButton(result["canFollow"])}
        </div>
    `;
}  

function generateFollowButton(canFollow) {
    if (canFollow) {
        return '<button id="followButton" name="follow" onclick="updateFollowed(true)">Follow</button>';
    } else {
        return '<button id="followButton" class="secondary" name="unfollow" onclick="updateFollowed(false)">Unfollow</button>';
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

