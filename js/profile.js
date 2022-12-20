function showPosts(posts){
    let result = "";

    for(let i=0; i < posts.length; i++){
        let post = `
            <img src="${posts[i]}" alt="" />
        `;
        result += post;
    }
    return result;
}

axios.get('api-profile.php').then(response => {
    console.log(response.data);
    const posts = showPosts(response.data["posts"]);
    console.log(posts);
    const content = document.querySelector('#content');
    content.innerHTML = posts;
});

