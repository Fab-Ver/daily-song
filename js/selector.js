const section = document.querySelector(".main-div").querySelector("section").querySelector("section");

section.innerHTML += `
    <div class="selector">
        <details id="track_genres" role="list" class="track_genres" >
            <summary aria-haspopup="listbox">Select music genres</summary>
            <ul id="genres_list" role="listbox">
                <li>
                    <input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()">
                </li>
            </ul>
        </details>
        <input type="date" id="date" name="date">
    </div>
    `;

axios.get("genre.php").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data);
});