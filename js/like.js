function showLikes(postID, numLike, numDislike, isMyReaction, myReaction){
  let likeImg = "";
  let dislikeImg = "";
  if(isMyReaction){
    if(myReaction){
      likeImg = `<img id="like-img${postID}" src="upload/like.svg" alt="Like">`;
      dislikeImg = `<img id="dislike-img${postID}" src="upload/unused-like.svg" alt="Dislike">`;
    } else {
      likeImg = `<img id="like-img${postID}" src="upload/unused-like.svg" alt="Like">`;
      dislikeImg = `<img id="dislike-img${postID}" src="upload/like.svg" alt="Dislike">`;
    }
  } else {
    likeImg = `<img id="like-img${postID}" src="upload/unused-like.svg" alt="Like">`;
    dislikeImg = `<img id="dislike-img${postID}" src="upload/unused-like.svg" alt="Dislike">`;
  } 

  let result =`
        <button class="like-button" onclick="updateLike(true, ${postID})">
          ${likeImg}
          <label class"caption" id="like${postID}">${numLike}</label>
        </button>
        <button class="like-button dislike-button" onclick="updateLike(false, ${postID})">
          ${dislikeImg}
          <label class"caption" id="dislike${postID}">${numDislike}</label>
        </button>
        `;
             
      return result;
  }
  
function updateLike(isLike, postID){
    let formData = new FormData();
    formData.append('postID', postID);
    formData.append('isLike', isLike);
    axios.post('api-post.php', formData).then(response => {
      console.log(response.data);
      if(response.data["updateLike"]){
        updateLikeImg(isLike, postID);
        document.getElementById("like"+postID).innerText = response.data["numLike"];
        document.getElementById("dislike"+postID).innerText = response.data["numDislike"];
      }
  });
}

function updateLikeImg(isLike, postID){
  if(isLike){
    document.getElementById("like-img"+postID).src = `upload/like.svg`;
    document.getElementById("dislike-img"+postID).src = `upload/unused-like.svg`;
  } else {
    document.getElementById("like-img"+postID).src = `upload/unused-like.svg`;
    document.getElementById("dislike-img"+postID).src = `upload/like.svg`;
  }
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