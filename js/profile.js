function showProfile(result){
 let profile = `
    <div class="grid">
        <img src="${result["profilePicture"]}" alt="" width="60%" height="60%"/>
        <p>@${result["username"]}<br> ${result["firstName"]} ${result["lastName"]}</p>
        <p>${result["profileFollower"]} <br> follower</p>
        <p>${result["profileFollowed"]} <br> followed</p>
        <p>${result["posts"].length} <br> post</p>
    </div>
    <div class="grid" id="posts">
        
    </div>
    `;
 return profile;
}

function createError(posts){
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
    const profile = showProfile(response.data);
    const posts = createError(response.data["posts"]);
    console.log(posts);
    const main = document.querySelector("main");
    main.innerHTML = profile;
    const div = document.querySelector("#posts");
    div.innerHTML = posts;
});

