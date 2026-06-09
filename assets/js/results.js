// ==========================
// GET RESULT
// ==========================

const result =
    JSON.parse(localStorage.getItem("quizResult"));


// ==========================
// CHECK RESULT
// ==========================

if(!result){

    window.location.href =
        "dashboard.html";

}


// ==========================
// ELEMENTS
// ==========================

const scorePercentage =
    document.getElementById("scorePercentage");

const correctAnswers =
    document.getElementById("correctAnswers");

const totalQuestionsResult =
    document.getElementById("totalQuestionsResult");

const wrongAnswers =
    document.getElementById("wrongAnswers");

const performanceText =
    document.getElementById("performanceText");

const resultProgressBar =
    document.getElementById("resultProgressBar");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const resultIcon =
    document.getElementById("resultIcon");


// ==========================
// DISPLAY RESULTS
// ==========================

scorePercentage.textContent =
    result.percentage + "%";

correctAnswers.textContent =
    result.score;

totalQuestionsResult.textContent =
    result.total;

wrongAnswers.textContent =
    result.total - result.score;

performanceText.textContent =
    result.percentage + "%";

resultProgressBar.style.width =
    result.percentage + "%";


// ==========================
// PERFORMANCE STYLE
// ==========================

if(result.percentage >= 80){

    // EXCELLENT
    resultTitle.textContent =
        "Outstanding Performance!";

    resultMessage.textContent =
        "Excellent work! You mastered this quiz.";

    resultProgressBar.classList.add("bg-success");

    resultIcon.style.background =
        "#d1fae5";

    resultIcon.style.color =
        "#059669";

    resultIcon.innerHTML = `
        <i class="bi bi-trophy-fill"></i>
    `;

}
else if(result.percentage >= 50){

    // GOOD
    resultTitle.textContent =
        "Good Job!";

    resultMessage.textContent =
        "Nice effort. Keep practicing to improve more.";

    resultProgressBar.classList.add("bg-warning");

    resultIcon.style.background =
        "#fef3c7";

    resultIcon.style.color =
        "#d97706";

    resultIcon.innerHTML = `
        <i class="bi bi-star-fill"></i>
    `;

}
else{

    // FAIL
    resultTitle.textContent =
        "Keep Practicing!";

    resultMessage.textContent =
        "You can do better next time. Try again.";

    resultProgressBar.classList.add("bg-danger");

    resultIcon.style.background =
        "#fee2e2";

    resultIcon.style.color =
        "#dc2626";

    resultIcon.innerHTML = `
        <i class="bi bi-emoji-frown-fill"></i>
    `;

}