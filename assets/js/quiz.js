// ==========================
// SAMPLE QUESTIONS
// ==========================

const defaultQuestions = [

    {
        question:
            "Which language is used for structuring web pages?",

        options: [
            "HTML",
            "Python",
            "Java",
            "C++"
        ],

        answer: "HTML",

        image:
            ""
    },

    {
        question:
            "Which CSS property changes text color?",

        options: [
            "font-style",
            "background",
            "color",
            "text-align"
        ],

        answer: "color",

        image:
            ""
    },

    {
        question:
            "What does JS stand for?",

        options: [
            "JavaStructure",
            "JavaScript",
            "JustStyle",
            "JSONScript"
        ],

        answer: "JavaScript",

        image:
            ""
    },

    {
        question:
            "Which company developed Bootstrap?",

        options: [
            "Microsoft",
            "Google",
            "Twitter",
            "Facebook"
        ],

        answer: "Twitter",

        image:
            ""
    },

    {
        question:
            "Which tag is used for images in HTML?",

        options: [
            "<img>",
            "<image>",
            "<pic>",
            "<src>"
        ],

        answer: "<img>",

        image:
            ""
    }

];

let questions = [...defaultQuestions];

const sampleQuestionsUrl = "./data/sample-questions.json";

function safeParseJSON(value) {
    try {
        return JSON.parse(value);
    } catch (error) {
        return null;
    }
}

async function loadSampleQuestions() {
    const localQuestions =
        safeParseJSON(localStorage.getItem("quizQuestions")) || [];

    let fileQuestions = [];

    try {
        const response = await fetch(sampleQuestionsUrl);

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                fileQuestions = data;
            }
        } else {
            console.warn(`Sample questions not loaded: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.warn(`Could not fetch sample questions from ${sampleQuestionsUrl}:`, error);
    }

    if (fileQuestions.length > 0 || localQuestions.length > 0) {
        questions = [
            ...fileQuestions,
            ...localQuestions
        ];
    } else {
        questions = [...defaultQuestions];
    }
}


// ==========================
// VARIABLES
// ==========================

let currentQuestion = 0;

let score = 0;

let selectedAnswers = [];


// ==========================
// ELEMENTS
// ==========================

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const currentQuestionNumber =
    document.getElementById("currentQuestionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const quizProgress =
    document.getElementById("quizProgress");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

const questionImage =
    document.getElementById("questionImage");

const questionImageContainer =
    document.getElementById("questionImageContainer");

const quizUserName =
    document.getElementById("quizUserName");


// ==========================
// CURRENT USER
// ==========================

const currentUser =
    JSON.parse(localStorage.getItem("currentQuizUser"));

if (quizUserName && currentUser && currentUser.name) {

    quizUserName.textContent =
        currentUser.name;

} else if (quizUserName) {
    quizUserName.textContent = "Student";
}


// ==========================
// TOTAL
// ==========================

totalQuestions.textContent =
    questions.length;


// ==========================
// LOAD QUESTION
// ==========================

function loadQuestion() {

    if (!questions || questions.length === 0) {

        questionText.textContent =
            "No questions available.";

        optionsContainer.innerHTML = "";

        return;
    }

    const q = questions[currentQuestion];

    // QUESTION
    questionText.textContent =
        q.question || "Question missing";

    // TOTAL
    totalQuestions.textContent =
        questions.length;

    // NUMBER
    currentQuestionNumber.textContent =
        currentQuestion + 1;

    // PROGRESS
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    quizProgress.style.width =
        progress + "%";

    // IMAGE
    if (q.image) {

        questionImageContainer.classList.remove("d-none");

        questionImage.src = q.image;

    } else {

        questionImageContainer.classList.add("d-none");

    }

    // OPTIONS
    optionsContainer.innerHTML = "";

    if (Array.isArray(q.options)) {

        q.options.forEach((option, index) => {

            const isSelected =
                selectedAnswers[currentQuestion] === option;

            optionsContainer.innerHTML += `

                <div
                    class="option-card ${isSelected ? "active" : ""}"
                    onclick="selectAnswer('${option.replace(/'/g, "\\'")}')">

                    <div class="option-circle">
                        ${String.fromCharCode(65 + index)}
                    </div>

                    <div>
                        ${option}
                    </div>

                </div>

            `;
        });

    }

    // BUTTONS
    prevBtn.disabled =
        currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {

        nextBtn.innerHTML = `
            Submit Quiz
            <i class="bi bi-check-circle-fill"></i>
        `;

    } else {

        nextBtn.innerHTML = `
            Next
            <i class="bi bi-arrow-right"></i>
        `;
    }
}


// ==========================
// INIT QUIZ
// ==========================

async function initQuiz() {

    await loadSampleQuestions();

    console.log("Loaded Questions:", questions);

    if (!questions || questions.length === 0) {

        questionText.textContent =
            "No questions found.";

        return;
    }

    loadQuestion();
}

document.addEventListener(
    "DOMContentLoaded",
    initQuiz
);

// ==========================
// SELECT ANSWER
// ==========================

function selectAnswer(answer){

    selectedAnswers[currentQuestion] =
        answer;

    loadQuestion();

}


// ==========================
// NEXT BUTTON
// ==========================

nextBtn.addEventListener("click", () => {

    // LAST QUESTION
    if(currentQuestion === questions.length - 1){

        const modal =
            new bootstrap.Modal(
                document.getElementById("submitModal")
            );

        modal.show();

        return;
    }

    currentQuestion++;

    loadQuestion();

});


// ==========================
// PREVIOUS BUTTON
// ==========================

prevBtn.addEventListener("click", () => {

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});


// ==========================
// SUBMIT QUIZ
// ==========================

function submitQuiz(){

    // SCORE
    score = 0;

    questions.forEach((q, index) => {

        if(selectedAnswers[index] === q.answer){

            score++;

        }

    });

    // PERCENTAGE
    const percentage =
        Math.round((score / questions.length) * 100);

    // SAVE RESULT
    localStorage.setItem(
        "quizResult",
        JSON.stringify({
            score,
            total: questions.length,
            percentage
        })
    );

    // SAVE HISTORY
    let history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    history.push({

        email: currentUser.email,

        quiz: "General Quiz",

        score: percentage,

        date:
            new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );

    // REDIRECT
    window.location.href =
        "results.html";

}


// ==========================
// SUBMIT BUTTON
// ==========================

document
    .getElementById("submitQuizBtn")
    .addEventListener("click", submitQuiz);


// ==========================
// START
// ==========================

async function initQuiz() {
    await loadSampleQuestions();

    if (totalQuestions) {
        totalQuestions.textContent = questions.length;
    }

    loadQuestion();
}

document.addEventListener("DOMContentLoaded", initQuiz);