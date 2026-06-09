// ==========================
// FLASHCARD DATA
// LATER ADMIN WILL MANAGE
// ==========================

const flashcards = [

    {
        question:
            "What does HTML stand for?",

        answer:
            "HyperText Markup Language"
    },

    {
        question:
            "Which CSS property changes text color?",

        answer:
            "The 'color' property"
    },

    {
        question:
            "What does JS mean?",

        answer:
            "JavaScript"
    },

    {
        question:
            "Which tag displays images in HTML?",

        answer:
            "<img>"
    },

    {
        question:
            "Which company created Bootstrap?",

        answer:
            "Twitter"
    }

];


// ==========================
// VARIABLES
// ==========================

let currentCard = 0;

let reviewed = 0;


// ==========================
// ELEMENTS
// ==========================

const flashcard =
    document.getElementById("flashcard");

const flashQuestion =
    document.getElementById("flashQuestion");

const flashAnswer =
    document.getElementById("flashAnswer");

const currentFlashcard =
    document.getElementById("currentFlashcard");

const flashcardCount =
    document.getElementById("flashcardCount");

const totalFlashcards =
    document.getElementById("totalFlashcards");

const reviewedCards =
    document.getElementById("reviewedCards");

const remainingCards =
    document.getElementById("remainingCards");

const prevFlashcard =
    document.getElementById("prevFlashcard");

const nextFlashcard =
    document.getElementById("nextFlashcard");

const markKnownBtn =
    document.getElementById("markKnownBtn");

const markReviewBtn =
    document.getElementById("markReviewBtn");


// ==========================
// TOTALS
// ==========================

flashcardCount.textContent =
    flashcards.length;

totalFlashcards.textContent =
    flashcards.length;


// ==========================
// LOAD CARD
// ==========================

function loadFlashcard(){

    const card =
        flashcards[currentCard];

    flashQuestion.textContent =
        card.question;

    flashAnswer.textContent =
        card.answer;

    currentFlashcard.textContent =
        currentCard + 1;

    remainingCards.textContent =
        flashcards.length - reviewed;

    // RESET FLIP
    flashcard.classList.remove("flipped");

}


// ==========================
// FLIP CARD
// ==========================

flashcard.addEventListener("click", () => {

    flashcard.classList.toggle("flipped");

});


// ==========================
// NEXT
// ==========================

nextFlashcard.addEventListener("click", () => {

    if(currentCard < flashcards.length - 1){

        currentCard++;

        loadFlashcard();

    }

});


// ==========================
// PREVIOUS
// ==========================

prevFlashcard.addEventListener("click", () => {

    if(currentCard > 0){

        currentCard--;

        loadFlashcard();

    }

});


// ==========================
// MARK KNOWN
// ==========================

markKnownBtn.addEventListener("click", () => {

    reviewed++;

    reviewedCards.textContent =
        reviewed;

    remainingCards.textContent =
        flashcards.length - reviewed;

});


// ==========================
// REVIEW AGAIN
// ==========================

markReviewBtn.addEventListener("click", () => {

    alert(
        "This flashcard has been marked for review."
    );

});


// ==========================
// INIT
// ==========================

loadFlashcard();