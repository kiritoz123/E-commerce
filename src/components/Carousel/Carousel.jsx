import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import useWindowDimensions from "../../utils/viewportHooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "../ImgWithContainer/ImgWithContainer";
import text from "../../assets/text.module.css";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import "./carousel.css";
import leftArrow from "../../assets/img/left.png";
import rigthArrow from "../../assets/img/right.png";

const colors = [
	styles.red,
	styles.green,
	styles.blue,
	styles.orange,
	styles.pink,
	styles.darkblue,
	styles.yellowishgreen,
	styles.teal,
	styles.purple,
	styles.lightpink,
	styles.lightpurple,
	styles.tosca,
	styles.brightblue,
	styles.lightgreen,
	styles.gold,
	styles.lightred,
];

const CustomLeftArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<Img
			key="leftarrow"
			style={style}
			containerStyle={classname(className, styles.arrowLeft)}
			imgStyle={styles.arrowImg}
			onClick={onClick}
			source={leftArrow}
		/>
	);
};

const CustomRightArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<Img
			key="rightarrow"
			style={{ ...style }}
			containerStyle={classname(className, styles.arrowRight)}
			imgStyle={styles.arrowImg}
			onClick={onClick}
			source={rigthArrow}
		/>
	);
};

const PreviewItem = (props) => {
	return (
		<div className={styles.previewlItem}>
			<Img
				key={props.id}
				containerStyle={styles.previewlItem}
				imgStyle={styles.previewImg}
				source={props.image}
			/>
			<p className={classname(text.headline, styles.legendText)}>
				{props.desc}
			</p>
		</div>
	);
};

const CategoryItem = (props) => {
	const color = colors[props.id - 1];
	return (
		<div
			className={styles.categoryItem}
			onClick={() => {
				props.onClickHandler(props.id);
			}}
		>
			<Img
				key={props.id}
				containerStyle={classname(styles.categoryItem, color)}
				imgStyle={styles.categoryImg}
				source={props.image}
			/>
			<p className={classname(text.headline, styles.legendText)}>
				{props.name}
			</p>
		</div>
	);
};

const getSettingsPreview = (width) => {
	const centerPadding = Math.abs(Math.round(-0.44 * width + 780));
	return {
		className: "center",
		centerMode: true,
		infinite: true,
		//TODO: make center padding dynamic
		centerPadding: `-${centerPadding}px`,
		slidesToShow: 3,
		speed: 500,
		autoplay: true,
		nextArrow: <CustomRightArrow /> ,
		prevArrow: <CustomLeftArrow />,
		arrows: true,
		dots: true,
		appendDots: (dots) => (
			<div
				style={{
					borderRadius: "10px",
					padding: "0",
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				<ul
					style={{
						margin: "0px",
						padding: "0px",
					}}
				>
					{dots}
				</ul>
			</div>
		),
	};
};

const settingsCategory = (width) => {
	const centerPadding = Math.round(0.44 * width - 300);
	return {
		speed: 500,
		infinite: true,
		className: "center",
		centerMode: true,
		centerPadding: `${centerPadding}px`,
		slidesToShow: 2,
		swipeToSlide: true,
		nextArrow: <CustomRightArrow />,
		prevArrow: <CustomLeftArrow />,
		arrows: true,
	};
};

const Carousel = (props) => {
	const { width } = useWindowDimensions();
	const onClickHandler = (id) => {
		props.history.push(`/category/${id}`);
	};
	const settings =
		props.carouselType === "previewItem"
			? getSettingsPreview(width)
			: settingsCategory(width);
	return (
		<Slider {...settings}>
			{props.carouselType === "previewItem"
				? props.data.map((item, index) => {
						return <PreviewItem key={index} {...item} />;
				  })
				: props.data.map((item, index) => {
						return (
							<CategoryItem
								onClickHandler={onClickHandler}
								key={index}
								{...item}
							/>
						);
				  })}
		</Slider>
	);
};

Carousel.propTypes = {
	data: PropTypes.array,
	carouselType: PropTypes.string,
	history: PropTypes.object,
};

export default Carousel;
