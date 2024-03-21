import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card";
import styles from "./styles.module.css";
import classname from "../../helpers/classJoiner";
import text from "../../assets/text.module.css";
import { newData, categoryData } from "../../utils/dummydata";
import { fetchAllProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../components/NotFound/NotFound";
import { isEmpty } from "underscore";
import Loader from "../../components/Loader/Loader";

const Category = (props) => {
	const currentPath = props.location.pathname;
	const dispatch = useDispatch();
	const { product: stateProduct, isPending } = useSelector(
		(state) => state.product
	);
	const onClickHandler = (id) => {
		props.history.push(`/product/detail/${id}`);
	};

	React.useEffect(() => {
		dispatch(fetchAllProduct(Number(props.match.params.id)));
	}, [dispatch, props.match.params.id]);

	const idx = categoryData.findIndex((item) => {
		return item.id === Number(props.match.params.id);
	});

	React.useEffect(() => {
		try {
			document.title = categoryData[idx].name + " | Blanja";
		} catch {
			document.title = "404 Not Found | Blanja";
		}
	}, []);
	if (isPending) {
		return <Loader />;
	}
	if (idx < 0) {
		return <NotFound />;
	}
	return (
		<div className={styles.category}>
			<nav className={classname(styles.nav)}>
				<a className={classname(text.descriptiveItems)} href="/">
					Home
				</a>
				<ul className={styles.ul}>
					<li className={classname(text.descriptiveItems)}>
						{">"} <a href={`${currentPath}`}>Category</a>
					</li>
					<li className={classname(text.descriptiveItems)}>
						{">"}{" "}
						<a href={`${currentPath}`}>{categoryData[idx].name}</a>
					</li>
				</ul>
			</nav>
			<h5 className={classname(text.headline, styles.title)}>
				{categoryData[idx].name}
			</h5>
			<div className={classname("row", "no-gutters", styles.mt25)}>
				{isEmpty(stateProduct) ? (
					<h1>No product found with this category.</h1>
				) : (
					stateProduct.map((item) => {
						return (
							<Card
								key={item.id}
								{...item}
								onClickProp={onClickHandler}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

Category.propTypes = {
	route: PropTypes.string,
};

export default Category;
