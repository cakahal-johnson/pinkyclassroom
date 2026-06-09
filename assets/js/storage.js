// ==========================
// CHECK LOGIN
// ==========================

const currentUser =
    JSON.parse(localStorage.getItem("currentQuizUser"));

if(!currentUser){

    window.location.href = "login.html";

}


// ==========================
// DISPLAY USER
// ==========================

const sidebarUserName =
    document.getElementById("sidebarUserName");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

if(sidebarUserName){

    sidebarUserName.textContent =
        currentUser.name;

}

if(profileName){

    profileName.textContent =
        currentUser.name;

}

if(profileEmail){

    profileEmail.textContent =
        currentUser.email;

}


// ==========================
// LOGOUT
// ==========================

const logoutBtn =
    document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        localStorage.removeItem("currentQuizUser");

        window.location.href =
            "login.html";

    });

}