function createLoginForm() {
  let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h2>Log In</h2>
                <small>Enter your email and password to access the website</small>
            </hgroup>
            <div class="error_form" tabindex="-1" hidden></div>
            <form action="#" method="post" id="login_form">
                <label for="login_email">
                    Email:
                    <input type="email" id="login_email" name="login_email" placeholder="Email" onblur="checkLoginEmail()" required></input>
                </label>
                <label for="login_password">
                    <div class="grid">
                      <div>
                        Password:
                      </div>
                      <div class="right_elem">
                      <a href="forgot_password.php" >Forgot password?</a>
                      </div>
                    </div>
                    <input type ="password" id="login_password" name="login_password" placeholder="Password" oninput="checkPassword()" required></input>
                </label>
                <label for="remember_me">
                  <input type="checkbox" id="remember_me" name="remember_me" role="switch">
                  Remember me
                </label>
                <input type="button" name="login" value="Log In" onclick="checkLoginForm()"></input>
            </form>
            <p class="center_elem">Don't have an account? <a href="signup.php">Sign Up</a></p>
            </div>
        </article>
    `;
  return form;
}

function clearForm(){
  let email = document.getElementById('login_email');
  let password = document.getElementById('login_password');
  email.removeAttribute("aria-invalid");
  password.removeAttribute("aria-invalid");
}

function checkLoginEmail() {
  let email = document.getElementById('login_email');
  if(!email.validity.valueMissing){
    if(!email.validity.typeMismatch){
      let formData = new FormData();
      formData.append('checkEmail',email.value);
      axios.post('authenticate.php',formData).then(response => {
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
          showError(email,response.data.errorMsg);
          setValid(email,false);
        } else if(response.data.valid === true) {
          setValid(email,true);
        }
      });
    } else {
      showError(email,"Invalid email format expected example@domain.com");
      setValid(email,false);
    }
  } else {
    email.removeAttribute("aria-invalid");
  }
}

function checkPassword(){
  let password = document.getElementById('login_password');
  password.removeAttribute("aria-invalid");
  password.setCustomValidity("");
}

function checkLoginForm() {
  let email = document.getElementById('login_email');
  let password = document.getElementById('login_password');
  if (email.validity.valueMissing || email.getAttribute("aria-invalid") === 'true') {
    showError(email, "Email required, enter valid email to continue");
    setValid(email,false);
  } else if (password.validity.valueMissing) {
    showError(password, "Password required, enter valid password to continue");
    setValid(password,false);
  } else {
    login(email,password);
  }
}

function login(email,password) {
  let remember_me = document.getElementById('remember_me');
  let formData = new FormData();
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('remember_me',remember_me.checked);
  axios.post('authenticate.php', formData).then(response => {
      let error_div = document.querySelector('div.error_form');
      if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
        clearForm();
        error_div.innerHTML = response.data.errorMsg;
        error_div.removeAttribute('hidden');
        error_div.focus();
        if(response.data.elemID !== "" && response.data.elemID !== undefined){
          setValid(document.getElementById(response.data.elemID),false);
        }
      } else if(response.data.loggedIn === true){
        window.location.replace('homepage.php');
      }
  });
}

const main = document.querySelector('main');
axios.get('authenticate.php').then(response => {
    main.innerHTML = createLoginForm();
    let email = document.getElementById('login_email');
    email.focus();
});
