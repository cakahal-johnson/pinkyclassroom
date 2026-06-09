// ==========================
// CURRENT USER
// ==========================

const currentUser =
    JSON.parse(localStorage.getItem("currentQuizUser"));


// ==========================
// ELEMENTS
// ==========================

const settingsUserName =
    document.getElementById("settingsUserName");

const settingsUserEmail =
    document.getElementById("settingsUserEmail");

const quizTimerInput =
    document.getElementById("quizTimerInput");

const timerSettingsForm =
    document.getElementById("timerSettingsForm");

const timerAlert =
    document.getElementById("timerAlert");

const soundToggle =
    document.getElementById("soundToggle");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const autoNextToggle =
    document.getElementById("autoNextToggle");

const logoutSettingsBtn =
    document.getElementById("logoutSettingsBtn");

const clearDataBtn =
    document.getElementById("clearDataBtn");


// ==========================
// DISPLAY USER
// ==========================

settingsUserName.textContent =
    currentUser.name;

settingsUserEmail.textContent =
    currentUser.email;


// ==========================
// LOAD SAVED SETTINGS
// ==========================

// TIMER
const savedTimer =
    localStorage.getItem("quizTimer");

if(savedTimer){

    quizTimerInput.value =
        savedTimer;

}


// SOUND
const savedSound =
    localStorage.getItem("quizSound");

if(savedSound !== null){

    soundToggle.checked =
        savedSound === "true";

}


// DARK MODE
const savedDarkMode =
    localStorage.getItem("quizDarkMode");

if(savedDarkMode !== null){

    darkModeToggle.checked =
        savedDarkMode === "true";

    if(savedDarkMode === "true"){

        document.body.classList.add("dark-mode");

    }

}


// AUTO NEXT
const savedAutoNext =
    localStorage.getItem("quizAutoNext");

if(savedAutoNext !== null){

    autoNextToggle.checked =
        savedAutoNext === "true";

}


// ==========================
// SAVE TIMER
// ==========================

timerSettingsForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const timerValue =
            quizTimerInput.value;

        // VALIDATION
        if(timerValue < 1 || timerValue > 120){

            timerAlert.innerHTML = `
                <div class="alert alert-danger">
                    Timer must be between 1 and 120 minutes.
                </div>
            `;

            return;
        }

        // SAVE
        localStorage.setItem(
            "quizTimer",
            timerValue
        );

        timerAlert.innerHTML = `
            <div class="alert alert-success">
                Timer settings saved successfully.
            </div>
        `;

    }
);


// ==========================
// SOUND
// ==========================

soundToggle.addEventListener(
    "change",
    function(){

        localStorage.setItem(
            "quizSound",
            this.checked
        );

    }
);


// ==========================
// DARK MODE
// ==========================

darkModeToggle.addEventListener(
    "change",
    function(){

        localStorage.setItem(
            "quizDarkMode",
            this.checked
        );

        if(this.checked){

            document.body.classList.add("dark-mode");

        }else{

            document.body.classList.remove("dark-mode");

        }

    }
);


// ==========================
// AUTO NEXT
// ==========================

autoNextToggle.addEventListener(
    "change",
    function(){

        localStorage.setItem(
            "quizAutoNext",
            this.checked
        );

    }
);


// ==========================
// LOGOUT
// ==========================

logoutSettingsBtn.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        localStorage.removeItem(
            "currentQuizUser"
        );

        window.location.href =
            "login.html";

    }
);


// ==========================
// CLEAR QUIZ DATA
// ==========================

clearDataBtn.addEventListener(
    "click",
    function(){

        const confirmDelete =
            confirm(
                "Are you sure you want to clear your quiz history and results?"
            );

        if(!confirmDelete) return;

        // REMOVE HISTORY
        localStorage.removeItem(
            "quizHistory"
        );

        localStorage.removeItem(
            "quizResult"
        );

        alert(
            "Quiz data cleared successfully."
        );

    }
);