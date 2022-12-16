const main = document.querySelector("main");
main.classList.add("container");
main.innerHTML = createNewPostForm();

function createNewPostForm(){
    let form = `
    <article class="grid">
        <div>
        <hgroup>
            <h1>New Post</h1>
            <h2>Enter Spotify track URL to generate post info</h2>
        </hgroup>
        <form action="#" method="post" id="new_post_form">
            <label for="url_track">
                Spotify URL:
                <input type="url" id="url_track" name="url_track" placeholder="Spotify URL..." required></input>
            </label>
            <label for="description">
                Post description:
                <textarea id="description" name="description" placeHolder="Insert here post description..."></textarea>
            </label>
            <label for="comments">
                <input type="checkbox" id="comments" name="comments" role="switch" checked>
                Allow comments
            </label>
            <input type="button" name="login" value="Publish"></input>
        </form>
        </div>
    </article>
    `;
    return form;
}