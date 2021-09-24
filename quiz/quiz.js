const submitBtn = document.getElementById("submit-btn");
const quizFooter = document.getElementById("quiz-footer");
const buttonContainer = document.getElementById("btn-container");
const correctAnswer = document.querySelector("input[correct='true']");

let url = window.location.href;
let pageNum = url.split("/").pop().substring(9, 10);

let response;

function correctAnswerChecked() {
  if (correctAnswer.checked) {
    return true;
  }
  return false;
}

function whichAnswerCheck() {
  let radios = document.getElementsByName("response");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) response = radios[i].value;
  }
}

function checkAnswer() {
  whichAnswerCheck();
  if (correctAnswerChecked()) {
    localStorage.setItem(`question ${pageNum}`, "correct");
    quizFooter.innerHTML = `
          <p>YOUR ANSWER IS THE CORRECT ANSWER! Please click NEXT to continue</p>
          `;
  } else {
    localStorage.setItem(`question ${pageNum}`, "incorrect");
    quizFooter.innerHTML = `
          <p>YOUR ANSWER IS THE INCORRECT ANSWER! Please click NEXT to continue</p>
          `;
  }
  localStorage.setItem(`answer ${pageNum}`, response);
}

function disableRadios() {
  var radios = document.getElementsByClassName("response");
  var i;
  for (i = 0; i < radios.length; i++) {
    radios[i].disabled = true;
    if (radios[i].value === localStorage.getItem(`answer ${pageNum}`)) {
      return (radios[i].checked = true);
    }
  }
  replaceSubmit();
}

if (localStorage.getItem(`question ${pageNum}`)) {
  disableRadios();
  replaceSubmit();
}

function nextBtn() {
  if (pageNum < 4) {
    document.getElementById("next-btn").addEventListener("click", () => {
      window.location.href = `question-${++pageNum}.html`;
    });
  } else {
    document.getElementById("next-btn").addEventListener("click", () => {
      window.location.href = `results/results.html`;
    });
  }
}

function backBtn() {
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "question-2.html";
  });
}

function replaceSubmit() {
  if (pageNum > 1) {
    buttonContainer.innerHTML = `
      <button id="back-btn" class="secondary-btn">BACK</button>
      <button id="next-btn" class="primary-btn">NEXT</button>
    `;
    backBtn();
    nextBtn();
  } else {
    buttonContainer.innerHTML = `
    <button id="next-btn" class="primary-btn">NEXT</button>
  `;
    nextBtn();
  }
}

submitBtn.addEventListener("click", () => {
  disableRadios();
  checkAnswer();
  replaceSubmit();
});
