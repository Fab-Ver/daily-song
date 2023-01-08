function showSearchBar(){
    return `
        <form>
            <input type="text" id="searchBar" name="searchBar" placeholder="Search by username" required>
            <button type="submit" onClick="showSearchResult()">Search</button>
        </form>
    `;
}  

function generateSearchResult(searchValue){
    let searchResult = "";
    if(searchValue > 0){
        for (let user of searchValue) {
            let profile = `
                <div>
                    <img src="${user["profilePicture"]}" alt="" width="5%"/>
                    <a href="profile.php?user=${user["username"]}">${user["username"]}</a>
                    ${generateFollowButton(user["canFollow"], user["username"])}
                </div>
            `;
            searchResult += profile;
        }
    } else {
        searchResult = `
            <small>No match found</small>
        `;
    }
    return searchResult;
}

function showSearchResult(){
    let formData = new FormData();
    searchValue = document.getElementById("searchBar").value;
    formData.append('searchValue', searchValue);
    axios.post('api-search.php', formData).then(response => {
        console.log(response.data);
        searchResult = generateSearchResult(response.data["searchResult"]);
        main.innerHTML += searchResult;
    });
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

axios.get('api-search.php').then(response => {
    console.log(response.data);
    const searchBar = showSearchBar();
    main.innerHTML += searchBar;
});

