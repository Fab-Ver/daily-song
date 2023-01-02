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

    for(let i of posts){
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
                    <img src="${i["urlImage"]}" alt=""/>
                    <div>
                      ${i["numLike"]}
                      <button class="like-button" onclick="console.log()">
                        <img src="upload/like.svg" alt="Like">
                      </button>
                      ${i["numDislike"]}
                      <button class="like-button dislike-button">
                        <img src="upload/like.svg" alt="Dislike">
                      </button>
                    </div>
                    <footer>
                      <figure>
                      <figcaption class="left-text">Song preview:</figcaption>
                        <audio controls src="${i["urlPreview"]}"></a>
                      </figure>
                    </footer>
                </article>
            </dialog>
        `;
        
        result += post;
    }
    return result;
}

function generateLike(isLike, newValue) {
  if (isLike) {
      return `<p id="like">${newValue}</p>`;
  } else {
      return `<p id="dislike">${newValue}</p>`;
  }
}

function updateLike(isLike, postID){
  let formData = new FormData();
  formData.append('postID', postID);
  formData.append('isLike', isLike);
  axios.post('api-post.php', formData).then(response => {
    console.log(response.data);
    if(response.data["updateLike"]){
      let post = [];
      for(let i of response.data["posts"]){
        if(i["postID"] == postID){
          post = i;
        }
      }
      document.getElementById(isLike ? "like ": "dislike").outerHTML = 
        generateLike(isLike, isLike ? result[postID]["likeNum"] : response.data["posts"][postID]["dislikeNum"]);
    }
});
}

axios.get('api-profile.php'+location.search).then(response => {
    console.log(response.data);
    const posts = showPosts(response.data["posts"]);
    const genres = showGenres(response.data["preferredGenres"]);
    const paragraph = document.querySelector('#genres');
    const content = document.querySelector('#content');
    content.innerHTML = posts;
    paragraph.innerHTML = genres;
});