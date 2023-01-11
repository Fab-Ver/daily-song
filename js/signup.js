function createSignUpForm(){
    let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h1>Sign Up</h1>
                <h2>Enter your email and other personal information to create your account</h2>
            </hgroup>
            <div class="error_form" tabindex="-1" hidden></div>
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
                            <ul id="genres_list" role="listbox" title="List of music genres">
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
            <p>Already have an account? <a href="index.php">Log In</a></p>
            </div>
        </article>
    `;
    return form;
}

function checkSignUpEmail(){
    if(!email.validity.valueMissing){
        if(email.validity.typeMismatch){
            showError(email,'Invalid email format, expected example@domain.com');
            setValid(email,false);
        } else {
            let formData = new FormData();
            formData.append('checkEmail',email.value);
            axios.post('registration.php',formData).then(response => {
                if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                    showError(email,response.data.errorMsg);
                    setValid(email,false);
                } else if(response.data.valid === true){
                    setValid(email,true);
                }
            });
        }
    } else {
        email.removeAttribute("aria-invalid");
    }
}

function checkUsername(){
    let username = document.getElementById('username');
    if(!username.validity.valueMissing){
        let formData = new FormData();
        formData.append('checkUsername',username.value);
        axios.post('registration.php',formData).then(response => {
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                showError(username,response.data.errorMsg);
                setValid(username,false);
            } else if(response.data.valid === true){
                setValid(username,true);
            }
        });
    } else {
        username.removeAttribute("aria-invalid");
    }   
}

function checkBirthDate(){
    let today = new Date();
    let current_value = new Date(birth_date.valueAsDate);
    let min_date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if(!birth_date.validity.valueMissing){
        if(current_value.getFullYear() <= today.getFullYear() - 120 ||   current_value > min_date){
            showError(birth_date,"You are to young or to old to subscribe to our website");
            setValid(birth_date,false);
        } else {
            setValid(birth_date, true);
        }
    } else {
        birth_date.removeAttribute("aria-invalid");
    }
}

function checkSignUpForm(){
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let telephone = document.getElementById('telephone');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let profile_picture = document.getElementById('profile_picture');
    let confirm_password = document.getElementById('confirm_password');
    let errors = new Array();
    let err_element = new Array();

    if(email.validity.valueMissing || email.getAttribute('aria-invalid') === 'true'){
        errors.push("Invalid mail format or email already used");
        err_element.push(email);
    }

    if(first_name.validity.valueMissing){
        errors.push("First name required, enter first name to continue");
        err_element.push(first_name);
    }

    if(last_name.validity.valueMissing){
        errors.push("Last name required, enter last name to continue");
        err_element.push(last_name);
    }

    if(birth_date.validity.valueMissing || birth_date.getAttribute('aria-invalid') === 'true'){
        errors.push("Enter a valid birth date to continue");
        err_element.push(birth_date);
    }

    if(telephone.getAttribute('aria-invalid') === 'true'){
        errors.push("Wrong telephone number format, +XX XXX XXXXXXX expected");
        err_element.push(telephone);
    }

    if(username.validity.valueMissing || username.getAttribute('aria-invalid') === 'true'){
        errors.push("Username required, enter a valid username to continue");
        err_element.push(username);
    }

    if(password.validity.valueMissing || password.getAttribute('aria-invalid') === 'true'){
        errors.push("Wrong password format or password mismatch");
        err_element.push(password);
    }

    if(confirm_password.validity.valueMissing || confirm_password.getAttribute('aria-invalid') === 'true'){
        errors.push("Confirm password does not match the specified password");
        err_element.push(confirm_password);
    }

    if(profile_picture.getAttribute('aria-invalid') === 'true'){
        errors.push("Wrong file extension, accepted: .jpg .jpeg .png .gif");
        err_element.push(profile_picture);
    }

    if(!checkGenres(0,5)){
        errors.push("Wrong number of selected genresID, please select between 1 and 5 genres");
    }

    if(errors.length == 0){
        submitForm(first_name,last_name,telephone,username,password,confirm_password,profile_picture);
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        let error_div = document.querySelector("div.error_form");
        error_div.innerHTML = `While processing your data the following errors occurred:<ul>` + createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}

function submitForm(first_name,last_name,telephone,username,password,confirm_password){
    let formData = new FormData();
    let SQL_date = birth_date.valueAsDate.toISOString().slice(0,10);
    formData.append('email',email.value);
    formData.append('first_name',first_name.value);
    formData.append('last_name',last_name.value);
    formData.append('birth_date',SQL_date);
    formData.append('telephone',telephone.value);
    formData.append('username',username.value);
    formData.append('password',password.value);
    formData.append('confirmPassword',confirm_password.value);
    if(profile_picture.value !== ''){
        formData.append('profile_picture',profile_picture.files[0]);
    }
    formData.append('notification',notification.checked);
    formData.append('favoriteGenres',JSON.stringify(getGenresID()));

    axios.post('registration.php',formData).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
            if(response.data.errorElem !== undefined && response.data.errorElem !== undefined){
                response.data.errorElem.forEach(element => setValid(document.getElementById(element),false));
            }
        }  else if(response.data.loggedIn === true) {
            window.location.replace("homepage.php");
        }
    });
}

const main = document.querySelector("main");
main.innerHTML = createSignUpForm();
const email = document.getElementById('email');
const birth_date = document.getElementById('birth_date');
const notification = document.getElementById('notification');
axios.get("genre.php?genre=get").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data,false);
});
email.focus();

