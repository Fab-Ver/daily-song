function createSignUpForm(){
    let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h1>Sign Up</h1>
                <h2>Enter your email and other personal information to create your account</h2>
            </hgroup>
            <form action="#" method="post" id="signup_form">
                    <h2>Personal data</h2>
                    <label for="email">
                        Email:
                        <input type ="email" id="email" name="email" placeholder="Email..." onblur="checkSignUpEmail()" required></input>
                    </label>
                    <div class="grid">
                    <label for="first_name">
                        First Name:
                        <input type ="text" id="first_name" name="first_name" placeholder="First name..." required></input>
                    </label>
                    <label for="last_name">
                        Last Name:
                        <input type ="text" id="last_name" name="last_name" placeholder="Last name..." required></input>
                    </label>
                    </div>
                    <label for="birth_date">
                        Birth date:
                        <input type="date" id="birth_date" name="birth_date">
                    </label>
                    <label for="telephone">
                        Telephone:
                        <input type ="tel" id="telephone" name="telephone" placeholder="Telephone..." oninput="checkTelephone()"></input>
                    </label>
                    <h2>Account data</h2>
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
                        <input type="file" id="profile_picture" name="profile_picture" accept="image/*" onchange="checkFormat()">
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

function checkSignUpEmail(){
    let email = document.querySelector("#email");
    if(!email.validity.valueMissing){
        if(email.validity.typeMismatch){
            showError(email,"Wrong mail format");
        } else {
            let formData = new FormData();
            formData.append('checkEmail',email);
            axios.post('validate.php',formData).then(response => {
                if(response.data["errorEmail"]){
                    showError(email,"Email already in use, try with another or log in");
                }
            });
        }
    } else {
        email.removeAttribute("aria-invalid");
    }
}

function checkTelephone(){
    let telephone = document.querySelector("#telephone");
    let regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{7})$/;
    if(!telephone.validity.valueMissing){
        if(!telephone.value.match(regex)){
            showError(telephone,"Wrong telephone number format, +XX XXX XXXXXXX expected");
        } else {
            setValid(telephone,true);
        }
    } else {
        telephone.removeAttribute("aria-invalid");
    } 
}

function checkUsername(){
    let username = document.querySelector("#username");
    let formData = new FormData();
    formData.append('checkUsername',username);
    axios.post('validate.php',formData).then(response => {
        if(response.data["errorUsername"]){
            showError(username,"Username already in use, try with another or log in");
        }
    });
}

function checkPassword(){
    let password = document.querySelector("#password");
    let confirm_password = document.querySelector("#confirm_password");
    let regex =  /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/
    if(!password.validity.valueMissing){
        if(!password.value.match(regex)){
            showError(password,"Wrong password format, should contain at least:\n- one digit\n- one upper case\n- one lower case\n- one special character - ?!@#$%^&*\/\\\nMin length: 8\nMax length: 30 ");
        } else {
            if(!confirm_password.validity.valueMissing){
                if(password.value != confirm_password.value){
                    showError(password,"The passwords don't match");
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
    let password = document.querySelector("#password");
    let confirm_password = document.querySelector("#confirm_password");
    if(!confirm_password.validity.valueMissing){
        if(!password.validity.valueMissing){
            if(password.value != confirm_password.value){
                showError(confirm_password,"The passwords don't match");
            } else {
                setValid(confirm_password,true);
            }
        }
    } else {
        confirm_password.removeAttribute("aria-invalid");
    }
}

function checkFormat(){
    let file = document.getElementById('profile_picture');
    let filePath = file.value;
    let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
                showError(file,"Wrong image extension, acceoted .jpg .jpeg .png .gif")
                file.value = '';
    } else {
        setValid(file,true);
    }
}



function checkSignUpForm(){
    errors = new Array();
    let email = document.getElementById('email');
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let birth_date = document.getElementById('birth_date');
    let telephone = document.getElementById('telephone');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    let profile_picture = document.getElementById('profile_picture');
    let notification = document.getElementById('notification');

    if(errors.length == 0){
        submitForm(email,first_name,last_name,birth_date,telephone,username,password,profile_picture,notification);
    }
}

function submitForm(email,first_name,last_name,birth_date,telephone,username,password,profile_picture,notification){
    let formData = new FormData();
    formData.append('email',email);
    formData.append('first_name',first_name);
    formData.append('last_name',last_name);
    formData.append('birth_date',birth_date);
    formData.append('telephone',telephone);
    formData.append('username',username);
    formData.append('password',password);
    formData.append('profile_picture',profile_picture);
    formData.append('notification',notification);
    axios.post('validate.php',formData).then(response => {

    });
}

const main = document.querySelector("main");
main.innerHTML = createSignUpForm();
document.querySelector("#email").focus();