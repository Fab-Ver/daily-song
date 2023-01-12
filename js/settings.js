
window.addEventListener('load', function(){
    const main = document.querySelector('main');
    main.innerHTML = createAccountForm();
    main.innerHTML += createProfileForm();
    main.innerHTML += createNotificationsForm();
    main.innerHTML += createLogoutDelete(); 
    axios.get("genre.php?genre=get").then(response => {
        let dropdown = document.getElementById('genres_list');
        if(response.data.length !== undefined){
            dropdown.innerHTML += createGenres(response.data,false);
        } else {
            dropdown.innerHTML += `<li>No genres available</li>`
        }
        showUserSettings();
    });
});

function showUserSettings(){
    axios.get('api-settings.php?settings=get').then(response => {
        if(response.data.settings !== undefined && response.data.favoriteGenres !== undefined && response.data.accountData !== undefined){
            let checkboxes = document.querySelectorAll('#notifications_form input[type="checkbox"]');
            response.data.settings.forEach((element,index) => {
                checkboxes[index].checked = element;
            });
            showFavoriteGenres(response.data.favoriteGenres);
            showAccountData(response.data.accountData);
        }
    });
}

function createProfileForm(){
    let genres_form = `
        <article id ="profile_settings">
            <hgroup>
                <h2>Profile</h2>
                <small>Change your favorite music genres, manage your posts</small>
            </hgroup>
            Your favorite genres:
            <ul id="current_favorite_genres"></ul>
            <div id="error_profile" class="error_form" tabindex="-1" hidden></div>
            <label for="favorite_genre">
                Select favorite music genres (max 5):
                <details id="favorite_genre" role="list">
                    <summary aria-haspopup="listbox">Favorite music genres...</summary>
                    <ul id="genres_list" role="group" title="List of music genres">
                        <li><button class="contrast outline" onclick="clearAllGenres()">Clear All</button></li>
                        <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></input></li>
                    </ul>
                </details>
            </label>
            <div><button id="save_profile_button" name="save_profile_settings" onclick="updateFavoriteGenres()">Save</input></div>
            <a href="post_manager.php" role="button" class="contrast outline">Post Manager</a>
        </article>
    `;
    return genres_form;
}

