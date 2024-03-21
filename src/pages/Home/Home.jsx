import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import styles from "./styles.module.css";
import classname from "../../helpers/classJoiner";
import text from "../../assets/text.module.css";
import { previewData, categoryData, newData } from "../../utils/dummydata";
import { fetchAllProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Home = (props) => {
	const dispatch = useDispatch();
	const { product: stateProduct, isPending } = useSelector(
		(state) => state.product
	);

	const onClickHandler = (id) => {
		props.history.push(`/product/detail/${id}`);
	};

	useEffect(() => {
		document.title = "Mau belanja? ya di Blanja! | Blanja";
		dispatch(fetchAllProduct());
	}, [dispatch]);

	if (isPending) {
		return <Loader />;
	}

	return (
		<main className={styles.home}>
			<div style={{ marginBottom: "50px" }}>
				<Carousel
					key="1"
					carouselType="previewItem"
					data={previewData}
				/>
			</div>
			<div style={{ marginBottom: "50px" }}>
				<h1 className={text.headline}>Category</h1>
				<p
					className={classname(
						text.helperText,
						styles.marginbottom30
					)}
				>
					What are you currently looking for
				</p>
				<Carousel
					key="2"
					carouselType="categoryItem"
					data={categoryData}
					history={props.history}
				/>
			</div>
			<h1 className={text.headline}>New</h1>
			<p className={classname(text.helperText, styles.marginbottom30)}>
				You’ve never seen it before!
			</p>
			<div className="w-100">
				<div
					className={classname(
						styles.marginbottom50,
						"row",
						"no-gutters"
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
			<h1 className={text.headline}>Popular</h1>
			<p className={classname(text.helperText, styles.marginbottom30)}>
				Find clothes that are trending recently
			</p>
			<div className="w-100">
				<div
					className={classname(
						"row",
						"no-gutters",
						"d-flex flex-row"
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
		</main>
	);
};

Home.propTypes = {};

export default Home;
