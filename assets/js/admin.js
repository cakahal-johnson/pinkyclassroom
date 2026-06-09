// assets/js/admin.js

// ========================================
// ADMIN AUTHENTICATION
// ========================================

// Auto-protect admin pages
(function () {

    const isLoggedIn = localStorage.getItem("quizAdminLoggedIn");

    if (!isLoggedIn && window.location.pathname.includes("/admin/")) {
        window.location.href = "./admin-login.html";
    }

})();


// ========================================
// LOGOUT (FIXED)
// ========================================

function adminLogout() {

    localStorage.removeItem("quizAdminLoggedIn");
    localStorage.removeItem("quizAdminEmail");

    // ALWAYS safe from any admin page
    window.location.href = "admin-login.html";
}

// Auto protect admin pages
// (function () {

//     const isLoggedIn = localStorage.getItem("quizAdminLoggedIn");

//     if (!isLoggedIn && window.location.pathname.includes("/admin/")) {
//         window.location.href = "./admin-login.html";
//     }

// })();

// ========================================
// GET LOCAL STORAGE DATA
// ========================================

function getQuestions() {

    return JSON.parse(
        localStorage.getItem("quizQuestions")
    ) || [];

}

function getFlashcards() {

    return JSON.parse(
        localStorage.getItem("quizFlashcards")
    ) || [];

}

function getUsers() {

    return JSON.parse(
        localStorage.getItem("quizUsers")
    ) || [];

}

function getQuizHistory() {

    return JSON.parse(
        localStorage.getItem("quizHistory")
    ) || [];

}

// ========================================
// SAVE USERS
// ========================================

function saveUsers(users) {

    localStorage.setItem(
        "quizUsers",
        JSON.stringify(users)
    );

}

// ========================================
// DASHBOARD STATS
// ========================================

function loadDashboardStats() {

    const questions = getQuestions();
    const flashcards = getFlashcards();
    const users = getUsers();
    const history = getQuizHistory();

    // Questions
    const totalQuestions =
        document.getElementById("totalQuestions");

    if (totalQuestions) {

        totalQuestions.textContent =
            questions.length;

    }

    // Flashcards
    const totalFlashcards =
        document.getElementById("totalFlashcards");

    if (totalFlashcards) {

        totalFlashcards.textContent =
            flashcards.length;

    }

    // Users
    const totalUsers =
        document.getElementById("totalUsers");

    if (totalUsers) {

        totalUsers.textContent =
            users.length;

    }

    // Attempts
    const quizAttempts =
        document.getElementById("quizAttempts");

    if (quizAttempts) {

        quizAttempts.textContent =
            history.length;

    }

}

// ========================================
// LOAD ADMIN EMAIL
// ========================================

function loadAdminEmail() {

    const adminEmail =
        localStorage.getItem("quizAdminEmail");

    const adminName =
        document.getElementById("adminName");

    if (adminEmail && adminName) {

        adminName.textContent =
            adminEmail;

    }

}

// ========================================
// USER CRUD MANAGEMENT
// ========================================

