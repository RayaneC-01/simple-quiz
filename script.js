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
    // Afficher les erreurs et les corrections
    showErrors();
}

// Fonction pour mettre à jour l'affichage des boutons de navigation
function updateButtons() {
    document.getElementById('prevBtn').style.display = currentQuestion === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
}

// Tableau pour stocker les réponses de l'utilisateur
const userAnswers = [];
// Fonction pour vérifier la réponse sélectionnée par le joueur
function checkAnswer(selectedAnswer) {
    // Stocker la réponse de l'utilisateur dans le tableau userAnswers
    userAnswers[currentQuestion] = selectedAnswer;

    // Vérifier si la réponse est correcte et mettre à jour le score
    const current = questions[currentQuestion];
    if (selectedAnswer === current.answer) {
        score++;
    }
    // Passer à la question suivante
    nextQuestion();
}

// Fonction pour afficher les erreurs et les corrections
function showErrors() {
    // Récupérer l'élément où afficher les erreurs
    const errorsElement = document.getElementById('errors');
    // Effacer le contenu précédent
    errorsElement.innerHTML = '';

    // Parcourir toutes les questions
    questions.forEach((question, index) => {
        // Récupérer la réponse de l'utilisateur pour cette question
        const userAnswer = userAnswers[index];
        // Récupérer la réponse correcte pour cette question
        const correctAnswer = question.answer;

        // Vérifier si la réponse de l'utilisateur est différente de la réponse correcte
        if (userAnswer !== correctAnswer) {
            // Créer un élément div pour afficher l'erreur
            const errorDiv = document.createElement('div');
            // Ajouter une classe pour le style CSS si nécessaire
            errorDiv.classList.add('error');

            // Numéro de la question
            const questionNumber = index + 1;
            // Texte de la question
            const questionText = question.question;
            // Texte de la réponse de l'utilisateur
            const userAnswerText = userAnswer ? `Votre réponse :<strong> ${userAnswer}</strong>` : 'Aucune réponse';
            // Texte de la réponse correcte
            const correctAnswerText = `Réponse correcte : ${correctAnswer}`;

            // Ajouter les informations de l'erreur à l'élément div
            errorDiv.innerHTML = `<p>Question ${questionNumber}: ${questionText}</p>`;
            errorDiv.innerHTML += `<p>${userAnswerText}</p>`;
            errorDiv.innerHTML += `<p>${correctAnswerText}</p>`;

            // Ajouter l'élément div à l'élément où afficher les erreurs
            errorsElement.appendChild(errorDiv);
        }
    });
}
