import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.toggleNextQuestionButton = this.toggleNextQuestionButton.bind(this);
  }

  // by https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleNextQuestionButton({ target }) {
    if (target.id === 'btn-next') {
      target.style.visibility = 'hidden';
      const { showNextQuestion } = this.props;
      showNextQuestion();
    } else {
      const btn = document.getElementById('btn-next');
      btn.style.visibility = 'visible';
    }
  }

  renderAlternatives() {
    const { question } = this.props;
    const correctAnswer = (
      <button
        key={ question.correctAnswer }
        onClick={ this.toggleNextQuestionButton }
        type="button"
        data-testid="correct-answer"
      >
        { question.correct_answer }
      </button>
    );
    const answers = question.incorrect_answers.map((answer, index) => (
      <button
        key={ answer }
        onClick={ this.toggleNextQuestionButton }
        type="button"
        data-testid={ `wrong-answer-${index}` }
      >
        { answer }
      </button>));
    if (question.type === 'boolean') {
      answers.push(correctAnswer);
      return (
        <div className="question-alternatives">
          { answers.map((answer) => answer) }
        </div>
      );
    }
    const answerLimit = 3;
    const correctAnswerPosition = this.getRandomIntInclusive(0, answerLimit);
    const answerToReplace = answers[correctAnswerPosition];
    answers.splice(correctAnswerPosition, 1, correctAnswer);
    answers.push(answerToReplace);
    return (
      <div className="question-alternatives">
        { answers.map((answer) => answer) }
      </div>
    );
  }

  render() {
    const { question } = this.props;
    return (
      <div className="main-question">
        <div className="question-description">
          <span data-testid="question-category">
            { question.category }
          </span>
          <span data-testid="question-text">
            { question.question }
          </span>
        </div>
        { this.renderAlternatives() }
        <div className="next-question-button">
          <button
            id="btn-next"
            onClick={ this.toggleNextQuestionButton }
            className="button-next"
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}
Question.propTypes = {
  question: PropTypes.shape().isRequired,
  showNextQuestion: PropTypes.func.isRequired,
};
export default Question;