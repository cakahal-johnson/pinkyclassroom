// ==========================
// ELEMENTS
// ==========================

const historyTableBody =
    document.getElementById("historyTableBody");

const historyTotalQuiz =
    document.getElementById("historyTotalQuiz");

const historyPassedQuiz =
    document.getElementById("historyPassedQuiz");

const historyFailedQuiz =
    document.getElementById("historyFailedQuiz");

const historyAverageScore =
    document.getElementById("historyAverageScore");

const totalRecords =
    document.getElementById("totalRecords");

const searchHistory =
    document.getElementById("searchHistory");

const filterStatus =
    document.getElementById("filterStatus");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


// ==========================
// CURRENT USER
// ==========================

const currentUser =
    JSON.parse(localStorage.getItem("currentQuizUser"));


// ==========================
// HISTORY DATA
// ==========================

let allHistory =
    JSON.parse(localStorage.getItem("quizHistory")) || [];

let userHistory =
    allHistory.filter(item =>
        item.email === currentUser.email
    );


// ==========================
// LOAD STATS
// ==========================

function loadStats(){

    historyTotalQuiz.textContent =
        userHistory.length;

    // PASSED
    const passed =
        userHistory.filter(item =>
            item.score >= 50
        ).length;

    historyPassedQuiz.textContent =
        passed;

    // FAILED
    const failed =
        userHistory.filter(item =>
            item.score < 50
        ).length;

    historyFailedQuiz.textContent =
        failed;

    // AVERAGE
    let total = 0;

    userHistory.forEach(item => {

        total += item.score;

    });

    const average =
        userHistory.length > 0
        ? Math.round(total / userHistory.length)
        : 0;

    historyAverageScore.textContent =
        average + "%";

}


// ==========================
// RENDER TABLE
// ==========================

function renderHistory(data){

    totalRecords.textContent =
        data.length;

    // EMPTY
    if(data.length === 0){

        historyTableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    class="text-center py-5 text-muted">

                    No history found

                </td>
            </tr>
        `;

        return;
    }

    historyTableBody.innerHTML = "";

    // LOOP
    data.reverse().forEach((item, index) => {

        historyTableBody.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>

                    <div class="fw-semibold">
                        ${item.quiz}
                    </div>

                </td>

                <td>

                    <span class="
                        score-badge
                        ${item.score >= 50
                            ? "score-success"
                            : "score-fail"}
                    ">

                        ${item.score}%

                    </span>

                </td>

                <td>

                    ${
                        item.score >= 50

                        ?

                        `<span class="badge bg-success">
                            Passed
                        </span>`

                        :

                        `<span class="badge bg-danger">
                            Failed
                        </span>`
                    }

                </td>

                <td>

                    ${item.date}

                </td>

                <td>

                    <button
                        class="action-btn btn btn-outline-primary">

                        <i class="bi bi-eye-fill"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}


// ==========================
// FILTER FUNCTION
// ==========================

function filterHistory(){

    const search =
        searchHistory.value.toLowerCase();

    const status =
        filterStatus.value;

    let filtered =
        [...userHistory];

    // SEARCH
    filtered = filtered.filter(item =>
        item.quiz.toLowerCase().includes(search)
    );

    // STATUS
    if(status === "passed"){

        filtered =
            filtered.filter(item =>
                item.score >= 50
            );

    }

    if(status === "failed"){

        filtered =
            filtered.filter(item =>
                item.score < 50
            );

    }

    renderHistory(filtered);

}


// ==========================
// EVENTS
// ==========================

searchHistory.addEventListener(
    "keyup",
    filterHistory
);

filterStatus.addEventListener(
    "change",
    filterHistory
);


// ==========================
// CLEAR HISTORY
// ==========================

clearHistoryBtn.addEventListener("click", () => {

    const confirmDelete =
        confirm(
            "Are you sure you want to clear your history?"
        );

    if(!confirmDelete) return;

    // REMOVE USER HISTORY
    allHistory =
        allHistory.filter(item =>
            item.email !== currentUser.email
        );

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(allHistory)
    );

    userHistory = [];

    loadStats();

    renderHistory(userHistory);

});


// ==========================
// INIT
// ==========================

loadStats();

renderHistory(userHistory);