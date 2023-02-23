import React, { useRef, useState } from 'react';
import { NAME_ROOM } from '../../../../constants';
import { socket } from '../../../../_services/socket';
import { useSelector, useDispatch } from 'react-redux';
import { groupScrollTop, userViewScrollTop } from '../../../../redux/messages/messageSlice';
import { inforToast } from '../../../../commons/toast';

const Groups = ({
	groups,
	currentUser,
	currentRoom,
	setMembersInGroup,
	setGroups_id,
	setPrivateGroupMsg,
	setPrivateMemberMsg,
	setRole,
	joinRoom,
	privateGroupMsg,
	setNamePrivateRoom,
	setCurrentRoom,
	setMessageOnRoom,
}) => {
	const [roomview, setRoomView] = useState(null);
	const groupTopRef = useRef(null);
	const UserViewTopRef = useRef(null);
	const isScrollTop = useSelector((state) => state.message.groupsScrollTop);
	const userViewScrollTopSelector = useSelector((state) => state.message.userViewScrollTop);
	const dispatch = useDispatch();
	const userReminders = useSelector((state) => state.auth.userReminders);

	const checkNameReminder = (id) => {
		if (userReminders?.data?.data) {
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

	React.useEffect(() => {
		if (isScrollTop) {
			scrollToTop();
			setTimeout(() => {
				dispatch(groupScrollTop(false));
			}, [700]);
		}
	});

	React.useEffect(() => {
		if (userViewScrollTopSelector) {
			usersViewcrollToTop();
			setTimeout(() => {
				dispatch(userViewScrollTop(false));
			}, [700]);
		}
	});

	const handlePrivateGroup = (group) => {
		const id_Group = NAME_ROOM.GROUP + '-' + group._id;
		setGroups_id(group._id);
		setPrivateGroupMsg(id_Group);
		setPrivateMemberMsg('');
		setRole(NAME_ROOM.GROUP);
		joinRoom(id_Group);
		setMembersInGroup(group?.members);
		setNamePrivateRoom(group.name);
		socket.emit('reset-notifications', id_Group, currentUser?.id_system);
		//SAVESTORAGE
	};

	socket.off('isCreated').on('isCreated', (payload) => {
		if (payload) {
			socket.emit('groups', currentUser?.id_system);
		}
	});

	socket.off('isEdit').on('isEdit', (payload) => {
		if (payload?.isEdit) {
			socket.emit('groups', currentUser?.id_system);
		}
		if (currentRoom === payload?.room) {
			setNamePrivateRoom(payload?.nameRoom);
		}
		if (payload?.members.includes(currentUser?.id_system)) {
			inforToast(`Bạn đã rời khỏi nhóm ${payload?.nameRoom}`);
			if (currentRoom === payload?.room) {
				resetRoomAfterDelete();
			}
		}
		socket.emit('messages-by-id-system', currentUser?.id_system);
	});

	socket.off('isDelete').on('isDelete', (payload) => {
		if (payload?.isDelete) {
			socket.emit('groups', currentUser?.id_system);
		}
		if (currentRoom === payload?.room) {
			resetRoomAfterDelete();
			inforToast(`Bạn đã rời khỏi nhóm ${payload?.nameRoom}`);
			socket.emit('messages-by-id-system', currentUser?.id_system);
		}
	});

	socket.off('groups-preview').on('groups-preview', (payload) => {
		const roomOfStaffs = payload.reduce((acc, room) => {
			const dup = acc.find((addr) => addr?._id?._id === room?._id?._id);
			if (dup) {
				return acc;
			}
			return acc.concat(room);
		}, []);

		setRoomView(roomOfStaffs);
	});

	const scrollToTop = () => {
		groupTopRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const usersViewcrollToTop = () => {
		UserViewTopRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleGroupView = (room) => {
		joinRoom(room?._id?.name);

		setGroups_id(room?._id?.name);
		setPrivateGroupMsg(room?._id?.name);
		setPrivateMemberMsg('');
		setRole('GROUP TO VIEW');
		setMembersInGroup(room?._id?.members);
		const arrStaffs = room?._id?.name.split('-');
		const mb1 = checkNameReminder(arrStaffs?.[1]);
		const mb2 = checkNameReminder(arrStaffs?.[2]);
		setNamePrivateRoom(mb1 + '-' + mb2);
	};

	const resetRoomAfterDelete = () => {
		setNamePrivateRoom('');
		setMembersInGroup([]);
		setPrivateGroupMsg('');
		setGroups_id('');
		setRole('');
		setCurrentRoom('');
		setMessageOnRoom([]);
	};

	const showGroups = () => {
		return groups?.map((group, index) => (
			<div key={index}>
				<li
					onClick={() => handlePrivateGroup(group)}
					className={privateGroupMsg === NAME_ROOM.GROUP + '-' + group._id ? 'active' : ''}
				>
					<div className='chat_img' role={group.name.slice(0, 2)}></div>
					<div className='about'>
						<div className='name'>{group?.name}</div>
						{currentUser?.newMessages &&
							Object?.keys(currentUser?.newMessages)?.map((room, index2) => {
								return (
									<div key={index2}>
										{currentRoom !== room && room === NAME_ROOM.GROUP + '-' + group._id && (
											<span className='has_seen'>{currentUser?.newMessages?.[room]}</span>
										)}
									</div>
								);
							})}
					</div>
				</li>
			</div>
		));
	};
	return (
		<>
			<div ref={UserViewTopRef}></div>
			{roomview &&
				roomview?.length > 0 &&
				roomview.map((room, index) => {
					const arrStaffs = room?._id?.name.split('-');
					const mb1 = checkNameReminder(arrStaffs?.[1]);
					const mb2 = checkNameReminder(arrStaffs?.[2]);
					const firstChartMb1 = mb1 ? mb1?.charAt(0) : '';
					const firstChartMb2 = mb2 ? mb1?.charAt(0) : '';
					return (
						<div key={index} onClick={() => handleGroupView(room)}>
							{mb1 && mb2 && (
								<li className={privateGroupMsg === room?._id?._id ? 'active' : ''}>
									<div className='chat_img' role={firstChartMb1 + firstChartMb2}></div>
									<div className='about'>
										<div className='name'>{mb1 + '-' + mb2}</div>
									</div>
								</li>
							)}
						</div>
					);
				})}
			{groups?.length > 0 && (
				<li className='msg__title'>
					<span className='title_members'>Nhóm</span>
				</li>
			)}
			<div ref={groupTopRef}></div>
			{showGroups()}
		</>
	);
};

export default Groups;
