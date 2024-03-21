import React, { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import mainImg from "../../assets/img/page_product.png";
import secImg from "../../assets/img/card.png";
import starMedium from "../../assets/img/StarMedium.png";
import { newData } from "../../utils/dummydata";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	addToCheckout,
	getProductById,
} from "../../redux/actions/product";
import { isEmpty } from "underscore";
import { API_URL, WEB_URL } from "../../utils/environment";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import star from "../../assets/img/Star.png";
import Img from "../../components/ImgWithContainer/ImgWithContainer";
import text from "../../assets/text.module.css";

const Rating = (props) => {
	const _rate = [
		...Array(
			props.rating
				? Math.round(props.rating / 2)
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

const PageProduct = (props) => {
	const [qty, setQty] = useState(1);
	const [imgId, setImgId] = useState(0);
	const {
		product: stateProduct,
		carts: stateCart,
		productDetail: stateProductDetail,
		isPending,
	} = useSelector((state) => state.product);
	const stateAuth = useSelector((state) => state.auth.user);

	const divRef = React.useRef();
	const dispatch = useDispatch();

	const rating = Math.round(Math.random() * 9 + 1);
	const star = [...Array(Math.round(rating / 2)).keys()];

	React.useEffect(() => {
		dispatch(getProductById(props.match.params.id));
	}, [props.match.params.id]);

	React.useEffect(() => {
		try {
			if (stateProductDetail.name) {
				document.title = stateProductDetail.name + " | Blanja";
			} else {
				document.title = "Loading... | Blanja";
			}
		} catch {
			document.title = "404 Not Found | Blanja";
		}
	}, [stateProductDetail]);

	React.useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollIntoView();
		}
	}, [props.match.params.id]);

	const onClickHandler = (id) => {
		props.history.push(`/product/detail/${id}`);
	};

	const joinedAdrress = `${stateAuth.address}, ${stateAuth.city_of_subdistrict}, ${stateAuth.postal_code}, ${stateAuth.recipient_telp_number}`;

	const kirim = () => {
		const sendData = {
			brand: stateProductDetail.brand,
			id: stateProductDetail.id,
			images: stateProductDetail.images[0],
			name: stateProductDetail.name,
			price: Number(stateProductDetail.price),
			qty: qty,
			seller_id: stateProductDetail.seller_id,
			seller_name: stateProductDetail.seller_name,
			selected: true,
		};
		dispatch(addToCart(sendData));
		props.history.push("/mybag");
	};

	if (isPending) {
		return <Loader />;
	} else {
		if (isEmpty(stateProductDetail)) {
			return <NotFound />;
		} else {
			const index = stateCart.findIndex((item) => {
				return item.id === stateProductDetail.id;
			});
			return (
				<div className={classname(styles.body)} ref={divRef}>
					<div className={classname(styles.topContainer)}>
						<div className={classname(styles.imgProductContainer)}>
							<div
								className={classname(
									styles.mainProductImgContainer
								)}
							>
								{stateProductDetail.images !== undefined ? (
									<ReactImageZoom
										// alt="product_img"
										// className={classname(styles.productMainImg)}
										width={378}
										height={378}
										zoomPosition="original"
										img={`${API_URL}${stateProductDetail.images[imgId]}`}
									/>
								) : null}
							</div>
							<div
								className={classname(
									styles.secondaryProductImgContainer
								)}
							>
								<div
									className={classname(
										styles.secondaryProductImg
									)}
								>
									{stateProductDetail.images !== undefined
										? stateProductDetail.images.map(
												(image, index) => {
													return (
														<img
															key={index}
															alt=""
															className={classname(
																styles.exampleImg
															)}
															src={`${API_URL}${image}`}
															onClick={() => {
																setImgId(index);
															}}
														/>
													);
												}
										  )
										: null}
								</div>
							</div>
						</div>
						<div style={{ marginLeft: 28 }}>
							<p style={{ fontWeight: 600, fontSize: 28 }}>
								{stateProductDetail.name}
							</p>
							<p
								style={{
									fontWeight: 500,
									fontSize: 16,
									marginTop: 10,
								}}
							>
								{stateProductDetail.brand}
							</p>
							{/* <p style={{ marginTop: 15.29 }}>[rating]</p> */}
							<Rating rating={rating} />
							<p
								style={{
									fontWeight: 500,
									fontSize: 16,
									marginTop: 31.29,
								}}
							>
								Price
							</p>
							<p
								style={{
									fontWeight: "bold",
									fontSize: 33,
									marginTop: 10,
								}}
							>
								Rp
								{Number(
									stateProductDetail.price
								).toLocaleString("id-ID")}
							</p>
							<p
								style={{
									fontWeight: 600,
									fontSize: 16,
									marginTop: 10,
								}}
							>
								color
							</p>
							<div className={classname(styles.colorContainer)}>
								<button
									className={classname(styles.colorBtn)}
									style={{ backgroundColor: "#1A1A1A" }}
								></button>
								<button
									className={classname(styles.colorBtn)}
									style={{ backgroundColor: "#D84242" }}
								></button>
								<button
									className={classname(styles.colorBtn)}
									style={{ backgroundColor: "#4290D8" }}
								></button>

								<button
									className={classname(styles.colorBtn)}
									style={{ backgroundColor: "#42D86C" }}
								></button>
							</div>
							<div className={classname(styles.sizeQtyTxtCont)}>
								<div>
									<p className={classname(styles.sizeQtyTxt)}>
										size
									</p>
								</div>
								<div>
									<p className={classname(styles.sizeQtyTxt)}>
										quantity
									</p>
								</div>
							</div>
							<div className={classname(styles.sizeQtyActCont)}>
								<button
									className={classname(styles.sizeQtyBtn)}
								>
									<p
										style={{
											fontSize: 50,
											marginTop: -20.5,
										}}
									>
										-
									</p>
								</button>
								<p
									style={{
										marginTop: 5,
										fontSize: 16,
										marginLeft: 10,
									}}
								>
									28
								</p>

								<button
									className={classname(styles.sizeQtyBtn)}
									style={{ marginLeft: 10 }}
								>
									<p
										style={{
											fontSize: 30,
											marginTop: -3.5,
										}}
									>
										+
									</p>
								</button>
								<button
									className={classname(styles.sizeQtyBtn)}
									style={{ marginLeft: 80 }}
									onClick={() => {
										if (qty === 1) {
											return;
										} else {
											setQty(qty - 1);
										}
									}}
								>
									<p
										style={{
											fontSize: 50,
											marginTop: -20.5,
										}}
									>
										-
									</p>
								</button>
								<p
									style={{
										marginTop: 5,
										fontSize: 16,
										marginLeft: 10,
									}}
								>
									{qty}
								</p>

								<button
									className={classname(styles.sizeQtyBtn)}
									style={{ marginLeft: 10 }}
									onClick={() => {
										setQty(qty + 1);
									}}
								>
									<p
										style={{
											fontSize: 30,
											marginTop: -3.5,
										}}
									>
										+
									</p>
								</button>
							</div>
							<div
								className={classname(styles.actionBtnContainer)}
							>
								<button
									className={classname(styles.chatAddBtn)}
									onClick={() => {
										props.history.push(
											`/chat?with=${stateProductDetail.seller_id}&name=BestStore&link=${WEB_URL}${props.location.pathname}`
										);
									}}
								>
									chat
								</button>
								{index >= 0 ? (
									<button
										style={{
											backgroundColor: "#222222",
											color: "white",
										}}
										className={classname(styles.chatAddBtn)}
									>
										item already in bag
									</button>
								) : (
									<button
										className={classname(styles.chatAddBtn)}
										onClick={() =>
											dispatch(
												addToCart({
													brand:
														stateProductDetail.brand,
													id: stateProductDetail.id,
													images:
														stateProductDetail
															.images[0],
													name:
														stateProductDetail.name,
													price: Number(
														stateProductDetail.price
													),
													qty: qty,
													seller_id:
														stateProductDetail.seller_id,
													seller_name:
														stateProductDetail.seller_name,
													selected: false,
												})
											)
										}
									>
										add bag
									</button>
								)}

								<button
									className={classname(styles.buyBtn)}
									onClick={kirim}
								>
									buy now
								</button>
							</div>
						</div>
					</div>
					<div style={{ marginTop: 38 }}>
						<p style={{ fontSize: 28, fontWeight: 600 }}>
							Product Information
						</p>
						<p
							style={{
								marginTop: 40,
								fontSize: 20,
								fontWeight: 600,
							}}
						>
							Condition
						</p>
						<p
							style={{
								marginTop: 10,
								fontSize: 28,
								color: "red",
								fontWeight: 500,
							}}
						>
							{stateProductDetail.status}
						</p>
						<p
							style={{
								marginTop: 40,
								fontSize: 20,
								fontWeight: 600,
							}}
						>
							Description
						</p>
						<p
							style={{
								marginTop: 10,
								fontSize: 14,
								whiteSpace: "pre-wrap",
							}}
						>
							{stateProductDetail.description}
						</p>
						<p
							style={{
								fontSize: 28,
								fontWeight: 600,
								marginTop: 50,
							}}
						>
							Product review
						</p>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							marginTop: 50,
						}}
					>
						<p style={{ fontSize: 60, fontWeight: 500 }}>
							{rating.toFixed(1)}
						</p>
						<p
							style={{
								fontSize: 20,
								display: "flex",
								alignSelf: "center",
								marginTop: 5,
								color: "#9B9B9B",
							}}
						>
							/10
						</p>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								marginLeft: 60.64,
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									alt=""
									style={{
										marginBottom: 8.57,
										height: 15.43,
										width: 16.71,
									}}
									src={starMedium}
								/>
								<p style={{ marginLeft: 10.64 }}>5</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									alt=""
									style={{
										marginBottom: 8.57,
										height: 15.43,
										width: 16.71,
									}}
									src={starMedium}
								/>
								<p style={{ marginLeft: 10.64 }}>4</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									alt=""
									style={{
										marginBottom: 8.57,
										height: 15.43,
										width: 16.71,
									}}
									src={starMedium}
								/>
								<p style={{ marginLeft: 10.64 }}>3</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									alt=""
									style={{
										marginBottom: 8.57,
										height: 15.43,
										width: 16.71,
									}}
									src={starMedium}
								/>
								<p style={{ marginLeft: 10.64 }}>2</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									alt=""
									style={{
										marginBottom: 8.57,
										height: 15.43,
										width: 16.71,
									}}
									src={starMedium}
								/>
								<p style={{ marginLeft: 10.64 }}>1</p>
							</div>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							marginTop: -30,
						}}
					>
						{star.map((item, index) => {
							return (
								<img
									alt={`star-${index}`}
									style={{
										marginRight: 8.57,
										height: 20.57,
										width: 22.29,
									}}
									src={starMedium}
								/>
							);
						})}
						{/* <img
							alt=""
							style={{
								marginRight: 8.57,
								height: 20.57,
								width: 22.29,
							}}
							src={starMedium}
						/>
						<img
							alt=""
							style={{
								marginRight: 8.57,
								height: 20.57,
								width: 22.29,
							}}
							src={starMedium}
						/>
						<img
							alt=""
							style={{
								marginRight: 8.57,
								height: 20.57,
								width: 22.29,
							}}
							src={starMedium}
						/>
						<img
							alt=""
							style={{
								marginRight: 8.57,
								height: 20.57,
								width: 22.29,
							}}
							src={starMedium}
						/>
						<img
							alt=""
							style={{
								marginRight: 8.57,
								height: 20.57,
								width: 22.29,
							}}
							src={starMedium}
						/> */}
					</div>
					<hr style={{ marginTop: 51.29, borderColor: "black" }} />
					<div style={{ marginTop: 50 }}>
						<p style={{ fontSize: 34, fontWeight: 700 }}>
							You can also like this
						</p>
						<p style={{ fontSize: 12 }}>
							You've never seen it before
						</p>
						<div
							className={classname(
								"row",
								"no-gutters",
								styles.mt25
							)}
						>
							{stateProduct.map((item) => {
								return (
									<Card
										key={item.id}
										{...item}
										onClickProp={onClickHandler}
									/>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	}
};

export default PageProduct;
