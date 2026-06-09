// ==========================
// QUIZ TIMER
// ==========================

let quizTime =
    localStorage.getItem("quizTimer") || 10;

let totalSeconds =
    quizTime * 60;

const timerElement =
    document.getElementById("timer");


// ==========================
// FORMAT TIME
// ==========================

function formatTime(seconds){

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return `
        ${String(minutes).padStart(2, "0")}
        :
        ${String(secs).padStart(2, "0")}
    `.replace(/\s/g,'');

}


// ==========================
// START TIMER
// ==========================

const timerInterval =
    setInterval(() => {

        totalSeconds--;

        timerElement.textContent =
            formatTime(totalSeconds);

        // TIME UP
        if(totalSeconds <= 0){

            clearInterval(timerInterval);

            alert("Time is up! Quiz will be submitted.");

            submitQuiz();

        }

    }, 1000);