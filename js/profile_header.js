function showProfileHeader(result){
    let profile = `
        <div class="grid">
            <img src="${result["profilePicture"]}" alt="" width="50%"/>
            <div class="center-text">
                <div id="username2">${result["username"]}</div>
                <div>${result["firstName"]} ${result["lastName"]}</div>
            </div>
            <div class="center-text">
                <div>${result["profileNumberOfFollower"]}</div>
                <div><a href="follower.php?kind=follower">follower</a></div>
            </div>
            <div class="center-text">
                <div>${result["profileNumberOfFollowed"]}</div>
                <div><a href="follower.php?kind=followed">followed</a></div>
            </div>
            <div class="center-text">
                <div>${result["posts"].length}</div>
                <div><a href="profile.php?user=${result["username"]}">posts</a></div>
            </div>
        `;
    let button = "";

    if(!result["isMyProfile"]){
        if(result["canFollow"]){
        button = `
            <form id="followButton"><input type="button" name="follow" value="Follow" onclick="insertFollowed()"></input></form>
            </div>
        `;
        } else {
        button = `
            <form id="followButton"><input type="button" class="secondary" name="unfollow" value="Unfollow" onclick="removeFollowed()"></input></form>
            </div>
            `;
        }
    }
    profile += button;
    return profile;
}

function insertFollowed(){
    let formData = new FormData();
    username = document.getElementById("username2").innerText;
    formData.append('username', username);
    formData.append('value', "add");
    axios.post('api-profile.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            updateButton(false);
        }
    });
}

function removeFollowed(){
    let formData= new FormData();
    username = document.getElementById("username2").innerText;
    formData.append('username', username);
    formData.append('value', "remove");
    axios.post('api-profile.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            updateButton(true);
        }
    });
}

function updateButton(canFollow){
    let button = document.getElementById("followButton");
    if(canFollow){
        button.innerHTML = `<input type="button" name="follow" value="Follow" onclick="insertFollowed()"></input>`;
    } else {
        button.innerHTML = `<input type="button" class="secondary" name="unfollow" value="Unfollow" onclick="removeFollowed()"></input>`;
    }
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

