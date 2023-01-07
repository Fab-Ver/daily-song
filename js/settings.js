
const main = document.querySelector('main');
main.innerHTML = createNotificationsForm();
main.innerHTML += createLogoutDelete();
axios.get('api-settings.php?settings=get').then(response => {
    if(response.data.settings){
        let checkboxes = document.querySelectorAll('#notifications_form input[type="checkbox"]');
        response.data.settings.forEach((element,index) => {
            checkboxes[index].checked = element;
        });
    }
});

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

function deselectAllNotification(){
    document.querySelectorAll('#notifications_form input[type="checkbox"]').forEach(element => element.checked = false);
}

function createLogoutDelete(){
    let result = `
        <article class="grid">
            <a href="./logout.php" role="button" class="contrast">Logout</a>
        </article>`;
    return result;
}