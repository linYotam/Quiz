import React, { Fragment, useState } from "react";
import styles from "../styles/App.module.css";
import WelcomePage from "./WelcomePage";
import QuizPage from "./QuizPage";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [quiz, setQuiz] = useState([]);

  const getQuizData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    setQuiz(data.results);
  };

  function startNewGame() {
    setNewGame((newGame) => !newGame);
    getQuizData();
  }

  return (
    <Fragment>
      <div className={styles.App}>
        {newGame && <WelcomePage startNewGame={startNewGame} />}
        {!newGame && <QuizPage quizData={quiz} startNewGame={startNewGame} />}
      </div>
    </Fragment>
  );
}

export default App;
