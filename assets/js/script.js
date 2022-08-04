
var playerInput = document.querySelector("#player-text");
var lbr = document.querySelector("#lb");
var playerList = document.querySelector("#player-list");
var showScoresBtn = document.getElementById("show-scores");
//filling in quiz with data
const quiz = document.getElementById("quiz");
const answersEls = document.querySelectorAll(".answer");
const questionE1 = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var realMainEl = document.querySelector("main");

var userScores = JSON.parse(localStorage.getItem("players")) || [];

//quiz data objects
const quizData = [
    {
        question: "Commonly used data types DO NOT include:",
        a: 'strings',
        b: 'booleans',
        c: 'alerts',
        d: 'numbers',
        correct: 'b',
    }, {
        question: "The condition in an if / else statement is enclosed within...",
        a: 'quotes',
        b: 'curly brackets',
        c: 'parentheses',
        d: 'square brackets',
        correct: 'c',
    }, {
        question: "Arrays in JavaScript can be used to store...",
        a: 'numbers and strings',
        b: 'other arrays',
        c: 'booleans',
        d: 'all of the above',
        correct: 'd',
    }, {
        question: "String values must be enclosed within __ when being assigned to variables.",
        a: 'commas',
        b: 'curly brackets',
        c: 'quotes',
        d: 'parentheses',
        correct: 'c',
    }, {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        a: 'JavaScript',
        b: 'terminal / bash',
        c: 'for loops',
        d: 'console.log',
        correct: 'd',
    }
];

let currentQuiz = 0;
let score = 0;
var secondsLeft = 20;

function loadQuiz() {

    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionE1.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    const answersEls = document.querySelectorAll('.answer');
    let answer = undefined;

    answersEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answersEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function displayUserScores() {
    // empty out main element
    realMainEl.replaceChildren();
    realMainEl.innerText = "Saved scores are below:";

    for(let i = 0; i < userScores.length; i++) {
        const userDiv = document.createElement("div");
        userDiv.innerText = `User ${userScores[i].userName} scored ${userScores[i].userScore}.`
        userDiv.setAttribute("id", `saved-score-${i}`);
        userDiv.setAttribute("style", "background-color: orange; margin: 0.2em 0em");
        realMainEl.appendChild(userDiv);
    }

    let clearUserScoresBtn = document.createElement("button");
    clearUserScoresBtn.addEventListener("click", clearSavedScores);
    realMainEl.appendChild(clearUserScoresBtn);
}

function clearSavedScores () {
    localStorage.clear();
    realMainEl.replaceChildren();
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining";

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            timeEl.style.display = 'none';
            quiz.innerHTML = '<h2>Time is Up!</h2>';
            document.getElementById("score").innerHTML = "Final Score: " + score;
            leader()
        }

    }, 1000);
}

document.getElementById("1").onclick = function start() {
    document.getElementById(1).style.display = 'none';
    setTime();
    document.getElementById("quiz").style.visibility = "visible"
    loadQuiz();
}

function leader() {
    document.getElementById("lb").style.visibility = "visible";;
    showBoard();
}

function showBoard() {
    document.getElementById("lb").style.visibility = "visible";
    document.getElementById(1).style.display = 'none';
    document.getElementById(3).style.display = 'none';
}

function storePlayers(userName, userScore) {
    let userObject = {
        userName,
        userScore,
    }
    userScores.push(userObject);
    // Stringify and set key in localStorage to players array
    localStorage.setItem("players", JSON.stringify(userScores));
}

// Add submit event to form
lbr.addEventListener("submit", function (event) {
    event.preventDefault();

    var playerName = playerInput.value.trim();

    // Add new todoText to todos array, clear the input
    playerInput.textContent = "";

    // Store updated todos in localStorage, re-render the list
    storePlayers(playerName, score);
});

submitBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {

        if (answer === quizData[currentQuiz].correct) {
            score++;
            document.getElementById("score").innerHTML = "Current Score: " + score;
        } else {
            secondsLeft--;
            document.getElementById("score").innerHTML = "Current Score: " + score;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = '<h2>Fin!</h2>';
            timeEl.style.display = 'none';
            document.getElementById("score").innerHTML = "Final Score: " + score;
            leader()

        }
    }
});

showScoresBtn.addEventListener("click", displayUserScores); 

