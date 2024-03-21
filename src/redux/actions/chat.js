import * as at from "./actionTypes";

export const fetchingChatData = () => {
	return {
		type: at.FETCHING_CHAT_DATA + at.PENDING,
	};
};
export const fetchingChatDataComplete = () => {
	return {
		type: at.FETCHING_CHAT_DATA + at.FULFILLED,
	};
};

export const syncingChatData = () => {
	return {
		type: at.SYNC_CHAT_TO_SERVER + at.PENDING,
	};
};

export const syncingChatDataComplete = () => {
	return {
		type: at.SYNC_CHAT_TO_SERVER + at.FULFILLED,
	};
};
