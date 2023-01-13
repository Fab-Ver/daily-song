/**
 * Create the list of user's favourite genres.
 * @returns user's favourite genres
 */
function showGenres(genresArray){
	let result = `
		Favorite genres: <br>
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

/**
 * Create the list of user's posts, all with a modal to open them individually.
 * @returns post img and dialog containing post's infos
 */
function showPosts(posts, sessionUsername){
    let result = "";
    tabIndex = 0;
    reversePosts = posts.reverse();
    for(let i of reversePosts){
        tabIndex++;
        let post = `
            <img class="post-image" src="${i["urlImage"]}" alt="" data-target="modal-example-${i["postID"]}" tabindex="${tabIndex}" onClick="toggleModal(event)" />
            <dialog id="modal-example-${i["postID"]}">
                <article class="post-modal">
                    <div class="grid">
                      <div>
                          <p class="title">${i["title"]}</p>
                          <a href="#close" aria-label="Close" class="close" data-target="modal-example-${i["postID"]}" onClick="toggleModal(event)"></a>
                      </div>
                    </div>
                    <p>${i["artists"]} - ${i["albumName"]}</p>
                    <p>${i["description"]}</p>
                    <p><a href="${i["urlSpotify"]}"> Link Spotify</a></p>
                    <img class="modal-image" src="${i["urlImage"]}" alt=""/>
					<footer class="comment-footer">
        `;

        let likes = showLikes(i["postID"], i["numLike"], i["numDislike"], i["isMyReaction"], i["myReaction"]);

        let songPreview = "";
        if(i["urlPreview"] !== "null"){
          songPreview =  ` 
            	<figure class="song-preview">
            	    <figcaption> Song preview: </figcaption>
            		<audio controls src="${i["urlPreview"]}"></audio>
            	</figure>
          `;
        }

		let startOfComments = `<div class="div_comment_${i} post-comments" id="comments">`;
        let comment = new Array();
        comment["user"] = sessionUsername;
        comment["activeComments"] = i["activeComments"];
        comment["postID"] = i["postID"];
        comment["comments"] = i["comments"];
        let comments = getComment(comment);
        let endOfComments = `</div>`;
        startOfComments += comments;
        startOfComments += endOfComments;

        let endOfPost = `
					</footer>
        		</article>
        	</dialog>
        `;

        post += likes;
        post += songPreview;
		post += startOfComments;
        post += endOfPost;

        result += post;
    }
    return result;
}

/**
 * Send a get request with location.search to know who's posts I have to show.
 */
axios.get('api-profile.php'+location.search).then(response => {
    const posts = showPosts(response.data["posts"], response.data["sessionUsername"]);
    const genres = showGenres(response.data["preferredGenres"]);
    const paragraph = document.querySelector('#genres');
    const content = document.querySelector('#content');
    content.innerHTML = posts;
    paragraph.innerHTML = genres;
});