function renderUsersTable() {

    const usersTableBody =
        document.getElementById("usersTableBody");

    if (!usersTableBody) return;

    const users = getUsers();

    usersTableBody.innerHTML = "";

    // Empty State
    if (users.length === 0) {

        usersTableBody.innerHTML = `
            <tr>

                <td colspan="8"
                    class="text-center py-5">

                    <i class="bi bi-people display-5 text-muted"></i>

                    <h5 class="mt-3">
                        No Registered Users
                    </h5>

                    <p class="text-muted">
                        Users will appear here after signup.
                    </p>

                </td>

            </tr>
        `;

        return;

    }

    // Render Users
    users.forEach((user, index) => {

        usersTableBody.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>

                    <div class="fw-semibold">
                        ${user.name || "N/A"}
                    </div>

                </td>

                <td>
                    ${user.email || "N/A"}
                </td>

                <td>
                    ${user.phone || "-"}
                </td>

                <td>

                    <span class="badge
                        ${
                            user.status === "Blocked"
                            ? "bg-danger"
                            : "bg-success"
                        }">

                        ${user.status || "Active"}

                    </span>

                </td>

                <td>
                    ${user.createdAt || "-"}
                </td>

                <td>

                    <span class="badge bg-primary">
                        ${user.role || "Student"}
                    </span>

                </td>

                <td>

                    <div class="d-flex gap-2">

                        <!-- View -->
                        <button class="btn btn-sm btn-info text-white"
                                onclick="viewUser(${index})">

                            <i class="bi bi-eye"></i>

                        </button>

                        <!-- Edit -->
                        <button class="btn btn-sm btn-warning"
                                onclick="editUser(${index})">

                            <i class="bi bi-pencil"></i>

                        </button>

                        <!-- Toggle -->
                        <button class="btn btn-sm
                            ${
                                user.status === "Blocked"
                                ? "btn-success"
                                : "btn-secondary"
                            }"
                                onclick="toggleUserStatus(${index})">

                            <i class="bi
                                ${
                                    user.status === "Blocked"
                                    ? "bi-unlock"
                                    : "bi-lock"
                                }"></i>

                        </button>

                        <!-- Delete -->
                        <button class="btn btn-sm btn-danger"
                                onclick="deleteUser(${index})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

// ========================================
// VIEW USER
// ========================================

function viewUser(index) {

    const users = getUsers();

    const user = users[index];

    if (!user) return;

    const modalContent =
        document.getElementById("userModalContent");

    if (!modalContent) return;

    modalContent.innerHTML = `

        <div class="text-center mb-4">

            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                 style="width: 90px; height: 90px;">

                <i class="bi bi-person-fill fs-1"></i>

            </div>

        </div>

        <div class="row g-4">

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Full Name
                    </small>

                    <strong>
                        ${user.name || "-"}
                    </strong>

                </div>

            </div>

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Email Address
                    </small>

                    <strong>
                        ${user.email || "-"}
                    </strong>

                </div>

            </div>

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Phone Number
                    </small>

                    <strong>
                        ${user.phone || "-"}
                    </strong>

                </div>

            </div>

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Status
                    </small>

                    <strong>
                        ${user.status || "Active"}
                    </strong>

                </div>

            </div>

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Role
                    </small>

                    <strong>
                        ${user.role || "Student"}
                    </strong>

                </div>

            </div>

            <div class="col-md-6">

                <div class="border rounded-4 p-3">

                    <small class="text-muted d-block">
                        Joined Date
                    </small>

                    <strong>
                        ${user.createdAt || "-"}
                    </strong>

                </div>

            </div>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById("userModal")
    ).show();

}

// ========================================
// EDIT USER
// ========================================

function editUser(index) {

    const users = getUsers();

    const user = users[index];

    if (!user) return;

    const newName =
        prompt(
            "Edit User Name:",
            user.name
        );

    if (newName === null) return;

    const newPhone =
        prompt(
            "Edit Phone Number:",
            user.phone || ""
        );

    user.name = newName;
    user.phone = newPhone;

    users[index] = user;

    saveUsers(users);

    renderUsersTable();

    showAdminAlert(
        "User updated successfully.",
        "success"
    );

}

// ========================================
// DELETE USER
// ========================================

function deleteUser(index) {

    const users = getUsers();

    const user = users[index];

    const confirmDelete =
        confirm(
            `Delete ${user.name}?`
        );

    if (!confirmDelete) return;

    users.splice(index, 1);

    saveUsers(users);

    renderUsersTable();

    showAdminAlert(
        "User deleted successfully.",
        "success"
    );

}

// ========================================
// BLOCK / UNBLOCK USER
// ========================================

function toggleUserStatus(index) {

    const users = getUsers();

    const user = users[index];

    user.status =
        user.status === "Blocked"
        ? "Active"
        : "Blocked";

    users[index] = user;

    saveUsers(users);

    renderUsersTable();

    showAdminAlert(
        `User status changed to ${user.status}.`,
        "warning"
    );

}

// ========================================
// SEARCH USERS
// ========================================

function searchUsers() {

    const users = getUsers();

    const searchInput =
        document.getElementById("searchUsers");

    const usersTableBody =
        document.getElementById("usersTableBody");

    if (!searchInput || !usersTableBody) return;

    const search =
        searchInput.value.toLowerCase();

    const filtered =
        users.filter(user => {

            return (

                user.name
                    ?.toLowerCase()
                    .includes(search)

                ||

                user.email
                    ?.toLowerCase()
                    .includes(search)

            );

        });

    usersTableBody.innerHTML = "";

    filtered.forEach((user, index) => {

        usersTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${user.name}</td>

                <td>${user.email}</td>

                <td>${user.phone || "-"}</td>

                <td>
                    <span class="badge
                        ${
                            user.status === "Blocked"
                            ? "bg-danger"
                            : "bg-success"
                        }">

                        ${user.status || "Active"}

                    </span>
                </td>

                <td>${user.createdAt || "-"}</td>

                <td>
                    ${user.role || "Student"}
                </td>

                <td>

                    <div class="d-flex gap-2">

                        <button class="btn btn-sm btn-info text-white"
                                onclick="viewUser(${index})">

                            <i class="bi bi-eye"></i>

                        </button>

                        <button class="btn btn-sm btn-warning"
                                onclick="editUser(${index})">

                            <i class="bi bi-pencil"></i>

                        </button>

                        <button class="btn btn-sm btn-danger"
                                onclick="deleteUser(${index})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

// ========================================
// ALERT HELPER
// ========================================

function showAdminAlert(message, type = "success") {

    const alertBox =
        document.getElementById("adminAlert");

    if (!alertBox) return;

    alertBox.innerHTML = `

        <div class="alert alert-${type} alert-dismissible fade show">

            <i class="bi bi-check-circle-fill me-2"></i>

            ${message}

            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"></button>

        </div>

    `;

}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboardStats();

        loadAdminEmail();

        renderUsersTable();

        // Logout Button
        const logoutBtn =
            document.getElementById("logoutBtn");

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                adminLogout
            );

        }

        // Search Users
        const searchUsersInput =
            document.getElementById("searchUsers");

        if (searchUsersInput) {

            searchUsersInput.addEventListener(
                "input",
                searchUsers
            );

        }

    }
);