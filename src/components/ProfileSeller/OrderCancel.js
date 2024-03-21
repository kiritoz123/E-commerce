import React from "react";
import styles from "./myorder.module.css";
import empty from "../../assets/image/emptyorder.png";

export default function OrderCancel() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h6 className={styles.title}>My order</h6>
        <div className={styles.menu}>
          <h3 className={styles.menuinactive}>All items</h3>
          <h3 className={styles.menuinactive}>Get paid</h3>
          <h3 className={styles.menuinactive}>Processed</h3>
          <h3 className={styles.menuinactive}>Sent</h3>
          <h3 className={styles.menuinactive}>Completed</h3>
          <h3 className={styles.menuactive}>Order cancel</h3>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <i
            style={{ color: "#d4d4d4" }}
            className='fa fa-search'
            aria-hidden='true'></i>
          <input className={styles.input} type='search' />
        </div>
        <div className={styles.order}>
          <img className={styles.empty} src={empty} />
        </div>
      </div>
      {/* Content */}
      {/* ............... */}
    </div>
  );
}
