function createSignUpForm(){
    let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h1>Sign Up</h1>
                <h2>Enter your email and other personal information to create your account</h2>
            </hgroup>
            <div class=error tabindex="-1" hidden></div>
            <form action="#" method="post" id="signup_form">
                    <label for="email">
                        Email:
                        <input type ="email" id="email" name="email" placeholder="Email..." oninput="checkSignUpEmail()" required></input>
                    </label>
                    <div class="grid">
                    <div><label for="first_name">
                        First Name:
                        <input type ="text" id="first_name" name="first_name" placeholder="First name..." oninput="checkFirstName()" required></input>
                        </label> 
                    </div>
                    <div><label for="last_name">
                        Last Name:
                        <input type ="text" id="last_name" name="last_name" placeholder="Last name..." oninput="checkLastName()" required></input>
                        </label>
                    </div>
                    </div>
                    <label for="birth_date">
                        Birth date:
                        <input type="date" id="birth_date" name="birth_date"  onchange="checkBirthDate()" required>
                    </label>
                    <label for="telephone">
                        Telephone:
                        <input type ="tel" id="telephone" name="telephone" placeholder="Telephone..." oninput="checkTelephone()"></input>
                    </label>
                    <label for="username">
                        Username:
                        <input type ="text" id="username" name="username" placeholder="Username..." onblur="checkUsername()" required></input>
                    </label>
                    <label for="password">
                        Password:
                        <input type ="password" id="password" name="password" placeholder="Password..." oninput="checkPassword()" required></input>
                    </label>
                    <label for="confirm_password">
                        Confirm password:
                        <input type ="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password..." oninput="checkConfirmPassword()" required></input>
                    </label>
                    <label for="profile_picture">Select profile picture:
                        <input type="file" id="profile_picture" name="profile_picture" accept="image/*" onchange="checkImage()">
                    </label>
                    <label for="favorite_genre">
                        Select favorite music genres (max 5):
                        <details id="favorite_genre" role="list">
                            <summary aria-haspopup="listbox">Favorite music genres...</summary>
                            <ul id="genres_list" role="listbox">
                                <li><input type="search" id="search" name="search" placeholder="Search" oninput="filterGenre()"></li>
                            </ul>
                        </details>
                    </label>
                    <label for="notification">
                        <input type="checkbox" id="notification" name="notification" role="switch" checked>
                        Allow notification
                    </label>
                <input type="button" name="signup" value="Sign Up" onclick="checkSignUpForm()"></input>
            </form>
            <p>Already have an account? <a href="index.php">Log In</a></p
            </div>
        </article>
    `;
    return form;
}

function createError(errors){
   let result = `During sign up the following errors occurred:<ul>`
   for(let i=0;i<errors.length;i++){
    let li = `<li>${errors[i]}</li>`;
    result += li;
   }
   result += `</ul>`;
   return result;
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

function checkSignUpEmail(){
    if(!email.validity.valueMissing){
        if(email.validity.typeMismatch){
            showError(email,"Wrong mail format (example@domain.com)");
            setValid(email,false);
        } else {
            let formData = new FormData();
            formData.append('checkEmail',email.value);
            axios.post('validate.php',formData).then(response => {
                if(response.data["errorEmail"]){
                    showError(email,"Email already in use, try with another or log in");
                    setValid(email,false);
                } else {
                    setValid(email,true);
                }
            });
        }
    } else {
        email.removeAttribute("aria-invalid");
    }
}

function checkFirstName(){
    if(!first_name.validity.valueMissing){
        setValid(first_name,true);
    } else {
        first_name.removeAttribute("aria-invalid");
    }
}

function checkLastName(){
    if(!last_name.validity.valueMissing){
        setValid(last_name,true);
    } else {
        last_name.removeAttribute("aria-invalid");
    }
}

function checkBirthDate(){
    let today = new Date();
    let current_value = new Date(birth_date.valueAsDate);
    let min_date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if(!birth_date.validity.valueMissing){
        if(current_value.getFullYear() <= today.getFullYear() - 110 ||   current_value > min_date){
            showError(birth_date,"You are to young or to old to subscribe to our website");
            setValid(birth_date,false);
        } else {
            setValid(birth_date, true);
        }
    } else {
        birth_date.removeAttribute("aria-invalid");
    }
}

function checkTelephone(){
    let regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{7})$/;
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

function checkUsername(){
    if(!username.validity.valueMissing){
        let formData = new FormData();
        formData.append('checkUsername',username.value);
        axios.post('validate.php',formData).then(response => {
            if(response.data["errorUsername"]){
                showError(username,"Username already in use, try with another or log in");
                setValid(username,false);
            } else {
                setValid(username,true);
            }
        });
    } else {
        username.removeAttribute("aria-invalid");
    }   
}

function checkPassword(){
    let regex =  /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/
    if(!password.validity.valueMissing){
        if(!password.value.match(regex)){
            showError(password,"Wrong password format, should contain at least:\n- one digit\n- one upper case\n- one lower case\n- one special character - ?!@#$%^&*\/\\\nMin length: 8\nMax length: 30 ");
            setValid(password,false);
        } else {
            if(!confirm_password.validity.valueMissing){
                if(password.value != confirm_password.value){
                    showError(password,"The passwords don't match");
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

function checkConfirmPassword(){
    if(!confirm_password.validity.valueMissing){
        if(!password.validity.valueMissing){
            if(password.value != confirm_password.value){
                showError(confirm_password,"The passwords don't match");
                setValid(confirm_password,false);
            } else {
                setValid(confirm_password,true);
            }
        }
    } else {
        confirm_password.removeAttribute("aria-invalid");
    }
}

function checkImage(){
    let filePath = profile_picture.value;
    let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(profile_picture.value != ""){
        if (!allowedExtensions.exec(filePath)) {
            showError(profile_picture,"Wrong image extension, accepted .jpg .jpeg .png .gif");
            setValid(profile_picture,false);
        } else {
            setValid(profile_picture,true);
        }
    } else {
        profile_picture.removeAttribute("aria-invalid");
    }
    
}

function checkFavoriteGenres(){
    let checkboxes = document.querySelectorAll('#genres_list input[type="checkbox"]');
    let count = 0;
    checkboxes.forEach(element => {
        if(element.checked){
            count++;
        }
    })
    return count > 0 && count<=5
}

function checkSignUpForm(){
    let errors = new Array();
    let err_element = new Array();

    if(email.validity.valueMissing || email.getAttribute('aria-invalid') === 'true'){
        errors.push("Invalid mail format or email already used");
        err_element.push(email);
    }

    if(first_name.validity.valueMissing){
        errors.push("Enter first name");
        err_element.push(first_name);
    }

    if(last_name.validity.valueMissing){
        errors.push("Enter last name");
        err_element.push(last_name);
    }

    if(birth_date.validity.valueMissing || birth_date.getAttribute('aria-invalid') === 'true'){
        errors.push("Invalid birth date");
        err_element.push(birth_date);
    }

    if(telephone.getAttribute('aria-invalid') === 'true'){
        errors.push("Invalid telephone format");
        err_element.push(telephone);
    }

    if(username.validity.valueMissing || username.getAttribute('aria-invalid') === 'true'){
        errors.push("Username missing or already used");
        err_element.push(username);
    }

    if(password.validity.valueMissing || password.getAttribute('aria-invalid') === 'true'){
        errors.push("Password missing or password mismatch");
        err_element.push(password);
    }

    if(confirm_password.validity.valueMissing || confirm_password.getAttribute('aria-invalid') === 'true'){
        errors.push("Confirm password missing or password mismatch");
        err_element.push(confirm_password);
    }

    if(profile_picture.getAttribute('aria-invalid') === 'true'){
        errors.push("Invalid profile picture extension");
        err_element.push(profile_picture);
    }

    if(!checkFavoriteGenres()){
        errors.push("Wrong number of favorite genre, too low or too high");
    }

    if(errors.length == 0){
        submitForm();
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        let error_div = document.querySelector("div.error");
        error_div.innerHTML = createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}



function submitForm(){
    let formData = new FormData();
    let SQL_date = birth_date.valueAsDate.toISOString().slice(0,9);
    let notification_status = notification.checked.toString();
    let file_name = "";
    if(profile_picture.value != ""){
        file_name = profile_picture.value.replace(/^.*[\\\/]/, '');
    } else {
        file_name = "default.png";
    }
    formData.append('email',email.value);
    formData.append('first_name',first_name.value);
    formData.append('last_name',last_name.value);
    formData.append('birth_date',SQL_date);
    formData.append('telephone',telephone.value);
    formData.append('username',username.value);
    formData.append('password',password.value);
    formData.append('profile_picture',file_name);
    formData.append('notification',notification_status);
    axios.post('validate.php',formData).then(response => {
        if(response.data["validateError"]){
            let error_div = document.querySelector("div.error");
            error_div.innerHTML = "An undefined error occurred, try again";
            error_div.removeAttribute('hidden');
            error_div.focus
        } else {
            window.location.replace("homepage.php");
        }
    });
}

const main = document.querySelector("main");
main.innerHTML = createSignUpForm();
const email = document.getElementById('email');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const birth_date = document.getElementById('birth_date');
const telephone = document.getElementById('telephone');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const profile_picture = document.getElementById('profile_picture');
const notification = document.getElementById('notification');
email.focus();
axios.get("genre.php").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data);
});

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
};