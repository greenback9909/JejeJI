document.addEventListener("DOMContentLoaded", function () {
    const choicesContainers = document.querySelectorAll(".choice-container");
    const choiceText = document.querySelectorAll(".choice-text");
    const question = document.getElementById("question");
    const questionCountertext = document.getElementById('questionCounter');
    const scoretext = document.getElementById('score');
    let currentQuestion = {};
    let acceptingAnswers = true;
    let score = 0;
    let availableQuesions = [];
    const button = document.getElementById("button_next");

    const questions = [
        {
            question: "რომელ წელს გავიდა ლუკა ბაქო მაჯორზე?",
            choice1: "2015",
            choice2: "2014",
            choice3: "2013",
            choice4: "2016",
            answer: 2
        },
        {
            question: "რა ეწერა ლუკას ბაქო მაჯორზე?",
            choice1: "yamahaha",
            choice2: "MADLOCK",
            choice3: "xoxo",
            choice4: "yamaoka",
            answer: 4
        },
        {
            question: "ვინ გაზარდა ლუკამ დოტაში?",
            choice1: "დისკოვერი",
            choice2: "დისკოყვერი",
            choice3: "დისკოთესლი",
            choice4: "დისკოფერი",
            answer: 1
        }
    ];

    // CONSTANTS
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;

    function startGame() {
        questionCounter = 0;
        score = 0;
        availableQuesions = [...questions];
        getNewQuestion();
    }

    function getNewQuestion() {
        if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            console.log("works")
            localStorage.setItem("mostRecentScore", score);
            var currentPath = window.location.href
            var directoryPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            var newPath = directoryPath + '/end.html'
            return window.location.assign(newPath);
        }
        questionCounter++;
        questionCountertext.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
        const questionIndex = Math.floor(Math.random() * availableQuesions.length);
        currentQuestion = availableQuesions[questionIndex];
        question.innerText = currentQuestion.question;

        choicesContainers.forEach((choiceContainer, index) => {
            const choiceText = choiceContainer.querySelector(".choice-text");
            const number = index + 1;
            choiceContainer.dataset['number'] = number;
            choiceText.innerText = currentQuestion['choice' + number];
        });

        availableQuesions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }

    function handleClick(event) {
        if (!acceptingAnswers) return;

        const clickedElement = event.target.closest('.choice-text');

        if (clickedElement && clickedElement.classList.contains("choice-text")) {
            const selectedAnswer = clickedElement.dataset["number"];
            const classToApply =
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            clickedElement.classList.add(classToApply);

            if (selectedAnswer == currentQuestion.answer) {
                score += CORRECT_BONUS;
                scoretext.innerText = score;
            }

            acceptingAnswers = false;
        }
    }

    choicesContainers.forEach(choiceContainer => {
        choiceContainer.addEventListener("click", handleClick);
    });

    button.addEventListener('click', () => {
        choiceText.forEach(choiceText => {
            choiceText.classList.remove("correct");
            choiceText.classList.remove("incorrect");
        });

        getNewQuestion();
    });

    startGame();
});
