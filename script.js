let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  questionEl.textContent = `Q${currentQuestionIndex + 1}. ${current.question}`;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("option");

    // Pre-select if already answered
    if (userAnswers[currentQuestionIndex] === option) {
      if (option === current.answer) {
        li.classList.add("correct");
      } else {
        li.classList.add("wrong");
      }
    }

    li.onclick = () => selectAnswer(li, option);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(li, selectedOption) {
  if (userAnswers[currentQuestionIndex] !== null) return; // prevent reselecting

  const current = questions[currentQuestionIndex];
  const allOptions = document.querySelectorAll(".option");

  userAnswers[currentQuestionIndex] = selectedOption;

  if (selectedOption === current.answer) {
    li.classList.add("correct");
    score++;
  } else {
    li.classList.add("wrong");
    allOptions.forEach(opt => {
      if (opt.textContent === current.answer) {
        opt.classList.add("correct");
      }
    });
  }

  allOptions.forEach(opt => opt.style.pointerEvents = "none");

  // Store score in localStorage
  localStorage.setItem("quizScore", score);
  localStorage.setItem("totalQuestions", questions.length);

  // Move to next after 1 second
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      window.location.href = "result.html";
    }
  }, 1000);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function skipQuestion() {
  userAnswers[currentQuestionIndex] = null; // no answer
  nextQuestion();
}

window.onload = loadQuestion;
