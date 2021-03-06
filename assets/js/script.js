// DEFINE HTML ID ELEMENTS AS VARIABLES
var highScoreLinkEl = document.getElementById("high-score-link");
var timerEl = document.getElementById("timer");
var questionMainContainerEl = document.getElementById("question-main-container");
var questionContainerEl = document.getElementById("question-container");
var startQuizButtonEl = document.getElementById("start-quiz");
var questionsEl = document.getElementById("questions");
var answerButtons = document.getElementsByClassName('answer-button');
var responseEl = document.getElementById("response");
var scoreContainerEl = document.getElementById("score-container");
var playerInfoEl = document.getElementById("player-info");
var resultsContainerEl = document.getElementById("results-container");
var resultsEl = document.getElementById("results");
var questionTextEl = document.getElementById('question-text');
var mainHeaderEl = document.getElementById("main-header");
var submitPlayerEl = document.getElementById("submit-player");
var playerNameEl = document.getElementById("player-name");
var restartQuizButtonEl = document.getElementById("restart-quiz")
var clearQuizButtonEl = document.getElementById("clear-quiz")
var instructionTextEl = document.getElementById("instruction-text");
var noScoresToShow = document.getElementById("no-scores-to-show");

// CREATE TIME AND SCORE RELATED VARIABLES
let timer = 0;
let currentQuestion = 0
let score = 0;
let scoreArray = [];
let timerInterval = false;

// CREATE AN ARRAY THAT CONTAINS QUESTIONS, MULTIPLE CHOICE ANSWERS & CORRECT ANSWERS
let questions = [{
        theQuestion: "1. What is JavaScript?",
        answers: ["A font that's inspired by coffee.", "A client-side and server-side scripting language inserted into HTML pages and is understood by web browsers.", "An ancient language spoken by Mayans.", "A prescription for a common skin rash."],
        answer: "A client-side and server-side scripting language inserted into HTML pages and is understood by web browsers."
    },
    {
        theQuestion: "2. What is an example of JavaScript Data Types?",
        answers: ["String", "Number", "Boolean", "All of the above"],
        answer: "All of the above"
    },
    {
        theQuestion: "3. What does `var` commonly stand for?",
        answers: ["Variable", "Variety", "Varied Associative References", "Very Awkward Response"],
        answer: "Variable"
    },
    {
        theQuestion: "4. Which symbols are used for comments in Javascript?",
        answers: ["//", "**", "<!--", "!!"],
        answer: "//"
    },
    {
        theQuestion: "5. What are all the looping structures in JavaScript?",
        answers: ["for", "while", "Both for and while", "!important"],
        answer: "Both for and while"
    }
]; // end: questions array

// CREATE FUNCTION THAT FIRES OFF A COUNTDOWN
function countdown() {
    console.log("The countdown has begun.");
    // Countdown Timer
    timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = timer;

        // CONDITION: If the timer is 0, OR, you've reached the last question, do the following
        if (timer < 1 || currentQuestion === questions.length) {
            // Set timer to 0
            timerEl.textContent = 0;
            
            // clear out the remaining time
            clearInterval(timerInterval);

            //hide question container
            questionContainerEl.style.display = "none";

            //reveal results container
            resultsContainerEl.style.display = "block";

            // hide the questions text
            questionTextEl.style.display = "none";

            //hide the main title
            mainHeaderEl.style.display = "none";
        };

    }, 1000)
} // end: countdown()

// CREATE A FUNCTION TO START THE QUIZ
function startQuiz() {
    // set the timer for a minute
    timer = 60;
    timerEl.textContent = timer;
    countdown();
    // hide main title text
    mainHeaderEl.style.display = "none";
    // hide start quiz button
    startQuizButtonEl.style.display = "none";
    // hide instructions
    instructionTextEl.style.display = "none";
    // reveal questions
    showQuestions();
    // hide high scores
    scoreContainerEl.style.display = "none";
} //end: startQuiz()

// CREATE FUNCTION THAT SHOWS QUESTIONS
function showQuestions() {
    // show questions div
    questionContainerEl.style.display = 'block';
    // style the questions text
    questionTextEl.setAttribute('style', 'font-size:24px; font-weight:bold; color:#247BA0;');
    // populate questions
    questionTextEl.textContent = questions[currentQuestion].theQuestion;
    // populate multiple choice answers
    answerButtons[0].textContent = questions[currentQuestion].answers[0];
    answerButtons[1].textContent = questions[currentQuestion].answers[1];
    answerButtons[2].textContent = questions[currentQuestion].answers[2];
    answerButtons[3].textContent = questions[currentQuestion].answers[3];
    // run a loop that goes through the entire questions array and calls the checkAnswer function
    for (i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', checkAnswer);
    }
} // end: showQuestions()

// CREATE A FUNCTION THAT EXAMINES WHETHER THE SELECTED ANSWER IS CORRECT
function checkAnswer(event) {

    // CONDITION: Selected answer is correct, so a score of "1" gets added to the total score
    if (event.target.textContent === questions[currentQuestion].answer) {
        responseEl.style.display = 'block';
        responseEl.textContent = 'Correct!';
        currentQuestion++;
        score++;

        // hide the response element after 800 milliseconds
        setTimeout(function () {
            responseEl.style.display = 'none';
        }, 800);

        // stop question if it's the last game
        if (currentQuestion === questions.length) {
            stopQuiz();
        }
        // else go to next question
        else {
            showQuestions();
        }; // end: else

    } // end: if

    // CONDITION: Selected answer is incorrect, so no point is added
    else {
        responseEl.style.display = 'block';
        responseEl.textContent = 'Wrong!';
        currentQuestion++;

        // DEDUCT TIME: Remove 5 seconds from timer when the answer is wrong
        timer -= 5;

        // hide the response element after 800 milliseconds
        setTimeout(function () {
            responseEl.style.display = 'none';
        }, 800);

        // stop game if it's the last question
        if (currentQuestion === questions.length) {
            stopQuiz();
        }
        // stop game if it's the last question OR if the timer runs out
        else if (timer < 1 || currentQuestion === questions.length) {
            stopQuiz();
        }
        // if there's still time remaining, go to the next question
        else {
            showQuestions();
        };

    } // end: else
} // end: checkAnswer()

