function createLoginForm(){
    let form = `
        <article class="grid">
            <div>
            <hgroup>
                <h1>Log In</h1>
                <h2>Enter your email and password to access the website</h2>
            </hgroup>
            <form action="#" method="post" id="login_form">
                <label for="login_email">
                    Email:
                    <input type ="email" id="login_email" name="login_email" placeholder="Email" onblur="checkEmail()" required></input>
                </label>
                <label for="login_password">
                    Password:
                    <input type ="password" id="login_password" name="login_password" placeholder="Password" required></input>
                </label>
                <input type="button" name="login" value="Log In" onclick="checkLoginForm()"></input>
            </form>
            <p>Don't have an account? <a href="signup.php">Sign Up</a></p
            </div>
        </article>
    `;
    return form;
}

function checkEmail(){
    let email = document.querySelector("#login_email");
    if(email.validity.typeMismatch || email.validity.valueMissing){
        showError(email,"Wrong email format","login_email");
    } else {
        setValid(email);
    }
}

function checkLoginForm(){
    let email = document.querySelector("#login_email");
    let password = document.querySelector("#login_password");
    if(email.validity.valueMissing){
        showError(email,"Enter email","login_email");
        canSumbit = false;
    } else if(password.validity.valueMissing){
        showError(password,"Enter password","login_password");
        canSumbit = false;
    } else {
        let form = document.querySelector("#login_form");
        login(email.value,password.value);
    }
}

function login(email,password){
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    axios.post('authenticate.php', formData).then(response => {
        if (response.data["loggedIn"]) {
            window.location.replace("homepage.php");
        } else {
            if('errorEmail' in response.data){
                showError(document.querySelector("#login_email"),response.data["errorEmail"],"login_email");
            } else if('errorPassword' in response.data){
                setValid(document.querySelector("#login_email"));
                showError(document.querySelector("#login_password"),response.data["errorPassword"],"login_password");
            }
        }
    });
}

const main = document.querySelector("main");
axios.get('authenticate.php').then(response => {
    console.log(response);
    if (response.data["loggedIn"]) {
        window.location.replace("homepage.php");
    } else {
        main.innerHTML = createLoginForm();
        document.querySelector("#login_email").focus();
    }
});

