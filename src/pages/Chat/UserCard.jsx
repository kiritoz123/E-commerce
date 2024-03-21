import React from "react";
import PropTypes from "prop-types";
import Img from "../../components/ImgWithContainer/ImgWithContainer";
import userDefault from "../../assets/img/default.png";
import styles from "./styles.module.css";
import text from "../../assets/text.module.css";
import classname from "../../helpers/classJoiner";

const UserCard = (props) => {
	return (
		<div
			className="d-flex flex-row mb-4"
			onClick={() => {
				props.onClick(props.id);
			}}
		>
			<Img
				source={props.avatar ? props.avatar : userDefault}
				containerStyle={styles.avatar}
				imgStyle={styles.avatarIcon}
			/>
			<div className="d-flex flex-column justify-content-center ml-4">
				<h1 className={classname(text.text, styles.name)}>
					{props.name}
				</h1>
				<p className={classname(text.descriptionText, styles.lastchat)}>
					{props.lastChat}
				</p>
			</div>
		</div>
	);
};

UserCard.propTypes = {
	// id: PropTypes.string,
	avatar: PropTypes.string,
	lastChat: PropTypes.string,
	onClick: PropTypes.func,
};

export default UserCard;
