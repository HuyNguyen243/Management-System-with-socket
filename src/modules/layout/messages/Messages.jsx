import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../../_services/socket';
import { NAME_ROOM } from '../../../constants';
import { getCurrentRoom, setIsOpenChat, getMsgsByIdSystem } from '../../../redux/messages/messageSlice';
import { timeAgo } from '../../../commons/message.common';
import { CharacterRoom } from '../../../commons/message.common';
import { UserRules } from '../../../constants';

const Messages = ({ isOpenMessages, setisOpenMessages }) => {
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const currentUser = useSelector((state) => state.message.currentUser);
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.message.allGroups);
	const members = useSelector((state) => state.message.allMembers);
	const userReminders = useSelector((state) => state.auth.userReminders);

	useEffect(() => {
		if (user?.data) {
			socket.emit('messages-by-id-system', user?.data?.id_system);
		}
	}, [user]);

	socket.off('messages-by-id-system').on('messages-by-id-system', (payload) => {
		setMessages(payload);
		dispatch(getMsgsByIdSystem(payload));
	});

	socket.off('user-send-message').on('user-send-message', () => {
		socket.emit('messages-by-id-system', user?.data?.id_system);
	});

	const replaceName = (id, only_id = false) => {
		if (id.includes(NAME_ROOM.USER)) {
			const newID = id.replace(user?.data?.id_system, '').replace(/-/g, '').replace(NAME_ROOM.USER, '');
			if (currentUser?.role === UserRules.ROLE.ADMIN) {
				if (Array.isArray(members))
					for (const member of members) {
						if (member?.id_system === newID) {
							if (only_id) {
								return member?.id_system;
							}
							return member?.fullname;
						}
					}
			} else {
				return newID;
			}
		}
		if (id.includes(NAME_ROOM.GROUP)) {
			const newId = id.replace(/-/g, '').replace(NAME_ROOM.GROUP, '');
			if (groups?.length > 0) {
				for (const group of groups) {
					if (newId === group?._id) {
						return group?.name;
					}
				}
			}
		}
	};

	const handleOpenMessages = (room, nameRoom) => {
		const result = {
			name: nameRoom,
			room: room,
		};

		if (room.includes(NAME_ROOM.GROUP)) {
			result.type = NAME_ROOM.GROUP;
		} else {
			for (let member of members) {
				if (member.id_system === nameRoom) {
					result.type = member?.role;
					break;
				}
			}
		}
		socket.emit('reset-notifications', result?.room, currentUser?.id_system);
		dispatch(getCurrentRoom(result));
		dispatch(setIsOpenChat(true));
		setisOpenMessages(false);
	};

	const setCharacterForImage = (name, type) => {
		if (name && type) {
			if (type === NAME_ROOM.USER) {
				if (members?.length > 0) {
					for (let member of members) {
						if (member.id_system === name) {
							return CharacterRoom(member.role);
						}
						if (member?.fullname === name && currentUser?.role === UserRules.ROLE.ADMIN) {
							return CharacterRoom(member?.fullname?.charAt(0).toUpperCase());
						}
					}
				}
			} else if (type === NAME_ROOM.GROUP) {
				return name?.charAt(0) + name?.charAt(1);
			}
		}
	};

	const checkNameReminder = (id) => {
		if (user?.data?.role !== UserRules?.ROLE?.ADMIN && userReminders?.data?.data) {
			const reminders = userReminders?.data?.data;

			for (let i = 0; i < reminders.length; i++) {
				if (reminders[i]?._id?.id_system === id) {
					return reminders[i]?._id?.infor_reminder;
				}
			}
		} else {
			return id;
		}
	};

	return (
		<div className={`notification-message__container ${!isOpenMessages && 'hidden'}`}>
			<div className='notification-message__title'>
				<h5>Messages</h5>
			</div>
			<div className='mess_notification'>
				{messages?.length > 0 ? (
					messages.map((item, index) => {
						const name = checkNameReminder(replaceName(item?._id));
						return (
							<div
								className='notification-message__block '
								key={index}
								onClick={() => handleOpenMessages(item._id, replaceName(item?._id, true))}
							>
								<div
									className={`notification-message__it align-items-center 
                                ${
									currentUser?.newMessages &&
									Object.keys(currentUser?.newMessages)?.includes(item?._id) &&
									'active'
								}`}
									style={{ paddingLeft: '10px' }}
								>
									<div
										className='chat_img'
										data='ADMIN'
										role={setCharacterForImage(replaceName(item?._id), item.type)}
									></div>
									<div className='notification-message_item'>
										<p className='notification-message__name flex justify-content-between'>
											<span>{name}</span>
											<span className='notification__time'>{timeAgo(item?.time)}</span>
										</p>
										<div className='notification-message__i'>
											<p
												className={`
                                            notification-message__note
                                            ${
												currentUser?.newMessages &&
												Object.keys(currentUser?.newMessages)?.includes(item?._id) &&
												'active'
											}
                                            `}
											>
												{item?.from === user?.data?.id_system ? 'B???n: ' : ''}
												{item?.content !== '' ? item.content : '???? g???i m???t h??nh ???nh'}
											</p>
											{currentUser?.newMessages &&
												Object.keys(currentUser?.newMessages)?.includes(item?._id) && (
													<label
														className='notification-message__alert'
														data-count={currentUser?.newMessages?.[item?._id]}
													></label>
												)}
										</div>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p className='empty_data'>Tr???ng</p>
				)}
			</div>
		</div>
	);
};

export default Messages;
