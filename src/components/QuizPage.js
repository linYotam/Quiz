import React, { useState } from "react";
import Card from "./Card";
import blueBlob from "../images/blueBlobQuiz.png";
import yellowBlob from "../images/yellowBlobQuiz.png";
import styles from "../styles/QuizPage.module.css";
import Confetti from "react-confetti";

function QuizPage(props) {
  const [gameOver, setGameOver] = useState(false);
  const [finalAnswers, setfinalAnswers] = useState([]);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
  const renderedData = props.quizData.map((question, index) => (
    <Card
      key={index}
      questionId={index}
      data={question}
      finalAnswers={finalAnswers}
      updateQuizStatus={updateQuizStatus}
      gameOver={gameOver}
    />
  ));

  console.log(props.quizData);

  function updateQuizStatus(event, answer) {
    //First we remove the last answer from same question if exsist
    setfinalAnswers((prevFinal) => {
      return prevFinal.filter((ans) => {
        return answer.questionId !== ans.questionId;
      });
    });

    //Add new active answer to final answers list
    setfinalAnswers((prevFinal) => [...prevFinal, answer]);
  }

  function checkAnswers() {
    if (finalAnswers.length < 5) {
      alert("You must answer all the questions!");
    } else {
      let counter = 0;
      for (let i = 0; i < finalAnswers.length; i++) {
        if (finalAnswers[i].isCorrect) {
          counter++;
        }
      }
      setNumOfCorrectAnswers(counter);
      //Update gameOver state to update Card component
      setGameOver((state) => !state);
    }
  }

  return (
    <div className={styles.QuizPage}>
      <img src={blueBlob} className={styles.blueBlob} alt="blue blob" />
      <img src={yellowBlob} className={styles.yellowBlob} alt="yellow blob" />
      <div className={styles.quizContainer}>{renderedData}</div>
      {!gameOver && (
        <button className={styles.submitBtn} onClick={checkAnswers}>
          Check answers
        </button>
      )}
      {gameOver && (
        <div className={styles.resultContainer}>
          <div className={styles.gameStatus}>
            You scored {numOfCorrectAnswers}/5 correct answers
          </div>
          {numOfCorrectAnswers === 5 && (
            <Confetti width="550px" height="550px" />
          )}
          <button className={styles.submitBtn} onClick={props.startNewGame}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
