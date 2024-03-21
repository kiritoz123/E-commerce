import { combineReducers } from "redux";
import authReducer from "./auth";
import productReducer from "./product";
import chatReducer from "./chat";

const indexReducer = combineReducers({
	auth: authReducer,
	product: productReducer,
	chat: chatReducer,
});

export default indexReducer;
