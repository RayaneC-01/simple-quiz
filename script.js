// Déclaration des questions du quiz avec leurs options et réponses
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },

    {
        question: "What is the largest planet in the solar system?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "Quel est le plus grand reptile du monde?",
        options: ["Cobra", "Crocodile", "Serpent", "Varan"],
        answer: "Crocodile"
    },
];

// Variable pour suivre la question actuelle et le score du joueur
let currentQuestion = 0;
let score = 0;

// Récupération des éléments du DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');

// Fonction pour afficher le numéro de la question actuelle sur le total de questions
function displayQuestionNumber() {
    const numberQuestionTotalElement = document.getElementById('number_question_total');
    numberQuestionTotalElement.textContent = `Question ${currentQuestion + 1} sur ${questions.length}:`;
}

// Afficher la première question
displayQuestion();
// Afficher le numéro de la première question sur le total de questions
displayQuestionNumber();

// Fonction pour afficher la question courante
function displayQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;

    optionsElement.innerHTML = '';
    current.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });

    updateButtons();
}

// Fonction pour vérifier la réponse sélectionnée par le joueur
function checkAnswer(selectedAnswer) {
    const current = questions[currentQuestion];
    if (selectedAnswer === current.answer) {
        score++;
    }
    nextQuestion();
}

// Fonction pour passer à la question suivante
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        displayQuestionNumber(); // Mise à jour du numéro de question affiché
    } else {
        showResult();
    }
}

// Fonction pour revenir à la question précédente
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        displayQuestionNumber(); // Mise à jour du numéro de question affiché
    }
}

// Fonction pour afficher le résultat final du quiz
function showResult() {
    resultElement.textContent = `Your score: ${score} / ${questions.length}`;
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
}

// Fonction pour mettre à jour l'affichage des boutons de navigation
function updateButtons() {
    document.getElementById('prevBtn').style.display = currentQuestion === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
}
