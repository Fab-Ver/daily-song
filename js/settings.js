
window.addEventListener('load', function(){
    const main = document.querySelector('main');
    main.innerHTML = createFavoriteGenresForm();
    main.innerHTML += createNotificationsForm();
    main.innerHTML += createLogoutDelete(); 
    axios.get("genre.php?genre=get").then(response => {
        let dropdown = document.getElementById('genres_list');
        if(response.data.length !== undefined){
            dropdown.innerHTML += createGenres(response.data);
        } else {
            dropdown.innerHTML += `<li>No genres available</li>`
        }
        showUserSettings();
    });
});

function showUserSettings(){
    axios.get('api-settings.php?settings=get').then(response => {
        if(response.data.settings !== undefined && response.data.favoriteGenres !== undefined){
            let checkboxes = document.querySelectorAll('#notifications_form input[type="checkbox"]');
            response.data.settings.forEach((element,index) => {
                checkboxes[index].checked = element;
            });
            showFavoriteGenres(response.data.favoriteGenres);
        }
    });
}

function createFavoriteGenresForm(){
    let genres_form = `
        <article id ="profile_settings">
            <hgroup>
                <h1>Profile</h1>
                <h2>Change your favorite music genres</h2>
            </hgroup>
            Your favorite genres:
            <ul id="current_favorite_genres"></ul>
            <div id="error_profile" class="error_form" tabindex="-1" hidden></div>
            <label for="favorite_genre">
                Select favorite music genres (max 5):
                <details id="favorite_genre" role="list">
                    <summary aria-haspopup="listbox">Favorite music genres...</summary>
                    <ul id="genres_list" role="listbox" title="List of music genres">
                        <li><button class="contrast outline" onclick="clearAllGenres()">Clear All</button></li>
                        <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></li>
                    </ul>
                </details>
            </label>
            <div><button id="save_profile_button" name="save_profile_settings" onclick="updateFavoriteGenres()">Save</input></div>
        </article>
    `;
    return genres_form;
}

function createNotificationsForm(){
    let notification = `
        <article>
            <hgroup>
                <h1>Notifications</h1>
                <h2>Update your notifications settings</h2>
            </hgroup>
            <div id="error_notification" class="error_form" tabindex="-1" hidden></div>
            <form action="#" method="post" id="notifications_form">
            <label for="post_notification">
                <input type="checkbox" id="post_notification" name="post_notification" role="switch" checked>
                POSTS: Receive notifications when some you follow publish a new post
            </label>
            <label for="comment_notification">
                <input type="checkbox" id="comment_notification" name="comment_notification" role="switch" checked>
                COMMENTS: Receive notifications when someone publish a comment on one of your posts
            </label>
            <label for="follow_notification">
                <input type="checkbox" id="follow_notification" name="follow_notification" role="switch" checked>
                FOLLOWERS: Receive notifications when someone starts to follow you
            </label>
            <label for="account_notification">
                <input type="checkbox" id="account_notification" name="account_notification" role="switch" checked>
                ACCOUNT: Receive notifications when someone access your account
            </label>
            <input type="button" id="deselect_notification" name="deselect_notification" value="Deselect All" onclick="deselectAllNotification()" class="contrast outline"></input>
            <input type="button" id="save_notification_button" name="save_notifications_settings" value="Save" onclick="submitNotificationForm()"></input>
            </form>
        </article>
    `;
    return notification;
}

function createLogoutDelete(){
    let result = `
        <article class="grid">
            <button class="contrast" onclick="logout()">Logout</button>
            <button id="delete_account_button" data-target="delete_account_modal" onclick="toggleModal(event)" class="contrast outline">Delete your account</button>
            <dialog id="delete_account_modal">
                <article>
                    <a href="#" aria-label="Close" class="close" data-target="delete_account_modal" onClick="toggleModal(event)"></a>
                    <h3>Confirm your action</h3>
                    <p>Are you sure you want to permanently delete your account?</p>
                    <footer>
                        <a href="#" role="button" class="secondary" data-target="delete_account_modal" onClick="toggleModal(event)">Cancel</a>
                        <a href="delete_account.php" role="button">Confirm</a>
                    </footer>
                </article>
                </dialog>
        </article>`;
    return result;
}

function submitNotificationForm(){
    let formData = new FormData();
    formData.append('posts',document.getElementById('post_notification').checked);
    formData.append('comments',document.getElementById('comment_notification').checked);
    formData.append('followers',document.getElementById('follow_notification').checked);
    formData.append('account',document.getElementById('account_notification').checked);
    axios.post('api-settings.php',formData).then(response => {
        let error_div = document.getElementById('error_notification');
        if(response.data.errorMsg !== ""){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if (response.data.updated === true){
            error_div.innerHTML = "Your notifications settings have been updated successfully";
            error_div.removeAttribute('hidden');
            error_div.style.setProperty("border-color", "#2e7d32", "important");
            error_div.focus();
        }
    });
}

function updateFavoriteGenres(){
    let error_div = document.getElementById('error_profile');
    if(!checkGenres(0,5)){
        error_div.innerHTML = "Wrong number of selected genresID, please select between 1 and 5 genres";
        error_div.removeAttribute('hidden');
        error_div.focus();
    } else {
        let formData = new FormData();
        formData.append('favoriteGenres',JSON.stringify(getGenresID()));
        axios.post('api-settings.php',formData).then(response => {
            if(response.data.errorMsg !== ""){
                error_div.innerHTML = response.data.errorMsg;
                error_div.removeAttribute('hidden');
                error_div.focus();
            } else if (response.data.updated === true){
                error_div.innerHTML = "Favorite genres have been updated successfully";
                error_div.removeAttribute('hidden');
                error_div.style.setProperty("border-color", "#2e7d32", "important");
                error_div.focus();
                showUserSettings();
            }
        });
    }
}

function deselectAllNotification(){
    document.querySelectorAll('#notifications_form input[type="checkbox"]').forEach(element => element.checked = false);
}

function logout(){
    window.location.replace("logout.php");
}

function clearAllGenres(){
    let checkboxes = document.querySelectorAll('#genres_list input[type="checkbox"]');
    let search = document.getElementById('search');
    search.value = '';
    filterGenre();
    checkboxes.forEach(element => element.checked = false);
}

function showFavoriteGenres(genres){
    let genres_list = document.getElementById('current_favorite_genres');
    genres_list.innerHTML = '';
    genres.forEach(element => {
        let tag = `<li>${element['tag']}</li>`;
        genres_list.innerHTML += tag;
        document.getElementById(element['genreID']).checked = true;
    });
}

