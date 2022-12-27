const main = document.querySelector('main');
main.innerHTML = createForgotPasswordForm();

function createForgotPasswordForm(){
    let form = `
    <article class="grid">
        <div>
        <hgroup>
            <h1>Forgot Password</h1>
            <h2>An email will be sent to this email if an account is registered under it</h2>
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
    let email = document.querySelector("#email");
    if(!email.validity.valueMissing){
      if(!email.validity.typeMismatch){
        setValid(email,true);
      } else {
        showError(email,"Wrong mail format (example@domain.com)");
        setValid(email,false);
      }
    } else {
      email.removeAttribute("aria-invalid");
    }
}

function checkForm(){
    let email = document.querySelector("#email");
    if(email.validity.valueMissing || email.getAttribute("aria-invalid") === 'true'){
        showError(email, "Enter valid email");
        setValid(email,false);
    } else {
        submitForgotPassword();
    }
}   

async function submitForgotPassword(){
    let email = document.querySelector("#email");
    let formData = new FormData();
    formData.append('email',email.value);
    const res = await axios.post('api-forgot-password.php',formData).then(response => {
        let error_div = document.querySelector("div.error_form");
        if(response.data.serverError){
            error_div.innerHTML = "An undefined error occurred, try again";
            error_div.removeAttribute('hidden');
            error_div.focus
        }  else if(response.data.sent){
            error_div.innerHTML = "An email has been sent to you with instructions on how to reset your password.";
            error_div.removeAttribute('hidden');
            error_div.style.setProperty("border-color", "#2e7d32", "important");
            error_div.focus
        } else if(!response.data.sent){
            error_div.innerHTML = "Message could not be sent, try later";
            error_div.removeAttribute('hidden');
            error_div.focus
        }
    });
}