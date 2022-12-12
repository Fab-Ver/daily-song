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
                        <input type ="email" id="email" name="email" placeholder="Email..." required></input>
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
                    <label for="telephone">
                        Telephone:
                        <input type ="tel" id="telephone" name="telephone" placeholder="Telephone..."></input>
                    </label>
                    <h2>Account data</h2>
                    <label for="username">
                        Username:
                        <input type ="text" id="username" name="username" placeholder="Username..." required></input>
                    </label>
                    <label for="password">
                        Password:
                        <input type ="password" id="password" name="password" placeholder="Password..." required></input>
                    </label>
                    <label for="confirmpassword">
                        Password:
                        <input type ="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password..." required></input>
                    </label>
                <input type="button" name="signup" value="Sign Up" onclick="checkSignUpForm()"></input>
            </form>
            <p>Already have an account? <a href="index.php">Log In</a></p
            </div>
        </article>
    `;
    return form;
}

function checkSignUpForm(){

}

const main = document.querySelector("main");
main.innerHTML = createSignUpForm();