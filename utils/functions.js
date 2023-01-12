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

function createGenres(genres,onclick){
    let result = ``;
    genres.forEach(element =>{
        let item = `
        <li id="li${element["genreID"]}" role="listitem">
            <label id="label${element["genreID"]}">
                <input id="${element["genreID"]}"type="checkbox" ${onclick ? 'onclick="getGenre()"' : ''}></input>
            ${element["tag"]}
            </label>
        </li> `;
        result+=item;
    });
    return result;
}

function clearAllGenres(){
    let checkboxes = document.querySelectorAll('#genres_list input[type="checkbox"]');
    let search = document.getElementById('search');
    search.value = '';
    filterGenre();
    checkboxes.forEach(element => element.checked = false);
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

 /**
  * Check if first name field is valid 
  */
 function checkFirstName(){
    let first_name = document.getElementById('first_name');
    if(!first_name.validity.valueMissing){
        setValid(first_name,true);
    } else {
        first_name.removeAttribute("aria-invalid");
    }
}

/**
 * Check if last name field is valid
 */
function checkLastName(){
    let last_name = document.getElementById('last_name');
    if(!last_name.validity.valueMissing){
        setValid(last_name,true);
    } else {
        last_name.removeAttribute("aria-invalid");
    }
}

/**
 * Check if telephone number is valid
 */
function checkTelephone(){
    let telephone = document.getElementById('telephone');
    let regex = /^\+?([0-9]{2})\)?[-.]?([0-9]{3})[-.]?([0-9]{7})$/;
    if(telephone.value != ""){
        if(!telephone.value.match(regex)){
            showError(telephone,"Wrong telephone number format, +XX XXX XXXXXXX expected");
            setValid(telephone,false);
        } else {
            setValid(telephone,true);
        }
    } else {
        telephone.setCustomValidity("");
        telephone.removeAttribute("aria-invalid");
    } 
}

/**
 * Check if password is secure and equal to confirm password
 */
function checkPassword(){
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    let regex =  /^(?=.*[0-9])(?=.*[\'^£$%&*()}{@#~?><>,|=_+¬-])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9\'^£$%&*()}{@#~?><>,|=_+¬-]{8,30}$/;
    if(!password.validity.valueMissing){
        if(!password.value.match(regex)){
            showError(password,"Wrong password format, should contain at least:\n- one digit\n- one upper case\n- one lower case\n- one special character \'^£$%&*()}{@#~?><>,|=_+¬-\nMin length: 8\nMax length: 30 ");
            setValid(password,false);
        } else {
            if(!confirm_password.validity.valueMissing){
                if(password.value != confirm_password.value){
                    showError(password,"The passwords do not match");
                    setValid(password,false);
                } else {
                    setValid(password,true);
                }
            } else {
                setValid(password,true);
            }
        }
    } else {
        password.removeAttribute("aria-invalid");
    }
}

/**
 * Check if confirm password is equal to password
 */
function checkConfirmPassword(){
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    if(!confirm_password.validity.valueMissing){
        if(!password.validity.valueMissing){
            if(password.value != confirm_password.value){
                showError(confirm_password,"The passwords do not match");
                setValid(confirm_password,false);
            } else {
                setValid(confirm_password,true);
            }
        }
    } else {
        confirm_password.removeAttribute("aria-invalid");
    }
}

/**
 * Check if image has the right extension
 */
function checkImage(){
    let profile_picture = document.getElementById('profile_picture');
    let filePath = profile_picture.value;
    let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(profile_picture.value != ""){
        if (!allowedExtensions.exec(filePath)) {
            showError(profile_picture,"Wrong file extension, accepted: .jpg .jpeg .png .gif");
            setValid(profile_picture,false);
        } else {
            setValid(profile_picture,true);
        }
    } else {
        profile_picture.removeAttribute("aria-invalid");
    } 
}

/**
 * Get comment of a post
 */
let user;
function getComment(post){
    console.log(post);
    user = post["user"];
    let ret = ``;
    if(post["activeComments"] === 1){
        ret  = `
            <section class="comments">
                <textarea id="textarea${post["postID"]}" name="comment" placeholder="Add comment"></textarea>
                <button id="button${post["postID"]}" onclick="publishComment(this.id)">Publish</button>
            </section>
            <details class="show_comments">
                <summary aria-haspopup="listbox">Show all comments</summary>
                <ul role="group" id="list_comment${post["postID"]}" title="comment list">`
        
        for(let j=0; j<post["comments"].length; j++){
            ret += addComment(post["comments"][j]);
        }

        ret +=`
                </ul>
            </details>
        `;
    }
    return ret;
}

function addComment(comment) {
    let li_comment = `
    <li>
        <div class="grid">
            <img src="${comment["profilePicture"]}" alt="profile_picture">
            <section class="comment_text">
                <label for="username" class="username">${comment["username"]}</label>`;
                
    if(user === comment["username"]){
        li_comment += `<button onclick="return deleteComment(\'' + ${comment["commentID"]} + '\',\'' + ${comment["postID"]} + '\')"><img src="./res/trash.png" alt="delete_image"></button>`;
    }
    
    
    li_comment += `
                <label for="time_comment" class="time_comment">${comment["dateTime"]}</label>
                <p>${comment["text"]}</p>
            </section>
        </div>
    </li>`;
    return li_comment;
}

function publishComment(idButton){
    let id = idButton.replace("button", "");
    let text_comment = document.getElementById("textarea" + id);
    let form_data = new FormData();
    form_data.append("comment", text_comment.value);
    form_data.append("post_id", id);
    if(text_comment.value !== ""){
        axios.post("api-home.php",form_data).then(response => {
            text_comment.value = "";
            li_comment = document.getElementById("list_comment" + id);
            li_comment.innerHTML = ``;
            for(let j=0; j<response.data["comments"].length; j++){
                li_comment.innerHTML += addComment(response.data["comments"][j]);
            }
        });
    }
}

function deleteComment(idComment, idPost){
    let form_data = new FormData();
    form_data.append("idComment", idComment);
    form_data.append("idPost", idPost);
    axios.post("api-home.php", form_data).then(response => {
        li_comment = document.getElementById("list_comment" + idPost);
        li_comment.innerHTML = ``;
        for(let j=0; j<response.data["comments"].length; j++){
            li_comment.innerHTML += addComment(response.data["comments"][j]);
        }
    });
}