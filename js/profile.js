function showGenres(genresArray){
  let result = `Favourite genres: <br>`;
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
                          <p class="title">${i["title"]}${i["prova"]}</p>
                          <a href="#close" aria-label="Close" class="close" data-target="modal-example-${i["postID"]}" onClick="toggleModal(event)"></a>
                      </div>
                    </div>
                    <p>${i["artists"]}</p>
                    <p>${i["description"]}</p>
                    <p><a href="${i["urlSpotify"]}"> Link Spotify</a></p>
                    <img src="${i["urlImage"]}" alt=""/>
        `;
          /*<div>
          ${i["numLike"]}
          <button class="like-button" onclick="updateLike(true, ${i["postID"]}, ${i["sessionUsername"]})">
            <img src="upload/like.svg" alt="Like">
          </button>
          ${i["numDislike"]}
          <button class="like-button dislike-button" onclick="updateLike(false, ${i["postID"]}, ${i["sessionUsername"]})">
            <img src="upload/like.svg" alt="Dislike">
          </button>
        </div>*/
        let likes = showLikes(i["postID"], i["numLike"], i["numDislike"], i["sessionUsername"]);

        let songPreview = "";
        if(i["urlPreview"] !== "null"){
          songPreview =  ` 
            <footer>
              <figure>
              <figcaption class="left-text">Song preview: </figcaption>
                <audio controls src="${i["urlPreview"]}"></a>
              </figure>
            </footer>
          `;
        }
        let endOfPost = `
          </article>
          </dialog>
        `;

        post += likes;
        post += songPreview;
        post += endOfPost;

        result += post;
    }
    return result;
}

/*function generateLike(isLike, newValue) {
  if (isLike) {
      return `<p id="like">${newValue}</p>`;
  } else {
      return `<p id="dislike">${newValue}</p>`;
  }
}

function updateLike(isLike, postID, user){
  let formData = new FormData();
  formData.append('postID', postID);
  formData.append('user', user);
  formData.append('isLike', isLike);
  axios.post('api-post.php', formData).then(response => {
    console.log(response.data);
    if(response.data["updateLike"]){
      document.getElementById("like").outerHTML = `<p id="like">${response.data["likeNum"]})</p>`;
      document.getElementById("dislike").outerHTML = `<p id="dislike">${response.data["dislikeNum"]})</p>`;
    }
});
}*/

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const posts = showPosts(response.data["posts"]);
    const genres = showGenres(response.data["preferredGenres"]);
    const paragraph = document.querySelector('#genres');
    const content = document.querySelector('#content');
    content.innerHTML = posts;
    paragraph.innerHTML = genres;
});