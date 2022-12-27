function createLoginForm() {
  let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h1>Log In</h1>
                <h2>Enter your email and password to access the website</h2>
            </hgroup>
            <div class="error_form" tabindex="-1" hidden></div>
            <form action="#" method="post" id="login_form">
                <label for="login_email">
                    Email:
                    <input type="email" id="login_email" name="login_email" placeholder="Email" oninput="checkLoginEmail()" required></input>
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
                <input type="button" name="login" value="Log In" onclick="checkLoginForm()"></input>
            </form>
            <p class="center_elem">Don't have an account? <a href="signup.php">Sign Up</a></p>
            </div>
        </article>
    `;
  return form;
}

function checkLoginEmail() {
  let email = document.querySelector("#login_email");
  if(!email.validity.valueMissing){
    if(!email.validity.typeMismatch){
      let formData = new FormData();
      formData.append('checkEmail',email.value);
      axios.post('authenticate.php',formData).then(response => {
        if(response.data["errorEmail"]){
          showError(email,"Email doesn't exist, try again or sign up");
          setValid(email,false);
        } else {
          setValid(email,true);
        }
      });
    } else {
      showError(email,"Wrong mail format (example@domain.com)");
      setValid(email,false);
    }
  } else {
    email.removeAttribute("aria-invalid");
  }
}

function checkPassword(){
  let password = document.querySelector("#login_password");
  password.removeAttribute("aria-invalid");
  password.setCustomValidity("");
}

function checkLoginForm() {
  let email = document.querySelector("#login_email");
  let password = document.querySelector("#login_password");
  if (email.validity.valueMissing || email.getAttribute("aria-invalid") === 'true') {
    showError(email, "Enter valid email");
    setValid(email,false);
  } else if (password.validity.valueMissing) {
    showError(password, "Enter password to login");
    setValid(password,false);
  } else {
    login(email,password);
  }
}

function login(email,password) {
  let formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);
  axios.post("authenticate.php", formData).then((response) => {
    if (response.data["loggedIn"]) {
      window.location.replace("homepage.php");
    } else if (response.data["errorPassword"]) {
        showError(password,"Invalid password");
        setValid(password, false);
    } else if (response.data["checkBrute"]){
      let error_div = document.querySelector("div.error_form");
      error_div.innerHTML = `Too much failed login attempts, try later`;
      error_div.removeAttribute('hidden');
      error_div.focus();
    }
  });
}

const main = document.querySelector("main");
axios.get("authenticate.php").then((response) => {
  if (response.data["loggedIn"]) {
    window.location.replace("homepage.php");
  } else {
    main.innerHTML = createLoginForm();
    let email = document.querySelector("#login_email");
    email.focus();
  }
});
