var start = document.querySelector('.start');
var startContainer = document.querySelector('.start-container');
var quizContainer = document.querySelector('.quiz-container');
var gameOverContainer = document.querySelector('.game-over-container');
var timeLeft = document.querySelector('.time-left');
var seconds = document.querySelector('.seconds');
var highScoresContainer = document.querySelector('.high-scores-container');
var quizContainer = document.querySelector('.quiz-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answers');
var timerEl = document.getElementById('seconds');
var score = document.querySelector('.score');
var playerNameInput = document.querySelector("#player");
var highScoreForm = document.getElementById('high-score-entry');
var scoreSheet = document.querySelector("#score-sheet");
var mostRecent = document.querySelector('#most-recent');
var highScoresButton = document.querySelector('.high-scores-button')
var restart = document.querySelector('.restart');
var reset = document.querySelector('.reset');
var highScoreEl = document.querySelector('#high-score');
var timerContainerEl = document.querySelector('.time-left');

var questions = [
    {
        question: "Which of the following is NOT a Javascript operator",
        answers: [
            {text: "+", correct: false},
            {text: "++", correct: false},
            {text: "_", correct: true},
            {text: "%", correct: false}
        ]
    },
    {
        question: "What is a container for storing data(values)?",
        answers: [
            {text: "Variable", correct: true},
            {text: "Data Type", correct: false},
            {text: "Operator", correct: false},
            {text: "Condition", correct: false}
        ]
    },
    {
        question: "What is the difference between single and double quotes in Javascript?",
        answers: [
            {text: "Single quotes are for strings and double quotes are for everything else.", correct: false},
            {text: "There is no difference.", correct: true},
            {text: "Double quotes do not exist in Javascript.", correct: false},
            {text: "Single quotes are for functions and double quotes are for strings.", correct: false}
        ]
    },
    {
        question: "How is commenting done in Javascipt?  (choose the best answer)",
        answers: [
            {text: "Comments start with $$ and go to the end of the line.", correct: false},
            {text: "Multiline comments start with /* and end with */.  Single line comments start with // and go to the end of the line.", correct: true},
            {text: "Comments start and end with ##", correct: false},
            {text: "Multiline comments start with /* and end with */.  Single line comments start with # and go to the end of the line.", correct: false}
        ]
    },
    {
        question: "Which Javascript function will use the browser's time zone and display a date as a full text string?",
        answers: [
            {text: "Date()", correct: true},
            {text: "Now()", correct: false},
            {text: "Minute()", correct: false},
            {text: "CurrentTime()", correct: false}
        ]
    },
    {
        question: 'Which Javascript function returns a random number between 0 (inclusive),  and 1 (exclusive)?',
        answers: [
            {text: "slice()", correct: false},
            {text: "split()", correct: false},
            {text: "push()", correct: false},
            {text: "Math.random()", correct: true}
        ]
    },
    {
        question: 'A Boolean data type can only take the values _________________.',
        answers: [
            {text: "string or number", correct: false},
            {text: "positive or negative", correct: false},
            {text: "true or false", correct: true},
            {text: "yes or no", correct: false}
        ]
    },
    {
        question: "Javscript was invented by ____________",
        answers: [
            {text: "Brendan Eich", correct: true},
            {text: "Harvey Pekar", correct: false},
            {text: "Bill Gates", correct: false},
            {text: "Stephen Hawkins", correct: false}
        ]
    },
    {
        question: 'JSON stands for ____________ ',
        answers: [
            {text: "Javascript Object Network", correct: false},
            {text: "Javascript Opeartional Nodes", correct: false},
            {text: "Javascript Output Network", correct: false},
            {text: "JavaScript Object Notation", correct: true}
        ]
    },
    {
        question: "The ______________ API interface allows web browser to make HTTP requests to web servers.",
        answers: [
            {text: "Fetch", correct: true},
            {text: "Object", correct: false},
            {text: "Conditional", correct: false},
            {text: "Variable", correct: false}
        ]
    }
];
var currentQuestionIndex = 0;
var correctAnswerIndex = 0;
var timeLeft = 59;
var lastScore = 0;
var highScoresList = JSON.parse(localStorage.getItem("highScoresList"));


function clearQuestion() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
    questionEl.innerText = "";
}

function stopTimer() {
    clearInterval(timer);
}

function gameOver () {
    quizContainer.classList.add('hidden');
    gameOverContainer.classList.remove('hidden');
    stopTimer(); 
    if (timeLeft <= 0) {
        score.innerText = 0; 
        lastScore = 0;
    } else {
        score.innerText = timeLeft + 1; 
        lastScore = timeLeft + 1;
    };
}

var timer = '';
function countdown() {
    timer = setInterval(function () {
      if (timeLeft <= 0) {
        gameOver();
        clearInterval(timer);
        timerEl.textContent = "0";
      } else {
        timerEl.textContent = timeLeft;
        timeLeft--;
      }
    }, 1000);
  }



