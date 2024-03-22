import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import Img from "../ImgWithContainer/ImgWithContainer";
import SearchBar from "../SearchBar/SearchBar";
import text from "../../assets/text.module.css";
import colors from "../../assets/colors.module.css";
import classname from "../../helpers/classJoiner";
import logo from "../../assets/img/logo.png";
import filter from "../../assets/img/filter.png";
import cart from "../../assets/img/cart.png";
import notification from "../../assets/img/bell.png";
import message from "../../assets/img/message.png";
import userDefault from "../../assets/img/default.png";
import { API_URL } from "../../utils/environment";

const Navbar = (props) => {
	const { status, user, isLogin } = useSelector((state) => state.auth);
	const inputRef = React.useRef();
	const onKeyPressHandler = (event) => {
		if (event.key === "Enter") {
			props.history.push(`/search?name=${inputRef.current.value}`);
		}
	};

	return (
		<header className={classname(styles.navbar, colors.white)}>
			<div className="d-flex flex-row justify-content-around">
				<Img
					key="logo"
					containerStyle={styles.logo}
					imgStyle={styles.logoImg}
					source={logo}
					onClickProp={() => {
						props.history.push("/");
					}}
				/>
				<SearchBar refProp={inputRef} onKeyPress={onKeyPressHandler} />
				<Img
					key="filter"
					containerStyle={styles.filter}
					imgStyle={styles.filterImg}
					source={filter}
				/>
			</div>
			<div className="d-flex flex-row justify-content-around">
				<Img
					key="cart"
					source={cart}
					containerStyle={styles.cart}
					imgStyle={styles.cartImg}
					onClickProp={() => {
						props.history.push("/mybag");
					}}
				/>
				{isLogin && user.token ? (
					<nav className={styles.navList}>
						<Img
							key="notification"
							source={notification}
							containerStyle={styles.navIcon}
							imgStyle={styles.navIconImg}
						/>
						<Img
							key="message"
							source={message}
							containerStyle={styles.navIcon}
							imgStyle={styles.navIconImg}
							onClickProp={() => {
								props.history.push("/chat");
							}}
						/>
						{/* <Img
							key="profile"
							source={
								user.avatar ? require(user.avatar) : userDefault
							}
							containerStyle={styles.profile}
							imgStyle={styles.profileImg}
							onClickProp={() => {
								props.history.push("/profile");
							}}
						/> */}
						{user.avatar ? (
							<Img
								key="profile"
								source={`${API_URL}${user.avatar}`}
								containerStyle={styles.profile}
								imgStyle={styles.profileImg}
								onClickProp={() => {
									user.user_type === "Seller"
										? props.history.push("/profileseller")
										: (user.user_type === "Admin"? props.history.push("/profileAdmin") : props.history.push("/profile"));
								}}
							/>
						) : (
							<Img
								key="profile"
								source={userDefault}
								containerStyle={styles.profile}
								imgStyle={styles.profileImg}
								onClickProp={() => {
									user.user_type === "Seller"
										? props.history.push("/profileseller")
										: (user.user_type === "Admin"? props.history.push("/profileAdmin") : props.history.push("/profile"));
								}}
							/>
						)}
					</nav>
				) : (
					<div className={styles.buttonContainer}>
						<button
							className={classname(
								styles.loginButton,
								text.descriptionText,
								colors.error
							)}
							onClick={() => {
								props.history.push("/login");
							}}
						>
							Login
						</button>
						<button
							className={classname(
								styles.signupButton,
								text.descriptionText,
								colors.white
							)}
							onClick={() => {
								props.history.push("/RegisterCustomer");
							}}
						>
							Signup
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

Navbar.propTypes = {};

export default Navbar;
