import React from "react";
import styles from "../styles/WelcomePage.module.css";
import blueBlob from "../images/blueBlob.png";
import yellowBlob from "../images/yellowBlob.png";

function WelcomePage(props) {
  return (
    <div className={styles.WelcomePage}>
      <img src={blueBlob} className={styles.blueBlob} alt="blue blob" />
      <img src={yellowBlob} className={styles.yellowBlob} alt="yellow blob" />
      <div className={styles.title}>Quizzical</div>
      <div className={styles.subTitle}>
        Welcome to the best quiz game in the world!
      </div>
      <button className={styles.startQuizBtn} onClick={props.startNewGame}>
        Start quiz
      </button>
    </div>
  );
}

export default WelcomePage;
