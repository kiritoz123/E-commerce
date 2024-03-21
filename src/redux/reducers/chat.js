import * as at from "../actions/actionTypes";

const chatReducer = (
	state = {
		chatFetched: false,
		fetchingChat: false,
		chatSynced: false,
		syncingChat: false,
	},
	{ type }
) => {
	switch (type) {
		case at.FETCHING_CHAT_DATA + at.PENDING:
			return {
				...state,
				chatFetched: false,
				fetchingChat: true,
			};
		case at.FETCHING_CHAT_DATA + at.FULFILLED:
			return {
				...state,
				chatFetched: true,
				fetchingChat: false,
			};
		case at.SYNC_CHAT_TO_SERVER + at.PENDING:
			return {
				...state,
				chatSynced: false,
				syncingChat: true,
			};
		case at.SYNC_CHAT_TO_SERVER + at.FULFILLED:
			return {
				...state,
				chatSynced: true,
				syncingChat: false,
			};
		default:
			return state;
	}
};

export default chatReducer;
