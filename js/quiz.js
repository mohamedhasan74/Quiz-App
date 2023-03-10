export class Quiz {
  constructor(category, difficulty, number) {
    this.category = category;
    this.difficulty = difficulty;
    this.numberOfQ = number;
    this.score = 0;
  }
  readyApi() {
    return `https://opentdb.com/api.php?amount=${this.numberOfQ}&category=${this.category}&difficulty=${this.difficulty}`;
  }
  async getData() {
    let response = await fetch(this.readyApi());
    let questions = await response.json();
    return questions.results;
  }
  showResult() {
    return `
    <div
      class="question my-3 bg-body shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <h2 class="mb-0">
      ${
        this.score == this.numberOfQ
          ? `Congratulations 🎉`
          : `Your score is ${this.score}`
      }      
      </h2>
      <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div>
  `;
  }
}
