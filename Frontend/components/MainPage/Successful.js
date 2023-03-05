import React from 'react'
import styles from './Successful.module.css';

const Successful = ({homeHandler}) => {
  return (
    <div className={styles.main}>
      <div className={styles.circle}>
        <div className={styles.tick}></div>
      </div>
      <div className={styles.text}>
          Your Transaction was Successful!!
      </div>
      <button onClick={homeHandler} className={styles.btn}>Return to Home!</button>
    </div>
  )
}

export default Successful
