function showGenres(genresArray){
	let result = `
		Favourite genres: <br>
	`;
	let genres = "";
	for(let i=0; i < genresArray.length; i++){
		if(i == genresArray.length - 1){
			genres += genresArray[i]["tag"];
		} else{
			genres += genresArray[i]["tag"] + ", ";
		} 
	}
	return result + genres;
}

function showPosts(posts){
    let result = "";
    reversePosts = posts.reverse();
    for(let i of reversePosts){
        let post = `
            <img class="post-image" src="${i["urlImage"]}" alt="" data-target="modal-example-${i["postID"]}" onClick="toggleModal(event)" />
            <dialog id="modal-example-${i["postID"]}">
                <article>
                    <div class="grid">
                      <div>
                          <p class="title">${i["title"]}</p>
                          <a href="#close" aria-label="Close" class="close" data-target="modal-example-${i["postID"]}" onClick="toggleModal(event)"></a>
                      </div>
                    </div>
                    <p>${i["artists"]}</p>
                    <p>${i["description"]}</p>
                    <p><a href="${i["urlSpotify"]}"> Link Spotify</a></p>
                    <img class="modal-image" src="${i["urlImage"]}" alt=""/>
					<footer class="song-preview">
        `;

        let likes = showLikes(i["postID"], i["numLike"], i["numDislike"], i["isMyReaction"], i["myReaction"]);

        let songPreview = "";
        if(i["urlPreview"] !== "null"){
          songPreview =  ` 
            	<figure>
            	<figcaption class="left-text">Song preview: </figcaption>
            		<audio controls src="${i["urlPreview"]}"></audio>
            	</figure>
          `;
        }
		let comments = `<div class="div_comment"></div>`;
        let endOfPost = `
					</footer>
        		</article>
        	</dialog>
        `;

        post += likes;
        post += songPreview;
		post += comments;
        post += endOfPost;

        result += post;
    }
    return result;
}

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const posts = showPosts(response.data["posts"], response.data["sessionUsername"]);
    const genres = showGenres(response.data["preferredGenres"]);
    const paragraph = document.querySelector('#genres');
    const content = document.querySelector('#content');
    content.innerHTML = posts;
    paragraph.innerHTML = genres;
});