import React, { useEffect, useState } from "react";
import styles from "../styles/Card.module.css";
import FixString from "./FixString";
import _ from "lodash";

function Card(props) {
  const [shuffledAnswers, setshuffledAnswers] = useState(initCard());
  let renderedAnswers;

  useEffect(() => {
    updateCardResults();
  }, [props.gameOver]);

  function updateCardResults() {
    if (props.finalAnswers.length === 5) {
      render(props.gameOver);
    }
  }

  function initCard() {
    let counter = 1;
    let answers = [];
    let answer = {
      value: FixString(props.data.correct_answer),
      isCorrect: true,
      isActive: false,
      questionId: props.questionId,
      id: counter,
    };
    answers.push(answer);
    for (let i = 0; i < props.data.incorrect_answers.length; i++) {
      counter++;
      answer = {
        value: FixString(props.data.incorrect_answers[i]),
        isCorrect: false,
        isActive: false,
        questionId: props.questionId,
        id: counter,
      };
      answers.push(answer);
    }

    //Using lodash to suffle answers
    return _.shuffle(answers);
  }

  function render(gameOver) {
    if (gameOver) {
      renderedAnswers = shuffledAnswers.map((ans) => (
        <button
          key={ans.id}
          className={`${ans.isCorrect ? styles.correct : styles.answerBtn} ${
            ans.isActive && !ans.isCorrect ? styles.wrong : styles.answerBtn
          }`}
          onClick={(e) => selectAnswer(e, ans)}
        >
          {ans.value}
        </button>
      ));
    } else {
      renderedAnswers = shuffledAnswers.map((ans) => (
        <button
          key={ans.id}
          className={ans.isActive ? styles.selectedBtn : styles.answerBtn}
          onClick={(e) => selectAnswer(e, ans)}
        >
          {ans.value}
        </button>
      ));
    }
  }

  render(props.gameOver);

  function selectAnswer(event, answerData) {
    answerData.isActive = !answerData.isActive;
    setshuffledAnswers((prevState) => {
      return prevState.map((ans) => {
        return ans.id === answerData.id
          ? { ...ans, isActive: answerData.isActive }
          : { ...ans, isActive: false };
      });
    });

    // setshuffledAnswers((prevState) => {
    //   console.log("answerData: ", answerData);
    //   console.log("shuffledAnswers: ", prevState);
    //   return prevState;
    // });

    props.updateQuizStatus(event, answerData);
  }

  return (
    <div className={styles.Card}>
      <div className={styles.question}>{FixString(props.data.question)}</div>
      <div className={styles.buttons}>{renderedAnswers}</div>
    </div>
  );
}

export default Card;
