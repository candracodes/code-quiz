/* 
    TODO: GET ASSISTANCE WITH THE FOLLOWING:
    1. The math for score isn't accurate; it's subtracting 1 additional point from the score
    2. After entering name and hitting submit, the score isn't accurate; there's still something subtracting an extra "1"
    3. Scores aren't being "stored" locally
*/

// TODO: DEFINE HTML ID ELEMENTS AS VARIABLES
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

// TODO: CREATE TIME AND SCORE RELATED VARIABLES
let timer = 0;
let currentQuestion = 0
let score = 0;
let scoreArray = [];
let timerInterval = false;

// TODO: CREATE ARRAY THAT CONTAINS QUESTIONS, MULTIPLE CHOICE ANSWERS & CORRECT ANSWERS
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

// TODO: INITIALIZE STORED SCORES ON PAGE LOAD (AS SEEN ON HOMEWORK)
// function init() {
//     getWins();
// }

// TODO: CREATE FUNCTION THAT OPERATES A COUNTDOWN
function countdown() {
    console.log("The countdown has begun.");
    // Countdown Timer
    timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = timer;

        // CONDITION: If the timer is 0, OR, you've reached the last question, do the following
        if (timer < 1 || currentQuestion === questions.length) {
            timerEl.textContent = 0;
            //endGame();
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

// TODO: CREATE A FUNCTION TO START THE QUIZ
function startQuiz() {
    console.log("The startQuiz function triggered.");
    // when the time calls, hide high scores with questionContainerEl.style.display = 'none';
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

// TODO: CREATE FUNCTION THAT SHOWS QUESTIONS
function showQuestions() {
    console.log("The showQuestions function has been triggered.");
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

// TODO: CREATE A FUNCTION THAT EXAMINES WHETHER THE SELECTED ANSWER IS CORRECT
function checkAnswer(event) {
    console.log("The checkAnswer function has been triggered.");

    // CONDITION: Selected answer is correct and a score of "1" gets added to the total score
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
            console.log("User answered question incorectly");
            stopQuiz();
        }
        // else go to next question
        else {
            showQuestions();
        }; // end: else

    } // end: if

    // CONDITION: Selected answer is incorrect and score decrements by 1 point
    else {
        responseEl.style.display = 'block';
        responseEl.textContent = 'Wrong!';
        currentQuestion++;
        // TODO: Keep the below commented area included for learning purposes. Also includes the reason why the logic doesn't work
        // I initially put this decrement here:
        // score--; 
        // ... thinking that it would do the OPPOSITE of the if statement, but it was causing a miscalculation.
        // What I now realize is... if it's wrong... then it simply doesn't give a point, no need to decrement

        // THIS remove 5 seconds from timer when the answer is wrong
        timer -= 5;

        // hide the response element after 800 milliseconds
        setTimeout(function () {
            responseEl.style.display = 'none';
        }, 800);

        // stop game if it's the last question
        if (currentQuestion === questions.length) {
            stopQuiz();
            console.log("User answered question incorectly");
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

// TODO: CREATE A FUNCTION THAT STOPS THE GAME
function stopQuiz() {
    console.log("Quiz has been stopped.");
    // hide all unecessary divs
    highScoreLinkEl.style.display = "none";
    questionContainerEl.style.display = "none";
    startQuizButtonEl.style.display = "none";
    questionTextEl.style.display = "none";
    mainHeaderEl.style.display = "none";

    // show the high score link
    highScoreLinkEl.style.display = "block";

    // if score is less than zero, make score zero rather than a negative number
    // NOTE: If I move this logic ABOVE resultsEl.textContent... it shows a HALF accurate result
    if (score <= 0) {
        score = 0;
    }
    else {
        score = score;
    }

    // display the final score
    resultsEl.textContent = score;

    // set the timer back to zero
    timerEl.textContent = 0;

    // TODO: Note... if I place lines 210 - 217 here instead... it results in the sum of all wrong answers being -5

    

    // show high score link
    revealResults();

} // end: stopQuiz()

// TODO: CREATE FUNCTION THAT REVEALS RESULTS WHEN TIME IS UP OR QUESTIONS ARE COMPLETE
function revealResults(){    
    // show the results container
    resultsContainerEl.style.display = "block";

    // when user clicks submit, high score is revealed
    submitPlayerEl.addEventListener('click', showHighScores);
} // end: revealResults()

// TODO: CREATE A FUNCTION TO SHOW HIGH SCORES DIV AND ADD LI ELEMENTS BASED ON INPUT VALUE + # OF QUESTIONS ANSWERED CORRECTLY
function showHighScores(event) {
    // TODO: When it's the first time playing the game, clicking the "View High Scores" link throws this error (Figure out why I'm receiving an error of Uncaught TypeError: Cannot read property 'preventDefault' of null at showHighScores).
    // TODO: Investigate why that error happens. 
    // stop the browser from leaving the page
    event.preventDefault();

    var updateScore;

    console.log("High Score Board is being revealed upon submission");
    
    // if user clicks button without entering name, do nothing
    if (playerNameEl.value.length === 0) {
        return;
    } // end: if
    // otherwise, if user has entered a name, do this
    else {
        console.log("User has entered their name");
        
        // hide the main question container
        questionMainContainerEl.style.display = "none";

        // show the score/leaderboard container
        scoreContainerEl.style.display = "block";

        // CREATE: A new variable is created based on the submitted info
        updateScore = {
            userName: playerNameEl.value.trim(),
            userScore: score
        };

        // HERE'S RYAN'S SUGGESTED COMMAND, BUT IT THROWS AN ERROR FOR scoreArray.push(updateScore):
        // scoreArray = JSON.parse(localStorage.getItem('score')); 
        
        // Add this newly entered info
        scoreArray.push(updateScore);
        // I feel like this logic isn't really achieving anything
        // scoreArray.sort((a, b) => b.userScore - a.userScore);
        localStorage.setItem('score', JSON.stringify(scoreArray));

        // DISPLAY: Create list items
        for (i = 0; i < scoreArray.length; i++) {
            let score = scoreArray[i].userName + ' : ' + scoreArray[i].userScore;
    
            li = document.createElement('li');
            li.textContent = score;
            playerInfoEl.appendChild(li);
        } // end: for
        

    } // end: else


} // end: showHighScores(event)


// TODO: CREATE COLLECTION OF EVENT LISTENERS

// ACTION: FIRE OFF QUIZ WHEN USER CLICKS THIS BUTTON
startQuizButtonEl.addEventListener('click', startQuiz);

// ACTION: Restart quiz by simply reloading the main page
restartQuizButtonEl.addEventListener('click', function() {
    location.href = 'index.html';
    // storedScores = JSON.parse(localStorage.getItem('score'));
});

// Doesn't work
// Calls initializer on page load
// init();

// ACTION: Clear out high scores from local storage
clearQuizButtonEl.addEventListener('click', function() {
    console.log("Score have been cleared");
    localStorage.clear();
    playerInfoEl.innerHTML = '';
});

// ACTION: See high scores/ Leaderboard
highScoreLinkEl.addEventListener('click', function() {
    // Show score container
    scoreContainerEl.style.display = "block";
    // Show player info
    playerInfoEl.style.display = "block";
    // Show stored player scores 
    // TODO: Figureout why this isn't working
    var storedScores = JSON.parse(localStorage.getItem('score'));
    showHighScores(storedScores);
});