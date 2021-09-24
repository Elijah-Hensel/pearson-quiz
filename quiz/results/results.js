let i;
let results = [];
let correct = [];
let incorrect = [];

for (i = 1; i <= 4; i++) {
  let result = localStorage.getItem(`question ${i}`);
  results.push(result);
  result === "correct" ? correct.push(result) : incorrect.push(result);
}

function listAnswers() {
  let questionNum = 1;
  let answers = results.map((result) => {
    if (result === "incorrect") {
      return `<p style="color:red">Question ${questionNum++}/${
        results.length
      }: ${result}<p></br>`;
    }
    return `<p>Question ${questionNum++}/${results.length}: ${result}<p></br>`;
  });

  return answers.join(" ");
}

document.getElementById("quiz-content").innerHTML = `<h3>You got ${
  correct.length
}/${results.length} answers correct!</h3></br>
${listAnswers()}`;