function createNotificationsForm(){
    let notification = `
        <article>
            <hgroup>
                <h2>Notifications</h2>
                <small>Update your notifications settings</small>
            </hgroup>
            <div id="error_notification" class="error_form" tabindex="-1" hidden></div>
            <form action="#" method="post" id="notifications_form">
            <label for="post_notification">
                <input type="checkbox" id="post_notification" name="post_notification" role="switch" checked></input>
                POSTS: Receive notifications when some you follow publish a new post
            </label>
            <label for="comment_notification">
                <input type="checkbox" id="comment_notification" name="comment_notification" role="switch" checked></input>
                COMMENTS: Receive notifications when someone publish a comment on one of your posts
            </label>
            <label for="follow_notification">
                <input type="checkbox" id="follow_notification" name="follow_notification" role="switch" checked></input>
                FOLLOWERS: Receive notifications when someone starts to follow you
            </label>
            <label for="account_notification">
                <input type="checkbox" id="account_notification" name="account_notification" role="switch" checked></input>
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

function createAccountForm(){
    let result = `
        <article>
            <hgroup>
                <h2>Account</h2>
                <small>Update your personal data</small>
            </hgroup>
            <div id="error_account_settings"class="error_form" tabindex="-1" hidden></div>
            <form action="#" method="post" id="account_form">
                <label for="username">
                    Username:
                    <input type="text" id="username" name="username" placeholder="Username..." onblur="checkSettingsUsername()" required></input>
                </label>
                <div class="grid">
                    <div><label for="first_name">
                        First Name:
                        <input type ="text" id="first_name" name="first_name" placeholder="First name..." oninput="checkFirstName()" required></input>
                    </label> </div>
                    <div><label for="last_name">
                        Last Name:
                        <input type ="text" id="last_name" name="last_name" placeholder="Last name..." oninput="checkLastName()" required></input>
                    </label></div>
                </div>
                <label for="telephone">
                    Telephone:
                    <input type ="tel" id="telephone" name="telephone" placeholder="Telephone..." oninput="checkTelephone()"></input>
                </label>
                <img src="" alt="profile_picture" id="current_profile_picture">
                <label for="profile_picture">Select profile picture:
                    <input type="file" id="profile_picture" name="profile_picture" accept="image/*" onchange="checkImage()">
                </label>
                <input type="button" id="account_settings_button" name="account_settings_button" value="Save" onclick="updateAccountSettings()"></input>
            </form>
            <p>Do you want to reset your password? <a href="reset_password.php">Click Here</a></p>
        </article>
    `;
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
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
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
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
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

function showFavoriteGenres(genres){
    let genres_list = document.getElementById('current_favorite_genres');
    genres_list.innerHTML = '';
    genres.forEach(element => {
        let tag = `<li>${element['tag']}</li>`;
        genres_list.innerHTML += tag;
        document.getElementById(element['genreID']).checked = true;
    });
}

function showAccountData(accountData){
    document.getElementById('username').value = accountData['username'];
    document.getElementById('first_name').value = accountData['firstName'];
    document.getElementById('last_name').value = accountData['lastName'];
    document.getElementById('telephone').value = accountData['telephone'];
    document.getElementById('current_profile_picture').src = accountData['profilePicture']
}

function updateAccountSettings(){
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let telephone = document.getElementById('telephone');
    let username = document.getElementById('username');
    let profile_picture = document.getElementById('profile_picture');
    let errors = new Array();
    let err_element = new Array();

    if(first_name.validity.valueMissing){
        errors.push("First name required, enter first name to continue");
        err_element.push(first_name);
    }

    if(last_name.validity.valueMissing){
        errors.push("Last name required, enter last name to continue");
        err_element.push(last_name);
    }

    if(telephone.getAttribute('aria-invalid') === 'true'){
        errors.push("Wrong telephone number format, +XX XXX XXXXXXX expected");
        err_element.push(telephone);
    }

    if(username.validity.valueMissing || username.getAttribute('aria-invalid') === 'true'){
        errors.push("Username required, enter a valid username to continue");
        err_element.push(username);
    }

    if(profile_picture.getAttribute('aria-invalid') === 'true'){
        errors.push("Wrong file extension, accepted: .jpg .jpeg .png .gif");
        err_element.push(profile_picture);
    }

    let error_div = document.getElementById('error_account_settings');
    if(errors.length == 0){
        let formData = new FormData();
        formData.append('first_name',first_name.value);
        formData.append('last_name',last_name.value);
        formData.append('telephone',telephone.value);
        formData.append('username',username.value);
        if(profile_picture.value !== ''){
            formData.append('profile_picture',profile_picture.files[0]);
        }
        axios.post('api-settings.php',formData).then(response => {
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                error_div.innerHTML = response.data.errorMsg;
                error_div.removeAttribute('hidden');
                error_div.focus();
                if(response.data.errorElem !== undefined){
                    response.data.errorElem.forEach(element => setValid(document.getElementById(element),false));
                }
            }  else if(response.data.updated === true) {
                error_div.innerHTML = "Account data have been updated successfully";
                error_div.removeAttribute('hidden');
                error_div.style.setProperty("border-color", "#2e7d32", "important");
                error_div.focus();
                showUserSettings();
            }
        });
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        error_div.innerHTML = `While processing your data the following errors occurred:<ul>` + createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}

function checkSettingsUsername(){
    let username = document.getElementById('username');
    if(!username.validity.valueMissing){
        let formData = new FormData();
        formData.append('checkUsername',username.value);
        axios.post('api-settings.php',formData).then(response => {
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                showError(username,response.data.errorMsg);
                setValid(username,false);
            } else if(response.data.valid === true) {
                setValid(username,true);
            }
        });
    } else {
        username.removeAttribute("aria-invalid");
    } 
}

