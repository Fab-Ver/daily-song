function getPost() {
    let article = `
    <div class="grid">
        <aside>
            <img src="./res/post4.jpg" alt="profile icon">
        </aside>
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
            <p class="time_ago">3h ago </p>
        </section>
    </div>
    <section class="comments">
        <textarea id="comment" name="comment" placeholder="Add comment"></textarea>
        <button>Publish</button>
        <p>when clik publich show current comment</p>
    </section>
    <details>
        <summary aria-haspopup="listbox">Show all comments</summary>
        <ul role="listbox">
            <li>
                <head>Intestazione</head>
                <article>commento 1</article>
            </li>
            <li>
                <head>Intestazione</head>
                <article>commento 2</article>
            </li>
        </ul>
    </details>
    `;
    return article;
}

let articles = document.querySelector("article");
articles.classList.add("post_body");
articles.innerHTML = getPost();