// CREATE A FUNCTION THAT STOPS THE QUIZ
function stopQuiz() {
    // hide all unecessary divs
    highScoreLinkEl.style.display = "none";
    questionContainerEl.style.display = "none";
    startQuizButtonEl.style.display = "none";
    questionTextEl.style.display = "none";
    mainHeaderEl.style.display = "none";

    // show the high score link
    highScoreLinkEl.style.display = "block";

    // if score is less than zero, make score zero rather than a negative number
    if (score <= 0) {
        score = 0;
    }
    // otherwise, show the actually sum of the score
    else {
        score = score;
    }

    // display the final score
    resultsEl.textContent = score;

    // set the timer back to zero
    timerEl.textContent = 0;

    // show high score link
    revealResults();

} // end: stopQuiz()

// CREATE FUNCTION THAT REVEALS RESULTS WHEN TIME IS UP OR QUESTIONS ARE COMPLETE
function revealResults(){    
    // show the results container
    resultsContainerEl.style.display = "block";

    // when user clicks submit, high score is revealed
    submitPlayerEl.addEventListener('click', showHighScores);
} // end: revealResults()

// CREATE A FUNCTION TO SHOW HIGH SCORES DIV AND ADD LI ELEMENTS BASED ON INPUT VALUE + # OF QUESTIONS ANSWERED CORRECTLY
function showHighScores() {
    
    // if user clicks button without entering name, do nothing
    if (playerNameEl.value.length === 0) {
        return;
    } // end: if

    // otherwise, if user has entered a name, do this
    else {        
        // hide the main question container
        questionMainContainerEl.style.display = "none";

        // show the score/leaderboard container
        scoreContainerEl.style.display = "block";

        // Use this globally created function for creating/concatenating player list items        
        scoreListLoop();
    } //end: else
} // end: showHighScores(event)

// CREATE A FUNCTION WHERE THE LIST LOOP IS CREATED SO IT CAN BE USED GLOBALLY
function scoreListLoop(){
    
    // Declare updateScore variable for later use.
    var updateScore;
    
    // Check to see if this is user's first time taking quiz, and if so... set scoreArray to empty array
    scoreArray = JSON.parse(localStorage.getItem('score')); 
    // This if statement is necessary so that it doesn't throw an error of "null" for the next if statement
    if (scoreArray === null){
        scoreArray = [];
    }
    // if no one has submitted a name, AND the score array is 0, then there's nothing to show
    if (playerNameEl.value === "" && scoreArray.length === 0) {
        noScoresToShow.style.display = "block";
        return
    }
    // otherwise, don't worry about the above if statement and continue with the rest of the logic
    else {
        noScoresToShow.style.display = "none";
    }
    // Defining how the loop should use the information to come...
    updateScore = {
        userName: playerNameEl.value.trim(),
        userScore: score    
    };

    // Debugging Test:
    console.log("scoreArray is" + scoreArray  + " at line 305");

    // Add this newly entered info
    scoreArray.push(updateScore);
    localStorage.setItem('score', JSON.stringify(scoreArray));

    // DISPLAY: Create list items
    for (i = 0; i < scoreArray.length; i++) {
        console.log("scoreArray is" + scoreArray  + " at line 313");
        // TODO: Scenario: User has played the game before, historical data is saved locally, HOWEVER, the else is still creating a list element with an empty string, and a value of 0. Continue to explore solution for this.
        if (playerNameEl.value === "" && scoreArray.length === 0) {
            noScoresToShow.style.display = "block";
            return
        }

        else {
            let score = scoreArray[i].userName + ' : ' + scoreArray[i].userScore;
            li = document.createElement('li');
            li.textContent = score;
            playerInfoEl.appendChild(li);
            // Debugging Test:
            console.log("scoreArray is" + scoreArray  + " at line 324");
        } //end: else
    } // end: for
}

// ******************************************************* 
// CREATE COLLECTION OF EVENT LISTENERS 
// ******************************************************* 

// ACTION: FIRE OFF QUIZ WHEN USER CLICKS "Start Quiz"
startQuizButtonEl.addEventListener('click', startQuiz);

// ACTION: Restart quiz by simply reloading the main page
restartQuizButtonEl.addEventListener('click', function() {
    location.href = 'index.html';
});

// ACTION: Clear out high scores from local storage
clearQuizButtonEl.addEventListener('click', function() {
    console.log("Score have been cleared");
    localStorage.clear();
    playerInfoEl.innerHTML = '';
});

// ACTION: See high scores/ Leaderboard
highScoreLinkEl.addEventListener('click', function() {
    // Fire off the function that creates player name and player score list items
    scoreListLoop();
    // Show score container
    scoreContainerEl.style.display = "block";
    // Show player info
    playerInfoEl.style.display = "block";  
    // Hide questions container
    questionMainContainerEl.style.display = "none";
});
