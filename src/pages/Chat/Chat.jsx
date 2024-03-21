import React from "react";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
import useLocalStorage from "../../utils/localStorageHooks";
import Socket from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import text from "../../assets/text.module.css";
import classname from "../../helpers/classJoiner";
import { isEmpty } from "underscore";
import { DateTime } from "luxon";
import { update } from "ramda";
import { syncFromServer, syncWithLocal } from "../../utils/reqData";
import {
	fetchingChatData,
	fetchingChatDataComplete,
	syncingChatData,
	syncingChatDataComplete,
} from "../../redux/actions/chat";
import { SOCKET_URL } from "../../utils/environment";
import Loader from "../../components/Loader/Loader";

/**
 * message shape
 */
/*
const messageShape = [{
	user1:{
		id,
		name,
		avatar
	},
	user2:{
		id,
		name,
		avatar
	},
	messages:[{
		id,
		message,
		time
	},...]
},...]
*/

const linkRegx = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#]?[\w-]+)*\/?/gm;

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const renderChat = ({ messages }, id) => {
	return (
		<>
			{messages.map((item, index) => {
				const link = item.message.match(linkRegx);
				const slicedMessage = item.message.split(" ");
				if (item.id !== id) {
					return (
						<>
							<div
								key={index}
								className={classname(styles.otherchat)}
							>
								<p key={index}>
									{link
										? slicedMessage.map((item) => {
												const isLink = link.findIndex(
													(li) => {
														return li === item;
													}
												);
												if (isLink >= 0) {
													return (
														<a href={item}>
															{item}{" "}
														</a>
													);
												} else {
													return item + " ";
												}
										  })
										: item.message}
								</p>
							</div>
							<p>{item.time}</p>
						</>
					);
				} else {
					return (
						<>
							<div
								key={index}
								className={classname(styles.mychat)}
							>
								<p key={index}>
									{link
										? slicedMessage.map((item) => {
												const isLink = link.findIndex(
													(li) => {
														return li === item;
													}
												);
												if (isLink >= 0) {
													return (
														<a href={item}>
															{item}{" "}
														</a>
													);
												} else {
													return item + " ";
												}
										  })
										: item.message}
								</p>
							</div>
							<p className="text-right">{item.time}</p>
						</>
					);
				}
			})}
		</>
	);
};

const appendMessage = (message, { messages }) => {
	const newMessage = [...messages];
	newMessage.push(message);
	return newMessage;
};

