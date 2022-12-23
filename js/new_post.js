const regex = /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(track)(?::|\/)((?:[0-9a-zA-Z]){22})/;
const main = document.querySelector("main");
main.classList.add("container");
main.innerHTML = createNewPostForm();
const url_box = document.getElementById('url_track');
const description = document.getElementById('description');
const comments = document.getElementById('comments');
axios.get("genre.php").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data);
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
                        <details id="track_genres" role="list">
                            <summary aria-haspopup="listbox">Track music genres...</summary>
                            <ul id="genres_list" role="listbox">
                                <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></li>
                            </ul>
                        </details>
            </label>
            <label for="description">
                Post description:
                <textarea id="description" name="description" placeHolder="Insert here post description..."></textarea>
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
            //console.log(match[1]);
            //console.log(match[2]);
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
        errors.push("Invalid or missing Spotify URL.");
        err_element.push(url_box);
    }

    if(!checkGenres(0,3)){
        errors.push("Wrong number of track genres, too low or too high");
    }

    if(errors.length == 0){
        submitNewPostForm();
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        let error_div = document.querySelector("div.error_form");
        error_div.innerHTML = `While trying to add a new post the following errors occurred:<ul>` + createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}

function submitNewPostForm(){
    let formID = new FormData();
    let track_id = url_box.value.match(regex)[2];
    formID.append('checkTrackID',track_id);
    
    axios.post('api-track.php',formID).then(response => {
        if(!response.data.checkTrackID){
            retrieveData(track_id).then(track_data => {
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
                axios.post('api-track.php',formNewTrack) //Aggiungere una gestione dell'errore se la traccia non è giusta ??
            })
        }
    })

    
}