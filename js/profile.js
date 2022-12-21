function showPosts(posts){
    let result = "";

    for(let i of posts){
        let post = `
            <img src="${i}" alt="" />
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

