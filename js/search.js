let users;

function generateSearchBar(){
    return `
        <input type="search" id="searchBar" name="searchBar" placeholder="Search by username" oninput="filterProfile()">
        <ul id="profileList"></ul>
    `;
}  

function filterProfile(){
    axios.get('api-search.php?searchValue=' + searchBar.value).then(response => {
        const list = document.getElementById('profileList');
        const searchResult = generateSearchResult(response.data);
        list.innerHTML = searchResult;
    });

}

function generateSearchResult(searchValue){
    let searchResult = '';
    if(searchValue.length > 0){
        for (let user of searchValue) {
            let profile = `
                <li class="profileList" role="listitem">
                        <img class="followerImage" src="${user["profilePicture"]}" alt="" width="5%"/>
                        <a href="profile.php?user=${user["username"]}">${user["username"]}</a>
                </li>
            `;
            searchResult += profile;
        }
    } else {
        searchResult += `
            <small>No match found</small>
        `;
    }
    return searchResult;
}  

function generateFollowButton(canFollow) {
    if (canFollow) {
        return `<button id="followButton" class="followButton" name="follow" onclick="updateFollowed(true, ${profileUser})">Follow</button>`;
    } else {
        return `<button id="followButton" class="secondary followButton" name="unfollow" onclick="updateFollowed(false, ${profileUser})">Unfollow</button>`;
    }
}

function updateFollowed(wantToFollow, profileUser){
    let formData = new FormData();
    formData.append('username', profileUser);
    formData.append('value', wantToFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        console.log(response.data);
        if(response.data["followButton"]){
            document.getElementById("followButton").outerHTML = generateFollowButton(!wantToFollow);
        }
    });
}

const main = document.querySelector('main');
main.innerHTML = generateSearchBar();
filterProfile();
