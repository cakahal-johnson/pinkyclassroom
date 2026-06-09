// ==========================
// LOAD HISTORY
// ==========================

const recentHistoryTable =
    document.getElementById("recentHistoryTable");

if(recentHistoryTable){

    const history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    // FILTER USER HISTORY
    const currentUser =
        JSON.parse(localStorage.getItem("currentQuizUser"));

    const userHistory =
        history.filter(item =>
            item.email === currentUser.email
        );

    // STATS
    const totalQuizTaken =
        document.getElementById("totalQuizTaken");

    const highestScore =
        document.getElementById("highestScore");

    const averageScore =
        document.getElementById("averageScore");

    const studyTime =
        document.getElementById("studyTime");

    totalQuizTaken.textContent =
        userHistory.length;

    // HIGHEST
    let highest = 0;

    userHistory.forEach(item => {

        if(item.score > highest){

            highest = item.score;

        }

    });

    highestScore.textContent =
        highest + "%";

    // AVERAGE
    let total = 0;

    userHistory.forEach(item => {

        total += item.score;

    });

    let average =
        userHistory.length > 0
        ? Math.round(total / userHistory.length)
        : 0;

    averageScore.textContent =
        average + "%";

    // STUDY HOURS
    studyTime.textContent =
        (userHistory.length * 0.5).toFixed(1) + "h";

    // EMPTY
    if(userHistory.length === 0){

        recentHistoryTable.innerHTML = `
            <tr>
                <td colspan="4"
                    class="text-center text-muted py-4">
                    No quiz history available
                </td>
            </tr>
        `;

    }else{

        recentHistoryTable.innerHTML = "";

        // RECENT 5
        const recent =
            userHistory.slice(-5).reverse();

        recent.forEach(item => {

            recentHistoryTable.innerHTML += `

                <tr>

                    <td>
                        ${item.quiz || "General Quiz"}
                    </td>

                    <td>
                        <span class="fw-bold">
                            ${item.score}%
                        </span>
                    </td>

                    <td>
                        ${item.date}
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

                </tr>

            `;

        });

    }

}