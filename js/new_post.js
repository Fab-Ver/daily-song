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

const getToken = () => {
    let client_id = config.ClientID;
    let client_secret = config.ClientSecret;
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        data: {
          grant_type: 'client_credentials'
        },
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: client_id,
          password: client_secret
        }
    }).then((response) => {
          return response.data.access_token;
    });
 };

function submitNewPostForm(){
    let formData = new FormData();
    console.log(description.value);
    console.log(url_box.value);
    console.log(comments.checked);
    console.log(getGenresID());
    let track_id = url_box.value.match(regex)[2];
    console.log(track_id);
    let request_url = 'https://api.spotify.com/v1/tracks/' + track_id;
    console.log(request_url);
    getToken().then(token => {
        const config = {
            method: 'get',
            url: request_url,
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        };

        axios(config).then(response => {
            console.log(response.data.name);
            console.log(response.data.preview_url);
        });
    });
}