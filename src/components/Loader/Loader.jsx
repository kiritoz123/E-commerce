import React from "react";
import loading from "../../assets/img/loading.gif";
import styles from "./styles.module.css";

const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<img className={styles.loader} src={loading} alt="loader" />
			<h1 className={styles.loaderText}>Please wait</h1>
		</div>
	);
};

export default Loader;
