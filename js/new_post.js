const regex = /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(track)(?::|\/)((?:[0-9a-zA-Z]){22})/;
const main = document.querySelector('main');
main.innerHTML = createNewPostForm();
const url_box = document.getElementById('url_track');
const description = document.getElementById('description');
const comments = document.getElementById('comments');
axios.get('genre.php').then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data,false);
});

function createNewPostForm(){
    let form = `
    <article class="grid">
        <div>
        <hgroup>
            <h1>New Post</h1>
            <h2>Enter Spotify track URL to generate post info</h2>
        </hgroup>
        <div class="error_form" tabindex="-1" hidden></div>
        <form action="#" method="post" id="new_post_form">
            <label for="url_track">
                Spotify URL:
                <input type="url" id="url_track" name="url_track" placeholder="Spotify URL..." onblur="checkURL()" required></input>
            </label>
            <label for="track_genres">
                        Select track music genres (max 3):
                        <details id="post_genres" role="list">
                            <summary aria-haspopup="listbox">Track music genres...</summary>
                            <ul id="genres_list" role="listbox">
                                <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></li>
                            </ul>
                        </details>
            </label>
            <label for="description">
                Post description:
                <textarea id="description" name="description" placeHolder="Insert here post description..." maxlength="500"></textarea>
            </label>
            <label for="comments">
                <input type="checkbox" id="comments" name="comments" role="switch" checked>
                Allow comments
            </label>
            <input type="button" name="publish" value="Publish" onclick="checkNewPostForm()"></input>
        </form>
        </div>
    </article>
    `;
    return form;
}

function checkURL(){
    if(!url_box.validity.valueMissing){
        let url = url_box.value;
        let match = url.match(regex);
        if(match){
            setValid(url_box,true);
        } else {
            showError(url_box,"Wrong URL format, expected:\n - https:\/\/play.spotify.com\/track\/id\n - https:\/\/open.spotify.com\/track\/id\n - spotify:track:id");
            setValid(url_box,false);
        }
    } else {
        url_box.removeAttribute("aria-invalid");
    }
}

function checkNewPostForm(){
    let errors = new Array();
    let err_element = new Array();

    if(url_box.validity.valueMissing || url_box.getAttribute('aria-invalid') === 'true'){
        errors.push("Spotify track URL required, enter a valid URL to continue");
        err_element.push(url_box);
    }

    if(!checkGenres(0,3)){
        errors.push("Wrong number of selected genresID, please select between 1 and 3 genres");
    }

    if(errors.length == 0){
        submitNewPostForm();
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        let error_div = document.querySelector("div.error_form");
        error_div.innerHTML = `While processing your data the following errors occurred:<ul>` + createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}

function submitNewPostForm(){
    let formID = new FormData();
    let track_id = url_box.value.match(regex)[2];
    formID.append('checkTrackID',track_id);
    axios.post('api-track.php',formID).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if(response.data.checkTrackID === false){
                retrieveData(track_id).then(track_data => {
                    if(track_data.error_string !== undefined){
                        error_div.innerHTML = 'SPOTIFY: ' + track_data.error_string.toUpperCase() + ', try later.';
                        error_div.removeAttribute('hidden');
                        error_div.focus();
                    } else {
                        let formNewTrack = new FormData();
                        let artists = track_data.artists;
                        let artists_names = new Array();
                        artists.forEach(a => {
                         artists_names.push(a.name);
                        });
                        formNewTrack.append('trackID', track_id);
                        formNewTrack.append('urlSpotify',track_data.external_urls.spotify);
                        formNewTrack.append('urlImage', track_data.album.images[1].url);
                        formNewTrack.append('urlPreview',track_data.preview_url);
                        formNewTrack.append('title',track_data.name);
                        formNewTrack.append('artist',artists_names.toString());
                        formNewTrack.append('albumName',track_data.album.name);
                        axios.post('api-track.php',formNewTrack).then(new_track_response => {
                            if(new_track_response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                                error_div.innerHTML = new_track_response.data.errorMsg;
                                error_div.removeAttribute('hidden');
                                error_div.focus();
                            } else if(new_track_response.data.insertTrack === true){
                                createPost(track_id);
                            }
                        });
                    }
                });
        } else if(response.data.checkTrackID === true){
                createPost(track_id);
        }
    });
}

function createPost(track_id){
    let formPost = new FormData();
    formPost.append('description',description.value);
    formPost.append('activeComments',comments.checked.toString());
    formPost.append('trackID',track_id);
    formPost.append('genresID',JSON.stringify(getGenresID()));
    axios.post('api-new-post.php',formPost).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if(response.data.postInserted === true){
            window.location.replace("homepage.php");
        }
    });
}