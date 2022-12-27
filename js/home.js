function viewHome(){
    let post = `
        <section>
            <button class="next">p</button>
            <article class="post">post</article>
            <button class="prev">d</button>
        </section>
        <div class="grid">
            <div><article>prima 3</article></div>
            <div><article>prima 2</article></div>
            <div><article>prima 1</article></div>
            <div class="currentPost"><article>post</article></div>
            <div><article>dopo 1</article></div>
            <div><article>dopo 2</article></div>
            <div><article>dopo 3</article></div>
        </div>
    `;
    return post;
}

const main = document.querySelector("main");
main.innerHTML = viewHome();