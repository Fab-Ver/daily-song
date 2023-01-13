let users;
/**
 * Create the search bar.
 * @returns searchbar
 */
function generateSearchBar(){
    return `
        <input type="search" id="searchBar" name="searchBar" placeholder="Search by username" oninput="filterProfile()">
        <ul id="profileList"></ul>
    `;
}  

/**
 * Send a get request with the searchBar value to filter user's profiles and generate the searchResult list.
 */
function filterProfile(){
    axios.get('api-search.php?searchValue=' + searchBar.value).then(response => {
        const list = document.getElementById('profileList');
        const searchResult = generateSearchResult(response.data);
        list.innerHTML = searchResult;
    });

}

/**
 * Create the list of user's profile that matched the searchBar value.
 * @returns li to put inside the ul if there is users matching the searchValue
 * small if there is non match found
 */
function generateSearchResult(searchValue){
    let searchResult = '';
    if(searchValue.length > 0){
        for (let user of searchValue) {
            let profile = `
                <li class="profileList" role="listitem">
                        <img class="followedImage" src="${user["profilePicture"]}" alt="" width="5%"/>
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

const main = document.querySelector('main');
main.innerHTML = generateSearchBar();
filterProfile();