const Chat = (props) => {
	// const [myId, setId] = React.useState(uuidv4());
	const { user } = useSelector((state) => state.auth);
	const { chatFetched, fetchingChat, syncingChat } = useSelector(
		(state) => state.chat
	);
	const [idx, setIdx] = React.useState(-1);
	const [socket, setSocket] = React.useState(null);
	const [messages, setMessage] = useLocalStorage(user.id, []);
	const dispatch = useDispatch();

	React.useEffect(() => {
		document.title = "Chat | Blanja";
	}, []);

	async function fetchChatData() {
		try {
			dispatch(fetchingChatData());
			const response = await syncFromServer(user.id);
			setMessage(response.data.data);
			dispatch(fetchingChatDataComplete());
		} catch (err) {
			return [];
		}
	}

	const syncToServer = async (data) => {
		try {
			dispatch(syncingChatData());
			const res = await syncWithLocal(data);
			dispatch(syncingChatDataComplete());
		} catch (err) {
			//do nothing
		}
	};

	const fetchFromUrl = React.useCallback(() => {
		const query = props.location.search.split("&");
		let seller_id = null;
		let seller_name = null;
		let link = null;
		if (query[0]) {
			seller_id = Number(query[0].split("=")[1]);
		}
		if (query[1]) {
			seller_name = query[1].split("=")[1];
		}
		if (query[2]) {
			link = query[2].split("=")[1];
		}

		if (seller_id) {
			const _idx = messages.findIndex((item) => {
				return (
					item.user1.id === seller_id || item.user2.id === seller_id
				);
			});
			if (_idx < 0) {
				const newMessages = [
					...messages,
					{
						user1: {
							id: seller_id,
							name: seller_name,
							avatar: null,
						},
						user2: {
							id: user.id,
							name: user.name,
							avatar: user.avatar,
						},
						messages: [],
					},
				];
				setMessage(newMessages);
				setIdx(newMessages.length - 1);
				setInputValue("apakah ini masih ada?\n " + link);
			} else {
				setInputValue("apakah ini masih ada?\n " + link);
				setIdx(_idx);
			}
		}
	}, [props.location.search]);

	// fetch chat data from server
	React.useEffect(() => {
		if (!chatFetched) {
			fetchChatData(user.id);
		}
		if (chatFetched && !fetchingChat) {
			fetchFromUrl();
		}
	}, [chatFetched, fetchingChat]);

	//sync chat data to server
	React.useEffect(() => {
		if (idx >= 0 && !isEmpty(messages[idx])) {
			if (!syncingChat) {
				syncToServer({ messages: messages[idx] });
			}
		}
	}, [messages]);

	const [inputValue, setInputValue] = React.useState("");

	const inputRef = React.useRef();

	const messageRef = React.useRef();

	const testRef = React.useRef();

	//intialize socket
	React.useEffect(() => {
		if (socket !== null) return;
		const newSocket = Socket(SOCKET_URL, {
			query: { id: user.id },
		});
		setSocket(newSocket);
		return () => {
			if (socket) socket.close();
		};
	}, [user.id]);

	//subscribe to socket event
	React.useEffect(() => {
		if (socket === null) return;
		socket.on("message", ({ senderId, name, avatar, message, time }) => {
			const _idx = messages.findIndex((item) => {
				return item.user1.id === senderId || item.user2.id === senderId;
			});
			if (_idx >= 0) {
				setMessage(
					update(
						_idx,
						{
							...messages[_idx],
							messages: appendMessage(
								{
									id: senderId,
									message,
									time,
								},
								messages[_idx]
							),
						},
						messages
					)
				);
			} else {
				const newMessages = [
					...messages,
					{
						user1: {
							id: user.id,
							name: user.name,
							avatar: user.avatar,
						},
						user2: {
							id: Number(senderId),
							name: name,
							avatar: avatar,
						},
						messages: [{ id: senderId, message, time }],
					},
				];
				setMessage(newMessages);
			}
			if (messageRef.current !== undefined) {
				scrollToRef(messageRef);
			}
		});
		return () => socket.off("message");
	}, [socket, messages, messageRef]);

	const inputHandler = (e) => {
		if (e.key === "Enter") {
			if (inputValue === "") {
				return;
			}
			const time = DateTime.local().toFormat("hh:mm dd-MM-yyyy");
			if (!isEmpty(messages[idx].messages)) {
				setMessage(
					update(
						idx,
						{
							...messages[idx],
							messages: appendMessage(
								{
									id: user.id,
									message: inputRef.current.value,
									time,
								},
								messages[idx]
							),
						},
						messages
					)
				);
			} else {
				setMessage(
					update(
						idx,
						{
							...messages[idx],
							messages: [
								{
									id: user.id,
									message: inputRef.current.value,
									time,
								},
							],
						},
						messages
					)
				);
			}
			socket.emit("message", {
				senderId: user.id,
				receiverId:
					messages[idx].user1.id !== user.id
						? messages[idx].user1.id
						: messages[idx].user2.id,
				name: user.name,
				avatar: user.avatar,
				message: inputRef.current.value,
				time,
			});
			setInputValue("");
			if (messageRef.current !== undefined) {
				scrollToRef(messageRef);
			}
		}
	};

	//for testing purpose ================================
	const handleTest = (event) => {
		if (event.key === "Enter") {
			const _idx = messages.findIndex((item) => {
				return item.id === testRef.current.value;
			});
			if (_idx < 0) {
				const newMessages = [
					...messages,
					{
						id: testRef.current.value,
						name: testRef.current.value,
						avatar: null,
						messages: [],
					},
				];
				setMessage(newMessages);
			}
			testRef.current.value = "";
		}
	};

	//=====================================================

	const onClickHandler = (id) => {
		setIdx(
			messages.findIndex((message) => {
				return message.user1.id === id || message.user2.id === id;
			})
		);
	};

	if (fetchingChat) {
		return <Loader />;
	}

	return (
		<>
			<div className={classname(styles.chat)}>
				{/* <input
					ref={testRef}
					placeholder="masukin id"
					onKeyPress={handleTest}
				/> */}
				<div className={classname(styles.chatlistContainer)}>
					<div className={classname(styles.chatlistHeader)}>
						<h1 className={classname(text.headline2)}>Chats</h1>
					</div>
					{!isEmpty(messages) ? (
						<div className={classname(styles.chatlist)}>
							{messages.map((item) => {
								return (
									<UserCard
										key={String(item.id)}
										lastChat={
											!isEmpty(item.messages)
												? item.messages[
														item.messages.length - 1
												  ].message
												: ""
										}
										name={
											item.user1.id !== user.id
												? item.user1.name
												: item.user2.name
										}
										avatar={
											item.user1.id !== user.id
												? item.user1.avatar
												: item.user2.avatar
										}
										id={
											item.user1.id !== user.id
												? item.user1.id
												: item.user2.id
										}
										onClick={onClickHandler}
									/>
								);
							})}
						</div>
					) : (
						<h1
							className={classname(text.headline2, styles.nochat)}
						>
							You haven't chat with anyone!
						</h1>
					)}
				</div>
				<div className={classname(styles.chatroomContainer)}>
					{idx >= 0 && !isEmpty(messages) ? (
						<>
							<div className={classname(styles.chatroomHeader)}>
								<UserCard
									key={
										messages[idx].user1.id !== user.id
											? String(messages[idx].user1.id)
											: String(messages[idx].user2.id)
									}
									name={
										messages[idx].user1.id !== user.id
											? messages[idx].user1.name
											: messages[idx].user2.name
									}
									avatar={
										messages[idx].user1.id !== user.id
											? messages[idx].user1.avatar
											: messages[idx].user2.avatar
									}
								/>
							</div>
							<div
								ref={messageRef}
								className={classname(styles.chatroom)}
							>
								{!isEmpty(messages[idx].messages) ? (
									renderChat(messages[idx], user.id)
								) : (
									<h1
										className={classname(
											text.headline2,
											styles.nochat
										)}
									>
										Send your first message!
									</h1>
								)}
							</div>
							<div
								className={classname(
									styles.inputmessageContainer
								)}
							>
								<textarea
									ref={inputRef}
									placeholder="type message"
									className={classname(styles.inputmessage)}
									onKeyPress={inputHandler}
									onChange={(e) => {
										setInputValue(e.target.value);
									}}
									value={inputValue}
								/>
							</div>
						</>
					) : (
						<h1
							className={classname(text.headline2, styles.nochat)}
						>
							Select chat to start chatting!
						</h1>
					)}
				</div>
			</div>
		</>
	);
};

Chat.propTypes = {};

export default Chat;
