const main = document.querySelector('main');
main.innerHTML = createForgotPasswordForm();

function createForgotPasswordForm(){
    let form = `
    <article class="grid">
        <div>
        <hgroup>
            <h1>Forgot Password</h1>
            <h2>An email will be sent to the specified address if an account is registered under it</h2>
        </hgroup>
        <div class="error_form" tabindex="-1" hidden></div>
        <form action="#" method="post" id="forgot_password_form">
            <label for="email">
                Email:
                <input type="email" id="email" name="email" placeholder="Email" onblur="checkEmail()" required></input>
            </label>
            <input type="button" name="send_link" value="Send Link" onclick="checkForm()"></input>
        </form>
        <p class="center_elem">Already have an account? <a href="index.php">Log In</a></p>
        <p class="center_elem">Don't have an account? <a href="signup.php">Sign Up</a></p>
        </div>
    </article>
    `;
    return form;
}

function checkEmail() {
    let email = document.getElementById('email');
    if(!email.validity.valueMissing){
      if(!email.validity.typeMismatch){
        setValid(email,true);
      } else {
        showError(email,"Invalid email format expected example@domain.com");
        setValid(email,false);
      }
    } else {
      email.removeAttribute("aria-invalid");
    }
}

function checkForm(){
    let email = document.getElementById('email');
    if(email.validity.valueMissing || email.getAttribute("aria-invalid") === 'true'){
        showError(email, "Email required, enter valid email to continue");
        setValid(email,false);
    } else {
        submitForgotPassword();
    }
}   

function submitForgotPassword(){
    let email = document.getElementById('email');
    let formData = new FormData();
    formData.append('email',email.value);
    axios.post('api-forgot-password.php',formData).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if(response.data.sent === true){
            error_div.innerHTML = "An email has been sent to you with instructions on how to reset your password.";
            error_div.removeAttribute('hidden');
            error_div.style.setProperty("border-color", "#2e7d32", "important");
            error_div.focus();
        }
    });
}