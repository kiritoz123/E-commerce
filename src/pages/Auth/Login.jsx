import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Button, FormGroup, FormControl } from "react-bootstrap"
import {
	authLoginCustomerCreator,
	authLoginSellerCreator,
} from "../../redux/actions/auth";
import corpName from "../../assets/img/logo.png";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
	const dispatch = useDispatch();
	const [userType, setUserType] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	// const [errMsgSllr, setErrMsgSllr] = useState(null)

	const {
		user: login,
		status: statusLogin,
		errMsg: errMsgUser,
	} = useSelector((state) => state.auth);

	const { handleSubmit, register, errors } = useForm();

	// console.log(userAddress)

	useEffect(() => {
		document.title = "Login | Blanja";
	}, []);


	useEffect(() => {
		if (statusLogin === 200) {
			props.history.push("/");
		}
	}, [statusLogin]);

	useEffect(() => {
		// console.log(statusLogin, login.user_type, errMsgUser)
		if (statusLogin === 200 && login.user_type === "Customer") {
			setErrMsg(null);
			return console.log("customer dah login");
		} else if (statusLogin === 200 && login.user_type === "Seller") {
			setErrMsg(null);
			return console.log("seller dah login");
		} else {
			setErrMsg(errMsgUser);
			// console.log('kambing')
		}
	}, [statusLogin, login.user_type]);

	const onSubmitCustomer = (data) => {
		dispatch(authLoginCustomerCreator(data));
		// console.log('customer')
	};
	const onSubmitSeller = (data) => {
		dispatch(authLoginSellerCreator(data));
		// console.log('seller')
	};

	return (
		<div className={classname(styles.body)}>
			{/* <p>FORM YANG INI PUNYA CUSTOMER</p> */}
			{userType === false ? (
				<div>
					<form
						className={classname(styles.login)}
						onSubmit={handleSubmit(onSubmitCustomer)}
					>
						<img
							alt="logo"
							className={classname(styles.logo)}
							src={corpName}
							onClick={() => props.history.push('/')}
						/>
						<p className={classname(styles.desc)}>
							Please login with your account
						</p>

						<div className={classname(styles.userType)}>


							{userType === false ? (
								<button
									className={classname(
										styles.userTypeBtnCustomerActive
									)}
								>
									Customer
								</button>
							) : (
									<button
										className={classname(
											styles.userTypeBtnCustomer
										)}
									>
										Customer
									</button>
								)}
							<button
								className={classname(styles.userTypeBtnSeller)}
								onClick={(e) => {
									e.preventDefault();
									setUserType(true);
								}}
							>
								Seller
							</button>
						</div>
						{errMsg === null ? null : (
							<p className={classname(styles.errMsg)}>
								{errMsg}
							</p>
						)}
						<form className={classname(styles.formContainer)}>

							<div>
								<input
									className={classname(styles.loginInput)}
									placeholder="Email"
									name="email"
									ref={register({
										required: "Required",
										pattern: {
											value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
											message: "Wrong email format",
										},
									})}
								/>
							</div>
							<p style={{ fontSize: 16, color: "red" }}>
								{errors.email && errors.email.message}
							</p>

							<div>
								<input
									className={classname(styles.loginInput)}
									placeholder="Password"
									name="password"
									type="password"
									ref={register({
										required: "Required",
										pattern: {
											value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
											message: "Password must contain at least 1 number, an uppercase letter and more than 8 characters",
										},
										validate: (value) =>
											value !== "admin" || "Nice try!",
									})}
								/>
							</div>
							<p style={{ fontSize: 16, color: "red", width: 400 }}>
								{errors.password && errors.password.message}
							</p>
							<p className={classname(styles.forgot)}>
								<span onClick={() => { }}>
									<Link
										className={classname(styles.bla)}
										to="/EmailInput"
									>
										Forgot password?
									</Link>
								</span>
							</p>
							<button
								className={classname(styles.loginSubmit)}
								type="submit"
							>
								Submit
							</button>
						</form>
					</form>
					<div className={classname(styles.signUpBtn)}>
						<p>
							Don't have a Tokopedia account?{" "}
							<span onClick={() => { }}>
								<Link
									className={classname(styles.bla)}
									to="/RegisterCustomer"

								>
									Register
								</Link>
							</span>
						</p>
					</div>
				</div>
			) : (
					// <p>FORM DIBAWAH PUNYA SELLER, YANG ATAS PUNYA CUSTOMER</p>
					<div>
						<form
							className={classname(styles.login)}
							onSubmit={handleSubmit(onSubmitSeller)}
						>
							<img
								alt="logo"
								className={classname(styles.logo)}
								src={corpName}
							/>
							<p className={classname(styles.desc)}>
								Please login with your seller account
						</p>

							{/* {errMsgSllr === null ? null : (<p className={classname(styles.errMsg)}>{errMsgSllr}</p>)} */}
							<div className={classname(styles.userType)}>
								<button
									className={classname(
										styles.userTypeBtnCustomer
									)}
									onClick={(e) => {
										e.preventDefault();
										setUserType(false);
									}}
								>
									Customer
							</button>
								{userType === true ? (
									<button
										className={classname(
											styles.userTypeBtnSellerActive
										)}
									>
										Seller
									</button>
								) : (
										<button
											className={classname(
												styles.userTypeBtnSeller
											)}
										>
											Seller
										</button>
									)}
							</div>
							{errMsg === null ? null : (
								<p className={classname(styles.errMsg)}>
									{errMsg}
								</p>
							)}
							<form className={classname(styles.formContainer)}>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Email"
										name="email"
										ref={register({
											required: "Required",
											pattern: {
												value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
												message: "Wrong email format",
											},
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.email && errors.email.message}
								</p>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Password"
										name="password"
										type="password"
										ref={register({
											required: "Required",
											pattern: {
												value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
												message: "Password must contain at least 1 number, an uppercase letter and more than 8 characters",
											},
											// validate: value => value !== "admin" || "Nice try!"
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.password && errors.password.message}
								</p>
								<p className={classname(styles.forgot)}>
									<span onClick={() => { }}>
										<Link
											className={classname(styles.bla)}
											to="/EmailInput"
										>
											Forgot password?
									</Link>
									</span>
								</p>
								<button
									className={classname(styles.loginSubmit)}
									type="submit"
								>
									Submit
							</button>
							</form>
						</form>
						<div className={classname(styles.signUpBtn)}>
							<p>
								Don't have a Tokopedia account?{" "}
								<span onClick={() => { }}>
									<Link
										className={classname(styles.bla)}
										to="/RegisterSeller"
									>
										Register
								</Link>
								</span>
							</p>
						</div>
					</div>
				)}
		</div>
	);

};

export default Login;
