import React from "react";
import PropTypes from "prop-types";
import Img from "../ImgWithContainer/ImgWithContainer";
import classname from "../../helpers/classJoiner";
import star from "../../assets/img/Star.png";
import styles from "./styles.module.css";
import text from "../../assets/text.module.css";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/environment";

const Rating = (props) => {
	const _rate = [
		...Array(
			props.rating
				? props.rating
				: Math.round((Math.random() * 9 + 1) / 2)
		).keys(),
	];
	return (
		<div className={styles.ratingContainer}>
			{_rate.map((item, index) => {
				return (
					<Img
						key={index}
						source={star}
						containerStyle={styles.star}
						imgStyle={styles.starImg}
					/>
				);
			})}
			<p className={classname(text.helperText, styles.ratingText)}>
				({Math.round(Math.random() * 150)})
			</p>
		</div>
	);
};

Rating.propTypes = {
	rate: PropTypes.number,
};

const Card = (props) => {
	const dispatch = useDispatch();

	// const stateProduct = useSelector(state => state.product.product);

	return (
		<div
			className={classname(
				"col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2",
				styles.mr37
			)}
		>
			<div
				className={styles.cardContainer}
				onClick={() => {
					if (props.onClickProp) {
						props.onClickProp(props.id);
					}
				}}
			>
				<Img
					source={`${API_URL}${props.image.split(",")[0]}`}
					containerStyle={styles.cardImgContainer}
					imgStyle={styles.cardImg}
				/>
				<div className={styles.textContainer}>
					<h5 className={classname(text.text, styles.name)}>
						{props.name}
					</h5>
					<p className={classname(text.text, styles.price)}>
						{Number(props.price).toLocaleString("id-ID")}VND
					</p>
					<p className={classname(text.helperText, styles.category)}>
						{props.seller_name}
					</p>
					<Rating rate={props.rate} />
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	id: PropTypes.number,
	image: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.string,
	seller_name: PropTypes.string,
	rate: PropTypes.number,
	onClickProp: PropTypes.func,
};

export default Card;
