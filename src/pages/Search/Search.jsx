import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card";
import styles from "./styles.module.css";
import classname from "../../helpers/classJoiner";
import text from "../../assets/text.module.css";
import { newData, categoryData } from "../../utils/dummydata";
import { fetchAllProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Search = (props) => {
	const currentPath = props.location.pathname;
	const nameQuery = props.location.search.split("=");
	const dispatch = useDispatch();
	const { product: stateProduct, isPending } = useSelector(
		(state) => state.product
	);
	const onClickHandler = (id) => {
		props.history.push(`/product/detail/${id}`);
	};
	React.useEffect(() => {
		document.title = `Search for "${nameQuery[1]}" | Blanja`;
	}, [nameQuery]);

	React.useEffect(() => {
		if (nameQuery) dispatch(fetchAllProduct(null, nameQuery[1]));
	}, [props.location.search]);

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className={styles.category}>
			<nav className={classname(styles.nav)}>
				<a className={classname(text.descriptiveItems)} href="/">
					Home
				</a>
				<ul className={styles.ul}>
					<li className={classname(text.descriptiveItems)}>
						{">"} <a href={`${currentPath}`}>Search</a>
					</li>
				</ul>
			</nav>
			<h5 className={classname(text.headline, styles.title)}>
				Search for "{nameQuery[1]}"
			</h5>
			<div className={classname("row", "no-gutters", styles.mt25)}>
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
	);
};

Search.propTypes = {
	route: PropTypes.string,
};

export default Search;
