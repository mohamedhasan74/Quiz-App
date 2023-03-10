import { Question } from "./question.js";
import { Quiz } from "./quiz.js";

export const categoryInput = document.querySelector(".category");
export const difficultyInput = document.querySelector(".difficulty");
export const numberOfQInput = document.querySelector(".numberOfQ");
export const quizSection = document.getElementById("quizSection");
export const myForm = document.getElementById("myForm");
export let questions;
export let quiz;
startBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  if (isValid()) {
    quiz = new Quiz(
      categoryInput.value,
      difficultyInput.value,
      numberOfQInput.value
    );
    questions = await quiz.getData();
    myForm.classList.replace("d-flex", "d-none");
    let q = new Question(0);
    q.display();
  }
});
function isValid() {
  if (numberOfQInput.value == "" || !Number(numberOfQInput.value)) {
    alertTitle.classList.replace("d-none", "d-block");
    alertTitle.innerHTML = "You Must Enter Valid Number";
    return false;
  }
  alertTitle.classList.replace("d-block", "d-none");
  return true;
}
