import React from 'react';
import notFoundImg from '../../assets/img/notfound.jpg';
import styles from "./styles.module.css";

const NotFound = () => {
   return (
      <div className={styles.loaderContainer}>
         <img className={styles.loader} src={notFoundImg} alt="loader" />
      </div>
   )
}

export default NotFound;
