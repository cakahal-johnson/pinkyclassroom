// ==========================
// TOGGLE PASSWORD
// ==========================

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const passwordInput =
            document.getElementById("loginPassword");

        const icon =
            togglePassword.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("bi-eye-slash-fill");
            icon.classList.add("bi-eye-fill");

        }

    });

}


// ==========================
// TOGGLE SIGNUP PASSWORD
// ==========================

const toggleSignupPassword =
    document.getElementById("toggleSignupPassword");

if (toggleSignupPassword) {

    toggleSignupPassword.addEventListener("click", () => {

        const passwordInput =
            document.getElementById("signupPassword");

        const icon =
            toggleSignupPassword.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("bi-eye-slash-fill");
            icon.classList.add("bi-eye-fill");

        }

    });

}


// ==========================
// SIGNUP
// ==========================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
            document.getElementById("signupName").value;

        const email =
            document.getElementById("signupEmail").value;

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("signupConfirmPassword").value;

        const alertBox =
            document.getElementById("signupAlert");

        // VALIDATION
        if(password.length < 6){

            alertBox.innerHTML = `
                <div class="alert alert-danger">
                    Password must be at least 6 characters.
                </div>
            `;

            return;
        }

        if(password !== confirmPassword){

            alertBox.innerHTML = `
                <div class="alert alert-danger">
                    Passwords do not match.
                </div>
            `;

            return;
        }

        // GET USERS
        let users =
            JSON.parse(localStorage.getItem("quizUsers")) || [];

        // CHECK EXISTING
        const existingUser =
            users.find(user => user.email === email);

        if(existingUser){

            alertBox.innerHTML = `
                <div class="alert alert-warning">
                    User already exists.
                </div>
            `;

            return;
        }

        // SAVE USER
        users.push({
            name,
            email,
            password
        });

        localStorage.setItem(
            "quizUsers",
            JSON.stringify(users)
        );

        alertBox.innerHTML = `
            <div class="alert alert-success">
                Account created successfully.
            </div>
        `;

        signupForm.reset();

        // REDIRECT
        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    });

}


// ==========================
// LOGIN
// ==========================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const alertBox =
            document.getElementById("loginAlert");

        // USERS
        let users =
            JSON.parse(localStorage.getItem("quizUsers")) || [];

        // FIND USER
        const user =
            users.find(user =>
                user.email === email &&
                user.password === password
            );

        if(!user){

            alertBox.innerHTML = `
                <div class="alert alert-danger">
                    Invalid email or password.
                </div>
            `;

            return;
        }

        // STORE CURRENT USER
        localStorage.setItem(
            "currentQuizUser",
            JSON.stringify(user)
        );

        alertBox.innerHTML = `
            <div class="alert alert-success">
                Login successful...
            </div>
        `;

        // REDIRECT
        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1200);

    });

}