function showQuestion() {
    if (currentQuestionIndex < (questions.length)) {
    questionEl.innerText = questions[currentQuestionIndex].question;
    for (i=0; i < 4; i++) {
        var answerButton = document.createElement('button');
        answerButton.classList.add('answer');
        answerButton.innerText = questions[currentQuestionIndex].answers[i].text;
        answerButtonsEl.appendChild(answerButton);
        answerButton.addEventListener('click', answerQuestion);  
        if (questions[currentQuestionIndex].answers[i].correct === true) {
        answerButton.dataset.correct = true;
        correctAnswerIndex = i;
        };
    };
    currentQuestionIndex++;
    } else {
        gameOver();
    };
}

function answerQuestion(event) {
    var selectedAnswer = event.target;
    var correct = selectedAnswer.dataset.correct;
    var highlights = Array.from(answerButtonsEl.children);  
    for (i = 0; i < highlights.length; i++) {
        setResultColors(highlights[i], highlights[i].dataset.correct);
        highlights[i].style.color="black";
        highlights[i].disabled = true;
    };
    if (!selectedAnswer.dataset.correct) {
        selectedAnswer.innerText = selectedAnswer.innerText + "  - WRONG ANSWER!!! -";
        selectedAnswer.classList.add('wrong');
        timeLeft = timeLeft - 10;
    } else {
        selectedAnswer.innerText = selectedAnswer.innerText + "  - YOU ARE CORRECT!!! -";
    };
    setTimeout(newQuestion, 400);
}

function setResultColors(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    };
    
}

function newQuestion() {
    clearQuestion();
    showQuestion();
}

function firstQuestion() {
    clearQuestion();
    questionEl.innerText = questions[currentQuestionIndex].question;
    for (i=0; i < 4; i++) {
        var answerButton = document.createElement('button');
        answerButton.classList.add('answer');
        answerButton.innerText = questions[currentQuestionIndex].answers[i].text;
        answerButtonsEl.appendChild(answerButton);
        answerButton.addEventListener('click', answerQuestion);    
        if (questions[currentQuestionIndex].answers[i].correct === true) {
        answerButton.dataset.correct = true;
        correctAnswerIndex = i;
        };
    };
    currentQuestionIndex++;
}


function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    timerContainerEl.classList.remove('hidden');
    countdown();
    restart.classList.add('hidden');
    reset.classList.add('hidden');
    startContainer.classList.add("hidden");
    highScoresButton.classList.add('hidden');
    gameOverContainer.classList.add("hidden");
    highScoresContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    firstQuestion();
    if (timeLeft <= 0) {
        gameOver();
    }
}


function renderLastScore() {
    var player = localStorage.getItem("player");
    var lastPlayersScore = localStorage.getItem("lastScore");
    if (!player) {
        return;
    };
    mostRecent.innerText = "Most Recent Score:   " + player + " - " + lastPlayersScore;
}

function renderHighScore() {
    var highScore = [];
    timerContainerEl.classList.add('hidden');
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    if (highScoresList.length > 0) {
    highScoresList.sort(function(a, b) {
        return b[1] - a[1];
      });
    highScore = highScoresList[0];
    highScoreEl.innerText = "High Score:   " + highScore[0] + " - " + highScore[1];
    } else {
        highScoresList = [];
    };
}

function clearScores() {
    var highScoresList = [];
    localStorage.setItem('highScoresList', JSON.stringify(highScoresList));
    renderScoresList();
}

function renderScoresList() {
    startContainer.classList.add('hidden');
    restart.classList.remove('hidden');
    reset.classList.remove('hidden');
    highScoresButton.classList.add('hidden');
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    // highScoresList.sort(function(a, b) {
    //     return b[1] - a[1];
    //   });
    highScoresContainer.classList.remove('hidden');
    gameOverContainer.classList.add('hidden');
    scoreSheet.innerText = '';
    if (highScoresList.length > 0) {
        for (i = 0; i < highScoresList.length; i++) {
            var highScoresListItem = document.createElement('h3');
            highScoresListItem.textContent = highScoresList[i][0] + " " + highScoresList[i][1];
            scoreSheet.appendChild(highScoresListItem);
        };
        renderHighScore();
    };
}

renderLastScore();
renderHighScore();

highScoresButton.addEventListener('click', renderScoresList);

start.addEventListener('click', startQuiz);

restart.addEventListener('click', startQuiz);

reset.addEventListener('click', clearScores);

highScoreForm.addEventListener("submit", function (event) {
    var player = document.querySelector("#player").value;
    var highScoresListItem = [player, lastScore];
    event.preventDefault();
    localStorage.setItem("player", player);
    localStorage.setItem("lastScore", lastScore);
    highScoresList.push(highScoresListItem);
    highScoresList.sort(function(a, b) {
        return b[1] - a[1];
      });
    if (highScoresList.length > 5) {
        highScoresList.pop();
    }
    localStorage.setItem('highScoresList', JSON.stringify(highScoresList));
    renderLastScore();
    renderScoresList();
    renderHighScore();
});


