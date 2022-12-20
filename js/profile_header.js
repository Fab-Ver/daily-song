function showProfileHeader(result){
    let profile = `
        <div class="grid">
            <img src="${result["profilePicture"]}" alt="" width="50%"/>
            <div class="center-text">
                <div>@${result["username"]}</div>
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
        </div>
        `;
    return profile;
}

function follow(){
    let result = "";

    if(!result["isMyProfile"]){
        if(result["canFollow"]){
        let post = `
            <form><input type="button" class="outline" name="follow" value="Follow" onclick="addFollower()"></input></form>
        `;
        } else {
        let post = `
            <form><input type="button" class="secondary outline" name="unfollow" value="Unfollow" onclick="removeFollower()"></input></form>
         `;
        }
    }
    return result;
}

function addFollower(){

}

function removeFollower(){

}

const main = document.querySelector("main");
main.innerHTML = `<div id="header"></div>
                  <div id="content"></div>`;

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const followButton = follow();
    console.log(follow);
    document.querySelector('#header').innerHTML = showProfileHeader(response.data) + followButton;
});

