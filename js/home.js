const main = document.querySelector("main");
let li_comment;
for(let i=0; i<3; i++){
    main.innerHTML += addPost();
    li_comment = document.querySelectorAll(".post_body")[i].querySelector(".list_comment");
    console.log(li_comment);
    for(let j=0; j<3; j++){
        li_comment.innerHTML += addComment();
    }
}

/*
<section class="post_section">
    <button class="button_prev">p</button>
    <article class="current_post"></article>
    <button class="button_next">d</button>
</section>

let i=3;

console.log(document.querySelector("button")[0]);
document.querySelectorAll("button")[0].addEventListener("click", function(){
    console.log("button_prev");
    document.querySelectorAll(".grid div")[i].className = "";
    i=i-1;
    document.querySelectorAll(".grid div")[i].className = "current_post";
});

document.querySelectorAll("button")[1].addEventListener("click", function(){
    console.log("button_next");
    document.querySelectorAll(".grid div")[i].className = "";
    i=i+1;
    document.querySelectorAll(".grid div")[i].className = "current_post";
});
*/

function addPost() {
    let article = `
    <article class="post_body">
        <section class="profile_post">
            <button>
                <img src="./res/default.PNG" alt="profile_image" width="10%" height="10%">
                <label>nome utente</label>
            </button>
            <label class="time_ago">3h ago </label>
        </section>
        <div class="grid">
            <img src="./res/post4.jpg" alt="profile icon">
            <section class="post_text">
                <hgroup class="song">
                    <h2>Song Title</h2>
                    <h3><p>Author: ____ - Album: ____ - Genres: ___</p></h3>
                </hgroup>
                <section>
                    <a href="#">Song Link</a>
                    <div class="grid">
                        <img src="./upload/like.svg" alt="like" class="like"><label>5</label>
                        <img src="./upload/like.svg" alt="dislike" class="dislike"><label>5</label>
                    </div>
                </section>
                <p class="description">Descrption: </p>
            </section>
        </div>
        <section class="comments">
            <textarea id="comment" name="comment" placeholder="Add comment"></textarea>
            <button>Publish</button>
            <p>when clik publich show current comment</p>
        </section>
        <details class="show_comments">
            <summary aria-haspopup="listbox">Show all comments</summary>
            <ul role="listbox" class="list_comment"></ul>
        </details>
    </article>
    `;
    return article;
}

function addComment() {
    let li_comment = `
    <li>
        <div class="grid">
            <img src="./upload/home.png" alt="profile_picture">
            <section class="comment_text">
                <label for="username" class="username">username</label>
                <label for="time_comment" class="time_comment">12:00</label>
                <p>commento:</p>
            </section>
        </div>
    </li>
    `;
    return li_comment;
}