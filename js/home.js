function viewHome(){
    let post = `
    <section class="post_section">
        <button class="button_prev">p</button>
        <article class="current_post">post</article>
        <button class="button_next">d</button>
    </section>
    <div class="grid">
        <div><article>prima 3</article></div>
        <div><article>prima 2</article></div>
        <div><article>prima 1</article></div>
        <div class="current_post"><article>post</article></div>
        <div><article>dopo 1</article></div>
        <div><article>dopo 2</article></div>
        <div><article>dopo 3</article></div>
    </div>
    `;
    return post;
}

const main = document.querySelector("main");
main.innerHTML = viewHome();

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