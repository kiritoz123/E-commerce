import React, { useState } from "react";
import colors from "../../assets/colors.module.css";
import text from "../../assets/text.module.css";
import classname from "../../helpers/classJoiner";
import {
	Alert,
	// Row, Col, Toast
} from "react-bootstrap";
import "./MyBag.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	increaseQuantity,
	decreaseQuantity,
	addToCheckout,
	clearCart,
	clearCheckout,
} from "../../redux/actions/product";
import { API_URL } from "../../utils/environment";

const MyBag = () => {
	const [cart, setCart] = useState([
		{
			id: 1,
			name: "Men's formal suit - Black",
			seller: "Zalora Cloth",
			quantity: 1,
			price: 20.0,
			selected: false,
			img:
				"https://s3-alpha-sig.figma.com/img/464a/22c1/4934cf1d9102bfc8ca226895c16fe510?Expires=1603065600&Signature=L2Go8ufnFXRu499YQ0SVJEFU8cW1i62rws4oM3PBc-WW3sCqbVw0AWsTnmqAMhltn5TMjdbR3EQjYS1QtRoZLSkt2Mh-AEfzKwMThJEAMb7oAI5dw1nCy1PVoEp9LQeco~tzGD5SJ9h8OzJgkoVGQ0YY1soJMVaC472GJxxHVZDfVctr2MEsi6EaHG-SqeNBVNHCcKM8EVDVhlTRT36AqDLeOSD10qWLtwInozO-8QW1w6hsZ2TmGRRXq4WjOaDU~8gLUUnxINBWB4m-FOwMs2DGjhpkQZQHe3B1fu0gIbL84W50DSX9X-w4PvTsTNFSgxsImCcSNvUX6Hsx5AavAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
		},
		{
			id: 2,
			name: "Men's Jacket jeans",
			seller: "Zalora Cloth",
			quantity: 1,
			price: 20.0,
			selected: false,
			img:
				"https://s3-alpha-sig.figma.com/img/d373/227e/1b077d067cc7eed45f8733fd75f5e570?Expires=1603065600&Signature=d40ckFqK4v2u2r8FCajf9MOpyiz7NQhmacmlyXyfsLXRPWu-5MQ8RndW9wtuCOVRc~kbqsGaqwrfcjB4AgWVrtxYHETotH8XBuP5~rKUpUYxq1jUSWz5fo2WcHZvYKWFaF05tyYRfWOQWF7JB-q~69HXXeWfK6S~KA4wHmlMEVwMY66Q6nSvHxAqrXejnpENTskeO1Bp5zeypr~kd7N8c5oWsC8UQUV0M6ff1hcyhjT2YbgIDcAp6Y3fOXdKH4Iefow8ChLuq~jnAAfvE8Y8JWAXwZ713jAVTUpYVV2gpP-f-IZWypkWsoVUSB~GSmuYZjQX6xZ8c98qewV0Qj38Ow__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
		},
	]);

	const [showAlert, setShowAlert] = useState(false);

	const handleSelectAll = (evt) => {
		if (evt.target.checked) {
			stateCarts.map((item) => (item.selected = true));
			setCart([...cart]);
		} else {
			stateCarts.map((item) => (item.selected = false));
			setCart([...cart]);
		}
	};

	React.useEffect(() => {
		document.title = "My Bag | Blanja";
	}, []);

	const handleSelectItem = (evt) => {
		if (evt.target.checked) {
			let penampung = stateCarts.filter(
				(item) => item.id === Number(evt.target.id)
			);
			penampung[0].selected = true;
			setCart([...cart]);
		} else {
			let penampung = stateCarts.filter(
				(item) => item.id === Number(evt.target.id)
			);
			penampung[0].selected = false;
			setCart([...cart]);
		}
	};

	const dispatch = useDispatch();
	const stateCarts = useSelector((state) => state.product.carts);
	const stateAuth = useSelector((state) => state.auth.user);

	const joinedAdrress = `${stateAuth.address}, ${stateAuth.city_of_subdistrict}, ${stateAuth.postal_code}, ${stateAuth.recipient_telp_number}`;

	const kirim = () => {
		// console.log(cart.filter(item => item.selected === true));
		// stateCarts.filter(item => item.selected === true)
		let invoice = Math.floor(Math.random() * 100001) + 1;
		const sendData = {
			id: invoice,
			customer_id: stateAuth.id,
			
			seller_id: stateCarts.filter((item) => item.selected === true)[0]
				.seller_id,
			amount: stateCarts
				.filter((item) => item.selected === true)
				.reduce((total, item) => {
					return total + item.price * item.qty;
				}, 5000),
			payment_method: "",
			// "address": stateAddres,
			address: joinedAdrress,
			products: stateCarts
				.filter((item) => item.selected === true)
				.map((item) => {
					return {
						id: item.id,
						qty: item.qty,
					};
				}),
		};
		dispatch(addToCheckout({ sendData }));
	};

	const handleDeleteCart = (e) => {
		e.preventDefault()
		if (window.confirm("Are you sure to delete the bag?")) {
			dispatch(clearCart());
			dispatch(clearCheckout());
		} else {
			return;
		}
	};

	return (
		<div className="container-main">
			<div className="container-title">
				<h1 className={classname(text.headline, "headline")}>My bag</h1>
			</div>
			{stateCarts.length ? (
				<div className="row">
					{/* left item */}
					<div className="col-lg-7">
						<div className="row no-gutters shadow align-content-center container-select-all">
							<div className="col-1 align-self-center">
								<input
									type="checkbox"
									name="selectAll"
									onChange={handleSelectAll}
								/>
							</div>
							<div className="col">
								<p
									className={classname(
										text.text,
										"text-title"
									)}
								>{`Select all item (${stateCarts.filter(item => item.selected === true).length} items selected)`}</p>
							</div>
							<div className="col-1">
								<a
									href="/"
									className={classname(
										text.text,
										colors.errorText,
										"text-title"
									)}
									onClick={handleDeleteCart}
								>
									Delete
								</a>
							</div>
						</div>

						{/* list item */}
						{stateCarts.map((item) => {
							return (
								<div
									className="row no-gutters shadow align-items-center container-items"
									key={item.id}
								>
									<div className="col-1 align-self-center">
										<input
											type="checkbox"
											name={item.name}
											onChange={handleSelectItem}
											id={item.id}
											checked={item.selected}
										/>
									</div>
									<div className="col-2">
										<img
											src={`${API_URL}${item.images}`}
											alt=""
										/>
									</div>
									<div className="col">
										<p
											className={classname(
												text.text,
												"text-title"
											)}
										>
											{item.name}
										</p>
										<p
											className={classname(
												colors.grayText,
												"text-seller"
											)}
										>
											{item.brand}
										</p>
									</div>
									<div className="col-2">
										<div className="row container-counter align-items-center justify-content-between">
											{item.qty === 1 ? (
												<button
													className={classname(
														colors.lightGray,
														"btn btn-secondary btn-quantity"
													)}
												>
													-
												</button>
											) : (
													<button
														className={classname(
															colors.lightGray,
															"btn btn-secondary btn-quantity"
														)}
														onClick={() =>
															dispatch(
																decreaseQuantity(
																	item.id
																)
															)
														}
													>
														-
													</button>
												)}
											<p>{item.qty}</p>
											<button
												className={classname(
													colors.white,
													"btn btn-light btn-quantity"
												)}
												onClick={() =>
													dispatch(
														increaseQuantity(
															item.id
														)
													)
												}
											>
												+
											</button>
										</div>
									</div>
									<div className="col-2">
										<p
											href="#"
											className={classname(
												text.text,
												colors.blackText,
												"text-title text-right"
											)}
										>
											{`${(
												item.price * item.qty
											).toLocaleString("id-ID")}VND`}
										</p>
									</div>
								</div>
							);
						})}
					</div>
					{/* right item */}
					<div className="col-lg-4 shadow container-summary ml-lg-auto">
						<div>
							<p
								className={classname(
									text.text,
									"text-title mb-5"
								)}
							>
								Shopping summary
							</p>
							<div className="row no-gutters mb-5 align-items-center">
								<div className="col">
									<p
										className={classname(
											text.text,
											colors.grayText,
											"text-title"
										)}
									>
										Total Price
									</p>
								</div>
								<div className="col">
									<p
										className={classname(
											text.headline3,
											"text-title text-right"
										)}
									>
										
										{stateCarts
											.filter(
												(item) => item.selected === true
											)
											.reduce((total, item) => {
												return (
													total +
													item.price * item.qty
												);
											}, 0)
											.toLocaleString("id-ID")}
									</p>
								</div>
							</div>
							{stateCarts.filter((item) => item.selected === true)
								.length ? (
									<Link
										to={{
											pathname: "/checkout",
											data: cart.filter(
												(item) => item.selected === true
											),
										}}
									>
										<button
											className={classname(
												"btn btn-danger btn-buy",
												colors.primary
											)}
											onClick={kirim}
										>
											Buy
									</button>
									</Link>
								) : (
									<button
										className={classname(
											"btn btn-danger btn-buy",
											colors.primary
										)}
										onClick={() => setShowAlert(true)}
									>
										Buy
									</button>
								)}
						</div>
						{showAlert
							? (setTimeout(() => {
								setShowAlert(false);
							}, 4000),
								(
									<Alert
										className={classname(
											"mt-5 alert-empty",
											colors.error,
											colors.whiteText
										)}
										variant="dark"
										onClose={() => setShowAlert(false)}
										dismissible
									>
										<Alert.Heading
											className={classname(
												text.headline2
											)}
										>
											Cart is empty!
										</Alert.Heading>
										<p
											className={classname(
												text.descriptionText
											)}
										>
											Select at least 1 product to buy,
											then continue to payment.
										</p>
									</Alert>
								))
							: ""}
					</div>
				</div>
			) : (
					<h1
						className={classname(
							text.headline,
							colors.grayText,
							"text-empty-cart"
						)}
					>
						(My bag is empty)
					</h1>
				)}
		</div>
	);
};

export default MyBag;
