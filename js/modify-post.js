window.addEventListener('load', function(){
    createModifyForm();
});

function createModifyForm(){
    let error_div = document.getElementById('error_modify_post');
    let main = document.querySelector('main');
    let formData = new FormData();
    let postID = getPostID();
    formData.append('postID',postID);
    axios.post('modify-post.php',formData).then(response => {
        if(response.data.post !== undefined){
            let post = response.data.post;
            main.innerHTML =  `<article id="modify_post">
                                <hgroup>
                                    <h2>Post #${post['postID']}</h2>
                                    <small>Modify your post</small>
                                </hgroup>
                                <img src="${post['urlImage']}" alt="album_covert_art">
                                <div id="form_body_modify">
                                <div id="error_modify_post"class="error_form" tabindex="-1" hidden></div>
                                <label for="track_genres">
                                        Select track music genres (max 3):
                                        <details id="post_genres" role="list">
                                            <summary aria-haspopup="listbox">Track music genres...</summary>
                                            <ul id="genres_list" role="group" title="List of music genres">
                                                <li><button class="contrast outline" onclick="clearAllGenres()">Clear All</button></li>
                                                <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></li>
                                            </ul>
                                        </details>
                                </label>
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
            axios.get("genre.php?genre=get").then(response => {
                let dropdown = document.getElementById('genres_list');
                if(response.data.length !== undefined){
                    dropdown.innerHTML += createGenres(response.data,false);
                } else {
                    dropdown.innerHTML += `<li>No genres available</li>`
                }
                showPostGenres(post['genres']);
            });
        } else {
            error_div.innerHTML = "An undefined error occurred while trying to process your data, try later.";
            error_div.removeAttribute('hidden');
            error_div.focus();
        }
    });
}

function back(){
    window.location.replace("post_manager.php");
}

function showPostGenres(genres){
    genres.forEach(element => {
        document.getElementById(element['genreID']).checked = true;
    });
}

function getPostID(){
    return window.location.search.replace("?postID=","");
}

function updatePost(){
    let error_div = document.getElementById('error_modify_post');
    if(!checkGenres(0,3)){
        error_div.innerHTML = "Wrong number of selected genresID, please select between 1 and 3 genres";
        error_div.removeAttribute('hidden');
        error_div.focus();
    } else {
        let formData = new FormData();
        let description = document.getElementById('description');
        let activeComments = document.getElementById('comments');
        formData.append('postID',getPostID());
        formData.append('description',description.value);
        formData.append('activeComments',activeComments.checked);
        formData.append('genresID',JSON.stringify(getGenresID()));
        axios.post('modify-post.php',formData).then(response => {
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                error_div.innerHTML = response.data.errorMsg;
                error_div.removeAttribute('hidden');
                error_div.focus();
            } else if (response.data.updated === true){
                window.location.replace('./post_manager.php');
            }
        });
    }
}
