function showLikes(postID, numLike, numDislike, isMyReaction, myReaction){
	let likeImg = "";
	let dislikeImg = "";
	if(isMyReaction){
		if(myReaction == 1){
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
			<label class="caption" id="like${postID}">${numLike}</label>
		</button>
		<button class="like-button dislike-button" onclick="updateLike(false, ${postID})">
			${dislikeImg}
			<label class="caption" id="dislike${postID}">${numDislike}</label>
		</button>
	`;
			
	return result;
}
  
function updateLike(likeValue, postID){
	let formData = new FormData();
	formData.append('postID', postID);
	formData.append('likeValue', likeValue ? 1 : 0);
	axios.post('api-post.php', formData).then(response => {
		console.log(response.data);
		if(response.data["updateLike"]){
			updateLikeImg(response.data["isMyReaction"], likeValue, postID);
			document.getElementById("like"+postID).innerText = response.data["numLike"];
			document.getElementById("dislike"+postID).innerText = response.data["numDislike"];
		}
	});
}

function updateLikeImg(isMyReaction, likeValue, postID){
	if(isMyReaction){
		if(likeValue == 1){
			document.getElementById("like-img"+postID).src = `upload/like.svg`;
			document.getElementById("dislike-img"+postID).src = `upload/unused-like.svg`;
		} else {
			document.getElementById("like-img"+postID).src = `upload/unused-like.svg`;
			document.getElementById("dislike-img"+postID).src = `upload/like.svg`;
		}	
	} else {
		document.getElementById("like-img"+postID).src = `upload/unused-like.svg`;
		document.getElementById("dislike-img"+postID).src = `upload/unused-like.svg`;
	}
	
}
