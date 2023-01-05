function addPost(post) {
    let article1 = `
    <article id="article${post["postID"]}" class="post_body">
        <section class="profile_post">
            <a href="profile.php?user=${post["username"]}">
                <img src="${post["profilePicture"]}" alt="profile_image" width="10%" height="10%">
                <label>${post["username"]}</label>
            </a>
            <label class="time_ago">${post["time_ago"]}</label>
        </section>
        <div class="grid">
            <img src="${post["track"]["urlImage"]}" alt="song_image">
            <section class="post_text">
                <hgroup class="song">
                    <h2>${post["track"]["title"]}</h2>
                    <h3><p>Author: ${post["track"]["artists"]} - Album: ${post["track"]["albumName"]} - Genres: ${post["genre"]}</p></h3>
                </hgroup>
                <section>
                    <a href="${post["track"]["urlSpotify"]}">Song Link</a>
    `;

    let likes = showLikes(post["postID"], post["numLike"], post["numDislike"]);

    let songPreview = "";
    if(post["urlPreview"] !== "null"){
        songPreview =  ` 
            <figure>
                <audio controls src="${post["track"]["urlPreview"]}">
            </figure>
        `;
    }

    let article2 = `</section>
                <p class="description">${post["description"]}</p>
            </section>
        </div>
        <section class="comments">
            <textarea id="textarea${post["postID"]}" name="comment" placeholder="Add comment"></textarea>
            <button id="button${post["postID"]}" onclick=publishComment(this.id)>Publish</button>
        </section>
        <details class="show_comments">
            <summary aria-haspopup="listbox">Show all comments</summary>
            <ul role="listbox" class="list_comment"></ul>
        </details>
    </article>
    `;
    return article1 + likes + songPreview + article2;
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
        console.log("fabio");
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

const main = document.querySelector("main");
let li_comment;

axios.get('api-home.php').then(response => {
    console.log(response.data);
    const posts = response.data;
    for(let i=0; i<posts.length; i++){
        posts[i]["genre"] = genreList(posts[i]["genre"]);
        main.innerHTML += addPost(posts[i]);
        li_comment = document.getElementById("article"+posts[i]["postID"]).querySelector(".list_comment");
        for(let j=0; j<posts[i]["comments"].length; j++){
            li_comment.innerHTML += addComment(posts[i]["comments"][j]);
        }
    }
});