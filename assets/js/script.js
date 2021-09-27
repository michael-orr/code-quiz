var start = document.querySelector('.start');
var startContainer = document.querySelector('.start-container');
var quizContainer = document.querySelector('.quiz-container');
var timeLeft = document.querySelector('.time-left');
var seconds = document.querySelector('.seconds');
var highScoresContainer = document.querySelector('.high-scores-container');
var quizContainer = document.querySelector('.quiz-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answers');
var timerEl = document.getElementById('seconds');
var score = document.querySelector('.score');


var questions = [
    {
        question: "Who was the 32nd President of the United States?",
        answers: [
            {text: "Franklin D Roosevelt", correct: true},
            {text: "John F Kennedy", correct: false},
            {text: "Harry Truman", correct: false},
            {text: "Calvin Coolidge", correct: false}
        ]
    },
    {
        question: "Who was the first European to set foot in San Diego?",
        answers: [
            {text: "Sebastiano Cortez", correct: false},
            {text: "Jose Alcala", correct: false},
            {text: "Juan Cabrillo", correct: true},
            {text: "Daniel Boone", correct: false}
        ]
    },
    {
        question: "Who is credited as the fist person to circumnavigate the world on a motorcycle?",
        answers: [
            {text: "Carl Stearns Clancy", correct: true},
            {text: "William Gerren", correct: false},
            {text: "Fernandino Cansiole", correct: false},
            {text: "Francis Baker", correct: false}
        ]
    },
    {
        question: "The San Diego Padres play in which division?",
        answers: [
            {text: "American League West", correct: false},
            {text: "National League West", correct: true},
            {text: "National League Central", correct: false},
            {text: "Pacific West Division", correct: false}
        ]
    },
    {
        question: "How many pounds are in a ton?",
        answers: [
            {text: "1,000", correct: false},
            {text: "2,000", correct: true},
            {text: "500", correct: false},
            {text: "10,000", correct: false}
        ]
    },
    {
        question: "What is the highest bridge in the world?",
        answers: [
            {text: "Duge Bridge", correct: true},
            {text: "Golden Gate Bridge", correct: false},
            {text: "Baluarte Bridge", correct: false},
            {text: "Royal Gorge Bridge", correct: false}
        ]
    },
    {
        question: 'Who wrote "Of Mice and Men"?',
        answers: [
            {text: "Ernest Hemingway", correct: false},
            {text: "Walt Whitman", correct: false},
            {text: "Dr Suess", correct: false},
            {text: "John Steinbeck", correct: true}
        ]
    },
    {
        question: 'Who is credited for inventing the printing press?',
        answers: [
            {text: "King Wilson", correct: false},
            {text: "Colonel Forbin", correct: false},
            {text: "Johannes Gutenberg", correct: true},
            {text: "Suzy Greenburg", correct: false}
        ]
    },
    {
        question: "What year was the cotton gin invented?",
        answers: [
            {text: "1793", correct: true},
            {text: "1826", correct: false},
            {text: "1801", correct: false},
            {text: "1772", correct: false}
        ]
    },
    {
        question: 'Who holds the NFL record for most touchdown passes in a single season?',
        answers: [
            {text: "Dan Marino", correct: false},
            {text: "Joe Montana", correct: false},
            {text: "John Elway", correct: false},
            {text: "Peyton Manning", correct: true}
        ]
    },
    {
        question: "Who was the last NASA astronaut to walk on the moon?",
        answers: [
            {text: "Eugene Cernan", correct: true},
            {text: "Neil Armstrong", correct: false},
            {text: "Buzz Aldrin", correct: false},
            {text: "Cliff Robertson", correct: false}
        ]
    }
];
var currentQuestionIndex = 0;
var correctAnswerIndex = 0;
var timeLeft = 59;



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
    highScoresContainer.classList.remove('hidden');
    stopTimer(); 
    score.innerText = timeLeft + 1; 
}

var timer = '';
function countdown() {
    timer = setInterval(function () {
      if (timeLeft <= 0) {
        gameOver();
        console.log(currentQuestionIndex);
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
        console.log(questions[currentQuestionIndex].answers[i].text);
        console.log(questions[currentQuestionIndex].answers[i].correct);
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
        console.log(questions[currentQuestionIndex].answers[i].text);
        console.log(questions[currentQuestionIndex].answers[i].correct);
        answerButton.addEventListener('click', answerQuestion);    
        if (questions[currentQuestionIndex].answers[i].correct === true) {
        answerButton.dataset.correct = true;
        correctAnswerIndex = i;
        };
    };
    currentQuestionIndex++;
}


function startQuiz() {
    countdown();
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    firstQuestion();
    if (timeLeft <= 0) {
        gameOver();
    }
}

start.addEventListener('click', startQuiz);



//start the quiz//--
//timer
//set next question
//show result message / colors//--
//evaulate if correct answers//--
//subtract time for incorrect answers
//end quiz when timer runs out.