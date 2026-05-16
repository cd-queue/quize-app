const questions = [
    {
        question: "Which language is known as the mother of programming languages?",
        answers: [
            { text: 'Java', correct: false },
            { text: 'Python', correct: false },
            { text: 'C', correct: true },
            { text: 'HTML', correct: false },
    
        ]
    },
    {
        question: "Which symbol is used to end a statement in C/C++?",
        answers: [
            { text: ':', correct: false },
            { text: ';', correct: true },
            { text: '.', correct: false },
            { text: ',', correct: false },
    
        ]
    },
    {
        question: "Which keyword is used to create a function in Python?",
        answers: [
            { text: 'func', correct: false },
            { text: 'define', correct: false },
            { text: 'function', correct: false },
            { text: 'def', correct: true },
    
        ]
    },
    {
        question: "Which loop is best when number of iterations is known?",
        answers: [
            { text: 'while', correct: false },
            { text: 'do while', correct: false },
            { text: 'for', correct: true },
            { text: 'foreach', correct: false },
    
        ]
    },
    {
        question: "Which operator means “not equal”?",
        answers: [
            { text: '!=', correct: true },
            { text: '=', correct: false },
            { text: '==', correct: false },
            { text: '<=', correct: false },
    
        ]
    },
    {
        question: "What is the size of int in most C compilers?",
        answers: [
            { text: '1 byte', correct: false },
            { text: '2 byte', correct: false },
            { text: '4 byte', correct: true },
            { text: '8 byte', correct: false },
    
        ]
    },
    {
        question: "Which data structure uses LIFO?",
        answers: [
            { text: 'Queue', correct: false },
            { text: 'Stack', correct: true },
            { text: 'Array', correct: false },
            { text: 'Tree', correct: false },
    
        ]
    },
    {
        question: "Which function is used for output in C?",
        answers: [
            { text: 'cin', correct: false },
            { text: 'print()', correct: false },
            { text: 'printf()', correct: true },
            { text: 'cout', correct: false },
    
        ]
    },
    {
        question: "Which header file is needed for printf()?",
        answers: [
            { text: 'stdio.h', correct: true },
            { text: 'math.h', correct: false },
            { text: 'conio.h', correct: false },
            { text: 'string.h', correct: false },
    
        ]
    },
    {
        question: "Which keyword is used for inheritance in C++",
        answers: [
            { text: 'extends', correct: false },
            { text: 'inherit', correct: false },
            { text: ':', correct: true },
            { text: 'super', correct: false },
    
        ]
    }
]

const questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", (e) => {
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();

