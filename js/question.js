import {
  categoryInput,
  difficultyInput,
  numberOfQInput,
  questions,
  quiz,
  quizSection,
} from "./index.js";

export class Question {
  constructor(index) {
    this.index = index;
    this.category = questions[index].category;
    this.q = questions[index].question;
    this.correctAnswer = questions[index].correct_answer;
    this.answers = [
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ].sort();
    this.isAnswer = false;
  }

  display() {
    let box = `
    <div
    id="quizConytainer"
    class="d-flex flex-column p-3 bg-body my-3 rounded-2 text-center"
  >
    <div
      class="d-flex justify-content-between align-items-center text-white"
    >
      <p id="titleDifficulty" class="m-0 p-2 rounded-2">${this.category}</p>
      <p id="titleNumberOfQ" class="m-0 p-2 rounded-2">
        ${this.index + 1} of ${questions.length}
      </p>
    </div>
    <div class="py-2">
      <p id="titleQuestion" class="fs-1 text-muted my-1">
        ${this.q}
      </p>
    </div>
    <div class="py-2">
      <ul class="list-unstyled m-0 row g-3 justify-content-between">
      ${
        this.answers[0]
          ? `<li class="col-5 rounded-2 p-2 mb-1 animate__animated">${this.answers[0]}</li>`
          : ""
      }
      ${
        this.answers[1]
          ? `<li class="col-5 rounded-2 p-2 mb-1 animate__animated">${this.answers[1]}</li>`
          : ""
      }
      ${
        this.answers[2]
          ? `<li class="col-5 rounded-2 p-2 mb-1 animate__animated">${this.answers[2]}</li>`
          : ""
      }
      ${
        this.answers[3]
          ? `<li class="col-5 rounded-2 p-2 mb-1 animate__animated">${this.answers[3]}</li>`
          : ""
      }
      </ul>
    </div>
    <div>
      <p id="titleScore" class="text-black-50 fs-3">Score : ${quiz.score}</p>
    </div>
  </div>
    `;
    quizSection.innerHTML = box;
    let answersBtn = document.querySelectorAll("ul li");
    answersBtn.forEach((ele) => {
      ele.addEventListener("click", () => {
        this.checkAnswer(ele);
        this.animateQuestion(ele, 1000);
        this.nextQuestion();
      });
    });
  }
  checkAnswer(element) {
    if (!this.isAnswer) {
      this.isAnswer = true;
      if (element.innerHTML == this.correctAnswer) {
        element.classList.add(
          "bg-success",
          "text-white",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score++;
      } else {
        element.classList.add(
          "bg-danger",
          "text-white",
          "animate__animated",
          "animate__shakeX"
        );
      }
    }
  }
  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest("#quizConytainer")
        .classList.add("animate__animated", "animate__bounceOutLeft");
    }, duration);
  }
  nextQuestion() {
    this.index++;
    setTimeout(() => {
      if (this.index < questions.length) {
        const nextQuestion = new Question(this.index);
        nextQuestion.display();
      } else {
        quizSection.innerHTML = quiz.showResult();
        const tryAgain = document.querySelector(".again");
        tryAgain.addEventListener("click", function () {
          quizSection
            .querySelector(".question")
            .classList.replace("d-flex", "d-none");
          categoryInput.value = "";
          difficultyInput.value = "easy";
          numberOfQInput.value = "";
          myForm.classList.replace("d-none", "d-flex");
        });
      }
    }, 2000);
  }
}
