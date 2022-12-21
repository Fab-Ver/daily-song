function showPosts(posts){
    let result = "";

    for(let i of posts){
        let post = `
            <img src="${i}" alt="" onClick="openPost()" />
        `;
        
        result += post;
    }
    return result;
}

function openPost(){
    console.log("provaaa");
}

axios.get('api-profile.php').then(response => {
    console.log(response.data);
    const posts = showPosts(response.data["posts"]);
    console.log(posts);
    const content = document.querySelector('#content');
    content.innerHTML = posts;
});

