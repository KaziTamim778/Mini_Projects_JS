const questionElement = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const feedbackElement = document.getElementById("feedback-text");
const scoreElement = document.getElementById("score-text");
const progressText = document.getElementById("progress-text"); 

const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");


const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");
const finalScoreElement = document.getElementById("final-score");

const quizData = [
    { question: "What is the capital of Japan?", answer: "tokyo" },
    { question: "What is 5 + 7?", answer: "12" },
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "What is the chemical symbol for water?", answer: "h2o" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "harper lee" },
    { question: "What is the speed of light in vacuum?", answer: "299792458 m/s" },
    { question: "What is the smallest prime number?", answer: "2" },
    { question: "Who painted the Mona Lisa?", answer: "leonardo da vinci" },
    { question: "What is the currency of the United States?", answer: "dollar" },
    { question: "What is the largest mammal?", answer: "blue whale" }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answerInput.value = "";
        feedbackElement.textContent = "";
        feedbackElement.className = "feedback"; 
        progressText.textContent = `Question ${currentQuestionIndex + 1} / 10`;
        submitBtn.disabled = false;
    } else {
        quizArea.classList.add("hidden");
        resultArea.classList.remove("hidden");
        finalScoreElement.textContent = `You scored ${score} out of 10.`;
    }
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizData[currentQuestionIndex].answer; 

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Correct! 🎉";
        feedbackElement.classList.add("correct");
        score++;
    } else {
        feedbackElement.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
        feedbackElement.classList.add("wrong");
    }
}

function submitAnswer() {
    submitBtn.disabled = true; 
    checkAnswer();
    scoreElement.textContent = `Score: ${score}`;
    currentQuestionIndex++;
    setTimeout(loadQuestion, 2000); 
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: 0`;
    resultArea.classList.add("hidden");
    quizArea.classList.remove("hidden");
    loadQuestion();
}

submitBtn.addEventListener("click", submitAnswer);
restartBtn.addEventListener("click", restartGame);


answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !submitBtn.disabled) {
        submitAnswer();
    }
});

loadQuestion();