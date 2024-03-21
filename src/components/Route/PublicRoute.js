import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, enableNavbar, ...rest }) => {
	return (
		<>
			<Route
				{...rest}
				path={rest.path}
				render={(props) => {
					return (
						<>
							{enableNavbar ? <Navbar {...props} /> : null}
							<Component {...props} />
						</>
					);
				}}
			/>
		</>
	);
};

export default PublicRoute;
