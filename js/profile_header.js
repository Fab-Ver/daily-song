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
        `;
    let button = "";

    if(!result["isMyProfile"]){
        if(result["canFollow"]){
        button = `
            <form><input type="button" name="follow" value="Follow" onclick="addFollowed(${result["username"]})"></input></form>
            </div>
        `;
        } else {
        button = `
            <form><input type="button" class="secondary" name="unfollow" value="Unfollow" onclick="removeFollowed(${result["username"]})"></input></form>
            </div>
            `;
        }
    }
    profile += button;
    return profile;
}

function addFollowed(user){
    let formData = new FormData();
    formData.append('username', user);
    formData.append('value', "add");
    axios.post('api-profile.php' + data);
}

function removeFollowed(user){
    let formData = new FormData();
    formData.append('username', user);
    formData.append('value', "remove");
    axios.post('api-profile.php' + data);
}

function showGenres(genresArray){
    let result = `<p>Favourite genres: <br>`;
    let genres = "";
    for(let i=0; i < genresArray.length; i++){
        if(i == genresArray.length - 1){
            genres += genresArray[i];
        } else{
            genres += genresArray[i] + ", ";
        } 
    }
    return result + genres + `</p>`;
}

const main = document.querySelector("main");
main.innerHTML = `<div id="header"></div>
                  <div id="content"></div>`;

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const profileHeader = showProfileHeader(response.data);
    console.log(profileHeader);
    const header = document.querySelector('#header');
    const genres = showGenres(response.data["preferredGenres"]);
    console.log(genres);
    header.innerHTML = profileHeader + genres;
});

