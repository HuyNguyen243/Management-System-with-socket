import React, { useState, useEffect, useRef } from 'react';
import Index from './rooms/Index';
import { socket } from '../../../_services/socket';
import { getFormattedDate } from '../../../commons/message.common';
import { NAME_ROOM } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenChat, userScrollTop, groupScrollTop, userViewScrollTop } from '../../../redux/messages/messageSlice';
import { postImagesMessage } from '../../../redux/messages/action';

import Modal from './Modal';
import { UserRules } from '../../../constants';
import Messages from './Messages';

const BoxChat = () => {
	//MEMBER
	const [members, setMembers] = useState([]);
	const [privateMemberMsg, setPrivateMemberMsg] = useState('');
	//GENERAL
	const [currentUser, setCurrentUser] = useState({});
	const [messages, setMessages] = useState('');
	const [currentRoom, setCurrentRoom] = useState(undefined);
	const [namePrivateRoom, setNamePrivateRoom] = useState('');
	const [messagesOnRoom, setMessageOnRoom] = useState([]);
	const [role, setRole] = useState('');
	//GROUP
	const [groups, setGroups] = useState([]);
	const [groups_id, setGroups_id] = useState('');
	const [membersInGroup, setMembersInGroup] = useState([]);
	const [privateGroupMsg, setPrivateGroupMsg] = useState('');

	const [multiPreviewImages, setMultiPreviewImages] = useState([]);
	const [multiImages, setMultiImages] = useState([]);
	const [images, setImages] = useState([]);
	const [scrollBottom, setScrollBottom] = useState(false);

	const dispatch = useDispatch();
	const isOpenChat = useSelector((state) => state.message.isOpenChat);
	const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false);
	const [nameModal, setNameModal] = useState('');
	const [editDataGroup, setEditDataGroup] = useState({});
	const user = useSelector((state) => state.auth.user);
	const userReminders = useSelector((state) => state.auth.userReminders);

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
	const messageEndRef = useRef(null);
	// scroll bottom
	useEffect(() => {
		scrollToBottom();
	}, [messagesOnRoom, currentRoom]);

	useEffect(() => {
		if (scrollBottom) {
			scrollToBottom();
			setTimeout(() => {
				setScrollBottom(false);
			}, 500);
		}
	}, [scrollBottom]);

	const scrollToBottom = () => {
		const elem = document.querySelector('.chat-history');
		elem.scrollTop = elem.scrollHeight;
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	//------------------------------
	//join room
	const joinRoom = React.useCallback(
		(room) => {
			socket.emit('join-room', room);
			setCurrentRoom(room);
			setScrollBottom(true);
		},
		[setCurrentRoom]
	);

	// GET NOTIFICATION
	socket.off('notifications').on('notifications', (room, receiver) => {
		if (room !== currentRoom || !isOpenChat) {
			if (room.includes(NAME_ROOM.USER)) {
				socket.emit('new-notifications', room, receiver);
			} else if (room.includes(NAME_ROOM.GROUP)) {
				for (const group of groups) {
					if (room === group?.type + '-' + group?._id) {
						socket.emit('new-notifications', room, currentUser?.id_system);
						break;
					}
				}
			}
		}
	});

	//------------------------------
	//GET MSG
	socket.off('room-messages').on('room-messages', (payload) => {
		if (payload?.length === 0) {
			setMessageOnRoom([]);
		} else {
			if (payload?.[0]?._id?.room === currentRoom) {
				setMessageOnRoom(payload);
			}
		}

		if (payload?.length > 0) {
			if (payload?.[0]?.messagesByDate?.[0]?.type === NAME_ROOM.GROUP) {
				socket.emit('groups', user?.data?.id_system);
			}
		}
	});

	//------------------------------
	//SUBMIT MESSAGE
	const handleSubmit = (e) => {
		e?.preventDefault();
		if (messages !== '' || multiImages.length > 0) {
			const time = new Date().getTime();
			const nameRoom = currentRoom;
			const toDayDate = getFormattedDate();
			let allmembers;
			let type;
			if (currentRoom !== groups_id) {
				if (nameRoom?.includes(NAME_ROOM.USER)) {
					allmembers = [privateMemberMsg, currentUser?.id_system];
					type = NAME_ROOM.USER;
					dispatch(userScrollTop(true));
				} else {
					allmembers = membersInGroup;
					type = NAME_ROOM.GROUP;
					dispatch(groupScrollTop(true));
				}
			} else {
				dispatch(userViewScrollTop(true));
			}

			const fileData = new FormData();
			for (let i = 0; i < images.length; i++) {
				fileData.append('images', images[i]);
			}
			if (currentRoom !== groups_id) {
				dispatch(postImagesMessage(fileData));
				setScrollBottom(true);
				setTimeout(() => {
					socket.emit(
						'message-room',
						nameRoom,
						messages,
						currentUser?.id_system,
						time,
						toDayDate,
						allmembers,
						type,
						groups_id,
						privateMemberMsg,
						multiImages
					);
					setMessages('');
					setMultiPreviewImages([]);
					setMultiImages([]);
					setImages([]);
				}, 500);
			} else {
				const allmember = nameRoom.split('-');
				allmember.splice(0, 1, currentUser?.id_system);

				let editorReceived = '';
				for (const member of allmember) {
					if (member.includes(UserRules._ROLE.EDITOR)) {
						editorReceived = member;
						break;
					}
				}
				dispatch(postImagesMessage(fileData));
				setScrollBottom(true);
				setTimeout(() => {
					socket.emit(
						'message-room',
						nameRoom,
						messages,
						currentUser?.id_system,
						time,
						toDayDate,
						allmember,
						NAME_ROOM.USER,
						'',
						editorReceived,
						multiImages
					);
					setMessages('');
					setMultiPreviewImages([]);
					setMultiImages([]);
					setImages([]);
				}, 500);
			}
		}
	};
	//PRESS ENTER TO SUBMIT
	useEffect(() => {
		const submitForm = (event) => {
			const btn = document.querySelector('.btn__sendChat');
			if (btn !== null && event.key === 'Enter') {
				event.preventDefault();
				handleSubmit();
			}
		};
		window.addEventListener('keypress', submitForm);
		return () => {
			window.removeEventListener('keypress', submitForm);
		};
	});
	//------------------------------

	const handleEditGroup = () => {
		setIsOpenCreateGroup(true);
		setNameModal(NAME_ROOM.EDIT);
		const data = {
			name: namePrivateRoom,
			members: membersInGroup,
			group_id: groups_id,
		};
		setEditDataGroup(data);
	};

	const replaceName = (id) => {
		if (currentUser?.role === UserRules.ROLE.ADMIN) {
			for (const member of members) {
				if (member?.id_system === id) {
					return member?.fullname;
				}
			}
		}
	};

	const handleFiles = async (e) => {
		const files = e.target.files;
		const result = [];
		const fs = [];
		const multiname = [];
		for (const file of files) {
			const name = Math.random().toString(36).slice(-10) + Date.now() + '.' + file.name.split('.')[1];
			const newFile = new File([file], name, {
				type: `image/${file.name.split('.')[1]}`,
				lastModified: new Date(),
			});
			if (newFile?.size <= 1024 * 1024) {
				fs.push(newFile);
				multiname.push(name);
				result.push(URL.createObjectURL(file));
			}
		}
		if (multiname.length > 5) {
			multiname.length = 5;
		}

		if (fs.length > 5) {
			fs.length = 5;
		}

		if (result.length > 5) {
			result.length = 5;
		}

		setMultiImages(multiname);
		setImages(fs);
		setMultiPreviewImages(result);
	};

	const handleDeleteImgPreview = (img, index) => {
		const images = multiPreviewImages.filter((item) => {
			return item !== img;
		});
		multiImages.splice(index, 1);
		setMultiPreviewImages(images);
	};

	return (
		<div className={`chat-container  ${!isOpenChat && 'hidden'}`}>
			{user?.data?.role === UserRules.ROLE.ADMIN && (
				<>
					<div
						className='chat__createGroup hidden'
						onClick={() => {
							setNameModal(NAME_ROOM.CREATE);
							setIsOpenCreateGroup(!isOpenCreateGroup);
							setEditDataGroup({});
						}}
					></div>
					<Modal
						isOpenCreateGroup={isOpenCreateGroup}
						setIsOpenCreateGroup={setIsOpenCreateGroup}
						nameModal={nameModal}
						editDataGroup={editDataGroup}
						setEditDataGroup={setEditDataGroup}
						setMembersInGroup={setMembersInGroup}
					/>
				</>
			)}
			<Index
				members={members}
				setCurrentUser={setCurrentUser}
				setMembers={setMembers}
				currentUser={currentUser}
				currentRoom={currentRoom}
				setCurrentRoom={setCurrentRoom}
				setMessageOnRoom={setMessageOnRoom}
				privateMemberMsg={privateMemberMsg}
				setPrivateMemberMsg={setPrivateMemberMsg}
				privateGroupMsg={privateGroupMsg}
				setPrivateGroupMsg={setPrivateGroupMsg}
				setRole={setRole}
				joinRoom={joinRoom}
				setGroups={setGroups}
				groups={groups}
				membersInGroup={membersInGroup}
				setMembersInGroup={setMembersInGroup}
				setGroups_id={setGroups_id}
				setNamePrivateRoom={setNamePrivateRoom}
			/>

			<div className='chat'>
				<div className={`chat-header ${currentUser.role === UserRules.ROLE_ADMIN  && "active"}`}>
					<div className='chat__close' onClick={() => dispatch(setIsOpenChat(false))}></div>
					{namePrivateRoom && (
						<div className='chat_img' role={namePrivateRoom?.charAt(0) + namePrivateRoom?.charAt(1)}></div>
					)}
					<div className='chat-about'>
						<div className='chat-with'>
							{(currentUser?.role === UserRules.ROLE.ADMIN
								? replaceName(privateMemberMsg)
								: checkNameReminder(privateMemberMsg)) || namePrivateRoom}
						</div>
						<div className='chat-num-messages hidden'>{role}</div>
						{user?.data?.role === UserRules.ROLE.ADMIN &&
							currentRoom &&
							currentRoom?.includes(NAME_ROOM.GROUP) && (
								<img
									src='images/edit_group.svg'
									alt=''
									className='edit__group'
									onClick={handleEditGroup}
								/>
							)}
					</div>
				</div>
				{/* end chat-header */}
				<div className={`chat-history relative`}>
					<ul className='group__message'>
						<Messages messagesOnRoom={messagesOnRoom} currentUser={currentUser} />
					</ul>
					<div ref={messageEndRef} className='footer__msg' />
				</div>

				{/* end chat-history */}
				{
					<form
						onSubmit={handleSubmit}
						className={`chat-message align-items-end clearfix ${!currentRoom ? 'hidden' : ''}`}
					>
						<div className={`w-full box__chat ${multiPreviewImages.length > 0 && 'pt-1'}`}>
							<textarea
								name='message-to-send m-0'
								id='message-to-send'
								rows={1}
								value={messages}
								onChange={(e) => setMessages(e.target.value)}
							/>
						</div>
						<div className="justify-content-between flex group__chat--btn">
							<div className='chat__file'>
								<input
									type='file'
									className='hidden'
									id='file_chat'
									onChange={handleFiles}
									multiple
									accept='image/png, image/jpeg, image/jpg '
								/>
								<label htmlFor='file_chat'></label>
							</div>
							<div className={`preview__imgs`}>
								{multiPreviewImages.length > 0 &&
									multiPreviewImages.map((image, index) => {
										return (
											<div
												className='div_preview pl-1'
												onClick={() => handleDeleteImgPreview(image, index)}
												key={index}
											>
												<img src={image} alt=''></img>
											</div>
										);
									})}
							</div>
							<button className={`${isOpenChat && 'btn__sendChat'}`}>
								Send
							</button>
						</div>
					</form>
				}
			</div>
		</div>
	);
};

export default BoxChat;
