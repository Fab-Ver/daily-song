const main = document.querySelector("main");
main.innerHTML = `
<details id="track_genres" role="list">
    <summary aria-haspopup="listbox">Select music genres</summary>
    <ul id="genres_list" role="listbox">
        <li>
            <div class="grid">
                <input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()">
                <button id="button_clear" onclick="clearGenres()">clear all</button>
            <div>
        </li>
    </ul>
</details>
<input type="date" id="date" name="date" onchange="selectDate()">
<div id="div_posts"></div>
`;

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
                    <h3><p>Author: ${post["track"]["artists"]} - Album: ${post["track"]["albumName"]} - Genres: ${post["genre"]}</p></h3>
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
        <div class="div_comment"></div>
    </article>
    `;
    return article1 + songPreview + likes + article2;
}

function addComment(comment) {
    let li_comment = `
    <li>
        <div class="grid">
            <img src="${comment["profilePicture"]}" alt="profile_picture">
            <section class="comment_text">
                <label for="username" class="username">${comment["username"]}</label>
                <label for="time_comment" class="time_comment">${comment["dateTime"]}</label>
                <p>${comment["text"]}</p>
            </section>
        </div>
    </li>
    `;
    return li_comment;
}

function publishComment(idButton){
    let id = idButton.replace("button", "");
    let text_comment = document.getElementById("textarea" + id);
    let form_data = new FormData();
    form_data.append("comment", text_comment.value);
    form_data.append("post_id", id);
    if(text_comment.value !== ""){
        axios.post("api-home.php",form_data).then(response => {
            text_comment.value = "";
            li_comment = document.getElementById("article"+[id]).querySelector(".list_comment");
            li_comment.innerHTML = ``;
            for(let j=0; j<response.data["comments"].length; j++){
                li_comment.innerHTML += addComment(response.data["comments"][j]);
            }
        });
    }
}

function genreList(geners){
    let genre = Array();
    for(let j of geners){
        genre.push(j["tag"]);
    }
    return genre.toString();
}

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
        let posts = data.reverse();
        for(let i=0; i<posts.length; i++){
            posts[i]["genre"] = genreList(posts[i]["genre"]);
            div_post.innerHTML += addPost(posts[i]);
            if(posts[i]["activeComments"] === 1){
                let div_comment = document.getElementById("article"+posts[i]["postID"]).querySelector(".div_comment");
                div_comment.innerHTML = `
                    <section class="comments">
                        <textarea id="textarea${posts[i]["postID"]}" name="comment" placeholder="Add comment"></textarea>
                        <button id="button${posts[i]["postID"]}" onclick=publishComment(this.id)>Publish</button>
                    </section>
                    <details class="show_comments">
                        <summary aria-haspopup="listbox">Show all comments</summary>
                        <ul role="listbox" class="list_comment"></ul>
                    </details>`;
                li_comment = document.getElementById("article"+posts[i]["postID"]).querySelector(".list_comment");
                for(let j=0; j<posts[i]["comments"].length; j++){
                    li_comment.innerHTML += addComment(posts[i]["comments"][j]);
                }
            }
        }
    }
}

let li_comment;

axios.get('api-home.php').then(response => {
    console.log(response.data);
    listPost(response.data);
});

function selectDate() {
    let formData = new FormData();
    let day = date.valueAsDate.toISOString().slice(0,10);
    formData.append("day",day);
    axios.post("api-home.php",formData).then(response => {
        listPost(response.data);
        console.log(response.data);
    });
}


axios.get("genre.php").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data);
});

//let genreSelect = new Array();

function clearGenres() {
    /*genreSelect.forEach(element => {
        document.getElementById(element).checked = false;
    });
    genreSelect = Array();
    axios.get('api-home.php').then(response => {
        listPost(response.data);
    });*/
}

function getGenre(idGenre){
    /*if(genreSelect.includes(idGenre)){
        for(let i = 0; i < genreSelect.length; i++){
            if(genreSelect[i] === idGenre){
                genreSelect.splice(i, 1);
            }
        }
    }else{
        genreSelect.push(idGenre);
    }
    console.log(genreSelect);
    //se gli passo piu generi database chiede più and ma tutti distinti
    */
    let formData = new FormData();
    formData.append("idGenre",idGenre);
    /*for(let i=0; i<genreSelect.length; i++){
        formData.append(i,genreSelect[i]);
    }*/
    axios.post("api-home.php",formData).then(response => {
        listPost(response.data);
        console.log(response.data);
    });
    document.getElementById(idGenre).checked = false;
}
