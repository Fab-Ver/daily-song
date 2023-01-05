function showLikes(postID, numLikes, numDislikes){
      let result =`
            <button class="like-button" onclick="updateLike(true, ${postID})">
                <img src="upload/like.svg" alt="Like">
                <label class"caption" id="like">${numLikes}</label>
            </button>
            <button class="like-button dislike-button" onclick="updateLike(false, ${postID})">
                <img src="upload/like.svg" alt="Dislike">
                <label class"caption" id="dislike">${numDislikes}</label>
            </button>
          `;
          
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
        document.getElementById("like").outerHTML = `<label id="like">${response.data["likeNum"]}</label>`;
        document.getElementById("dislike").outerHTML = `<label id="dislike">${response.data["dislikeNum"]}</label>`;
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