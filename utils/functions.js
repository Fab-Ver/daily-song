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

 const getToken = () => {
    let client_id = config.ClientID;
    let client_secret = config.ClientSecret;
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        data: {
          grant_type: 'client_credentials'
        },
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: client_id,
          password: client_secret
        }
    }).then((response) => {
          return response.data.access_token;
    }).catch(function (error) {
        let string;
        if(error.response){
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            string = error.response.status + " " + error.response.data.error_description;
        } else if (error.request){
            // The request was made but no response was received
            string = 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            string = error.message;
        }
        let errorMsg = {
            error_string : string
        }
        return errorMsg;
      });
 };

 const retrieveData = (track_id) => {
    let request_url = 'https://api.spotify.com/v1/tracks/' + track_id;
    return getToken().then(token => {
        if(token.error_string !== undefined){
            return token;
        } else {
            const config = {
                method: 'get',
                url: request_url,
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer '+ token
                }
            };
    
            return axios(config).then(response => {
                return response.data;
            }).catch(function (error) {
                let string;
                if(error.response){
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    string = error.response.status + " " + error.response.data.error.message;
                } else if (error.request){
                    // The request was made but no response was received
                    string = 'No response received from the server';
                } else {
                    // Something happened in setting up the request that triggered an Error
                    string = error.message;
                }
                let errorMsg = {
                    error_string : string
                }
                return errorMsg;
              });
        }
        
    });
 };
