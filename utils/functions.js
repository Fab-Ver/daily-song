function showError(element,msg){
    element.setCustomValidity(msg);
    element.reportValidity();
    element.focus();
}

function setValid(element,value){
    if(value){
        element.setCustomValidity("");
        element.setAttribute("aria-invalid","false");
    } else {
        element.setAttribute("aria-invalid","true");
    }
}

function filterGenre(){
    let list_item = document.querySelectorAll("#genres_list label");
    list_item.forEach(element => {
        let elem_text = element.innerText.trim().toLowerCase();
        let curr_search = search.value.trim().toLowerCase();
        let id = element.id.replace("label","");
        let li_id = "li"+id;
        if(elem_text.includes(curr_search)){
            document.getElementById(li_id).removeAttribute("hidden");
        } else {
            document.getElementById(li_id).setAttribute("hidden", "hidden");
        }
    });
}

function getGenresID(){
    let ids = new Array();
    let checkboxes = document.querySelectorAll('#genres_list input[type="checkbox"]');
    checkboxes.forEach(element => {
        if(element.checked){
            ids.push(element.id);
        }
    });
    return ids;
}

function checkGenres(min,max){
    let checkboxes = document.querySelectorAll('#genres_list input[type="checkbox"]');
    let count = 0;
    checkboxes.forEach(element => {
        if(element.checked){
            count++;
        }
    })
    return count > min && count<=max
}

function createGenres(genres){
    let result = ``;
    genres.forEach(element =>{
        let item = `
        <li id="li${element["genreID"]}">
            <label id="label${element["genreID"]}">
                <input id="${element["genreID"]}"type="checkbox">
            ${element["tag"]}
            </label>
        </li> `;
        result+=item;
    });
    return result;
}

function createError(errors){
    let result = ``;
    errors.forEach(e => {
        let li = `<li>${e}</li>`;
        result += li;
    });
    result += `</ul>`;
    return result;
 }
