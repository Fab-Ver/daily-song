const main = document.querySelector("main");
/*Const after many post show a go top button */
const $afterPostGoTopButton = 3;

/**
 * Create selector for geners and date. Add go top button
 */
main.innerHTML = `
<details id="track_genres" role="list">
    <summary aria-haspopup="listbox">Select music genres</summary>
    <ul id="genres_list" role="group" title="genres list">
        <li>
            <div class="grid">
                <input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></input>
                <button id="button_clear" onclick="clearGenres()">clear all</button>
            <div>
        </li>
    </ul>
</details>

<input type="date" id="date" name="date" onchange="selectDate()"></input>
<div id="div_posts"></div>
<div id="button_top">
    <button class="go_top" onclick="goTop()">Go top</button>
</div>
`;

function goTop(){
    document.querySelector(".main-div").scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/**
 * Fill div_posts with list of required posts
 */
function addPost(post) {
    let article1 = `
    <article id="article${post["postID"]}" class="post_body">
        <section class="profile_post">
            <a href="profile.php?user=${post["username"]}">
                <img src="${post["profilePicture"]}" alt="profile_image" width="10%" height="10%">
                <label>${post["username"]}</label>
            </a>
            <div class="time_ago">
                <label>${post["time_ago"]}</label>
            </div>
        </section>
        <div class="grid">
            <div class="grid">
                <div class="song_image">
                    <img src="${post["track"]["urlImage"]}" alt="song_image">
                </div>
                <a href="${post["track"]["urlSpotify"]}">Song Link</a>
            </div>
            <section class="post_text">
                <hgroup class="song">
                    <h2>${post["track"]["title"]}</h2>
                    <small>Author: ${post["track"]["artists"]} - Album: ${post["track"]["albumName"]} - Genres: ${post["genre"]}</small>
                </hgroup>
                <section class="grid">
    `;

    let songPreview = "";
    if(post["track"]["urlPreview"] !== "null"){
        songPreview =  ` 
            <figure>
                <audio controls src="${post["track"]["urlPreview"]}">
            </figure>
        `;
    }

    let likes = `<div>` + showLikes(post["postID"], post["numLike"], post["numDislike"], post["isMyReaction"], post["myReaction"]) + `</div>`;

    let article2 = `
                </section>
                <p class="description">${post["description"]}</p>
            </section>
        </div>
        <div id="div_comment${post["postID"]}"></div>
    </article>
    `;
    return article1 + songPreview + likes + article2;
}

function genreList(genres){
    let genre = Array();
    for(let j of genres){
        genre.push(j["tag"]);
    }
    return genre.toString();
}

/**
 * Check how div_posts should be rendered
 */
function listPost(data){
    let div_post = document.getElementById("div_posts");
    div_post.innerHTML = ``;

    if(data.no_post !== undefined){
        div_post.innerHTML = `
            <article class="post_body">
                ${data.no_post}
            </article>
        `;
    }else{
        let posts = data;
        if(posts.length > $afterPostGoTopButton){
            document.querySelector(".go_top").style.display = "block";
        }
        for(let i=0; i<posts.length; i++){
            posts[i]["genre"] = genreList(posts[i]["genre"]);
            div_post.innerHTML += addPost(posts[i]);
            let div_comment = document.getElementById("div_comment" + posts[i]["postID"]);
            div_comment.innerHTML += getComment(posts[i]);
        }
    }
}

/**
 * Get today's posts
 */
axios.get('api-home.php').then(response => {
    listPost(response.data);
});

/**
 * Selector for date
 */
function selectDate() {
    let formData = new FormData();
    let day = '';
    if(date.valueAsDate !== null){
        day = date.valueAsDate.toISOString().slice(0,10);
    } else {
        day = new Date().toJSON().slice(0, 10);
    }
    formData.append("day",day);
    axios.post("api-home.php",formData).then(response => {
        listPost(response.data);
    });
}

/**
 * Selector for geners
 */
function getGenre(){
    let formData = new FormData();
    let genresID = getGenresID();
    if(genresID.length !== 0){
        formData.append("idGenres",JSON.stringify(genresID));
        axios.post("api-home.php",formData).then(response => {
            listPost(response.data);
        });
    } else {
        clearGenres();
    }
    
}

axios.get("genre.php").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data,true);
});

function clearGenres() {
    document.querySelectorAll('#genres_list input[type="checkbox"]').forEach(element =>{
        element.checked = false;
    });

    axios.get('api-home.php').then(response => {
        listPost(response.data);
    });
    document.getElementById("track_genres").open = false;
}

