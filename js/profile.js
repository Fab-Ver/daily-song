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
            <img src="${i}" alt="" data-target="modal-example-${i}" onClick="toggleModal(event)" />
            <dialog id="modal-example-${i}">
                <article>
                    <div class="grid">
                    <div>
                        <p class="title">Titolo canzone</p>
                        <a href="#close" aria-label="Close" class="close" data-target="modal-example-${i}" onClick="toggleModal(event)"></a>
                    
                    </div>
                    </div>
                    <p>Artista</p>
                    <p>Descrizione del post se c'è</p>
                    <p><a href="#linkSpotify"> link Spotify</a></p>
                    <img src="${i}" alt=""/>
                    <footer>
                        
                    </footer>
                </article>
            </dialog>
        `;
        
        result += post;
    }
    return result;
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