function getArticles() {
    let article = `
    <div class="grid">
        <aside>
            <img src="./res/post4.jpg" alt="profile icon">
        </aside>
        <section class="post_text">
            <hgroup class="song">
                <h2>Titolo canzone</h2>
                <h3>Autore: ___ - Album: ____</h3>
            </hgroup>
            <a href="#">Link Canzone</a>
            <p>
                <img src="./upload/like.png" alt="like" class="like"><label for="like">5</label>
                <img src="./upload/like.png" alt="dislike" class="dislike"><label for="dislike">5</label>
            </p>
        </section>
    </div>
    <section class="comments">
        <input type="text" id="comment" name="comment" placeholder="Comments post" required>
        <button>pubblica</button>
    </section>
    <details>
        <summary aria-haspopup="listbox">mostra tutti i commenti</summary>
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
    console.log("article");
    return article;
}

const articles = document.querySelector("article");
console.log("articles");
articles.classList.add("post_body");
articles.innerHTML = getArticles();