const main = document.querySelector('main');
main.innerHTML = createResetPasswordForm();

function createResetPasswordForm(){
    let reset = `
    <article class="grid">
        <div>
        <hgroup>
            <h1>Reset Password</h1>
            <h2>Insert your new password</h2>
        </hgroup>
        <div class="error_form" tabindex="-1" hidden></div>
        <form action="#" method="post" id="reset_password_form">
            <label for="password">
                Password:
                <input type="password" id="password" name="password" placeholder="Password" oninput="checkPassword()" required></input>
            </label>
            <label for="confirm_password">
                Confirm password:
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm password" oninput="checkConfirmPassword()" required></input>
            </label>
            <input type="button" id="reset_password" name="reset_password" value="Reset Password" onclick="checkResetPassword()"></input>
        </form>
        </div>
    </article>
    `;
    return reset;
}

function checkResetPassword(){
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');

    let errors = new Array();
    let err_element = new Array();

    if(password.validity.valueMissing || password.getAttribute('aria-invalid') === 'true'){
        errors.push("Password invalid/missing or password mismatch");
        err_element.push(password);
    }

    if(confirm_password.validity.valueMissing || confirm_password.getAttribute('aria-invalid') === 'true'){
        errors.push("Confirm invalid/password missing or password mismatch");
        err_element.push(confirm_password);
    }

    if(errors.length == 0){
        resetPassword(password.value,confirm_password.value);
    } else {
        err_element.forEach(element => {
            setValid(element,false);
        });
        let error_div = document.querySelector('div.error_form');
        error_div.innerHTML = `The following errors occurred:<ul>` + createError(errors);
        error_div.removeAttribute('hidden');
        error_div.focus();
    }
}

function resetPassword(password,confirm_password){
    let formData = new FormData();
    formData.append('password',password);
    formData.append('confirmPassword',confirm_password);
    axios.post('reset_password.php',formData).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== ""){
            error_div.innerHTML = response.data.errorMsg;
            error_div.style.setProperty("border-color", "#b71c1c", "important");
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else {
            error_div.innerHTML = 'Your password has been updated successfully';
            error_div.removeAttribute('hidden');
            error_div.style.setProperty("border-color", "#2e7d32", "important");
            error_div.focus();
            document.getElementById('reset_password').disabled = true;
        }
    });
}