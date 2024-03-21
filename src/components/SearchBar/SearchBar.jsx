import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"; // Import css modules stylesheet as styles
import Img from "../ImgWithContainer/ImgWithContainer";
import search from "../../assets/img/search.png";

const SearchBar = (props) => {
	return (
		<div className={styles.searchContainer}>
			<input
				placeholder="Search"
				className={styles.searchInput}
				ref={props.refProp}
				onKeyPress={props.onKeyPress}
			/>
			<Img
				source={search}
				containerStyle={styles.search}
				imgStyle={styles.img}
			/>
		</div>
	);
};

SearchBar.propTypes = {
	// Either a function
	refProp: PropTypes.oneOfType([
		// Either a function
		PropTypes.func,
		// Or the instance of a DOM native element (see the note about SSR)
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	onKeyPress: PropTypes.func,
};

export default SearchBar;
