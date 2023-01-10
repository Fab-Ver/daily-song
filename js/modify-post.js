window.addEventListener('load', function(){
    let main = document.querySelector('main');
    createModifyForm(this.location.search).then(response => main.innerHTML = response);
});

function createModifyForm(variable){
    let formData = new FormData();
    let postID = variable.replace("?postID=","");
    formData.append('postID',postID);
    return axios.post('modify-post.php',formData).then(response => {
        let post = response.data.post[0];
        console.log(post);
        let modify_form = `<article id="modify_post">
                                <hgroup>
                                    <h1>Post #${post['postID']}</h1>
                                    <h2>Modify your post</h2>
                                </hgroup>
                                <img src="${post['urlImage']}" alt="album_covert_art">
                                <div id="form_body_modify">
                                <div id="error_modify_post"class="error_form" tabindex="-1" hidden></div>
                                <form action="#" method="post" id="modify_post_form">
                                    <label for="title">
                                        Title:
                                        <input type="text" id="title" name="title" value="${post['title']}" readonly disabled></input>
                                    </label>
                                    <label for="artists">
                                        Artist:
                                        <input type="text" id="artists" name="artists" value="${post['artists']}" readonly disabled></input>
                                    </label>
                                    <label for="album">
                                        Album:
                                        <input type="text" id="album" name="album" value="${post['albumName']}" readonly disabled></input>
                                    </label>
                                    <label for="url">
                                        URL Spotify:
                                        <input type="url" id="url" name="url" value="${post['urlSpotify']}" readonly disabled></input>
                                    </label>
                                    <label for="datePost">
                                        Created:
                                        <input type="text" id="datePost" name="datePost" value="${post['date']}" readonly disabled></input>
                                    </label>
                                    <label for="datePost">
                                        Created:
                                        <input type="text" id="datePost" name="datePost" value="${post['date']}" readonly disabled></input>
                                    </label>
                                    <label for="description">
                                        Description:
                                        <textarea id="description" name="description" placeHolder="Insert here post description..." maxlength="500">${post['description']}</textarea>
                                    </label>
                                    <label for="comments">
                                        <input type="checkbox" id="comments" name="comments" role="switch" ${post['activeComments'] === 1 ? 'checked' : ''}>
                                         Allow comments
                                    </label>
                                    <input type="button" class="contrast outline" id="cancel" name="cancel" value="Cancel" onclick="back()"></input>
                                    <input type="button" class="outline" id="modify_post_button" name="modify_post_button" value="Save" onclick="updatePost()"></input>
                                </form>
                                </div>
                            </article>`;
        return modify_form;
    });
}

function back(){
    window.location.replace("post_manager.php");
}