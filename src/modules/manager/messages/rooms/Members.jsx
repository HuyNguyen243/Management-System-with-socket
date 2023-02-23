import React, { useEffect, useRef, useState } from 'react';
import { orderIds } from '../../../../commons/message.common';
import { NAME_ROOM } from '../../../../constants';
import { socket } from '../../../../_services/socket';
import { CharacterRoom } from '../../../../commons/message.common';
import { UserRules } from '../../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { userScrollTop } from '../../../../redux/messages/messageSlice';

const Members = ({
	members,
	currentUser,
	privateMemberMsg,
	setPrivateMemberMsg,
	setRole,
	joinRoom,
	currentRoom,
	setPrivateGroupMsg,
	setNamePrivateRoom,
}) => {
	const userTopRef = useRef(null);
	const isScrollTop = useSelector((state) => state.message.usersScrollTop);
	const userReminders = useSelector((state) => state.auth.userReminders);
	const user = useSelector((state) => state.auth.user);
	const [newmembers, setNewMembers] = useState([]);
	const dispatch = useDispatch();

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

	useEffect(() => {
		if (members?.length > 0) {
			let newsmembers = [];
			if (user?.data?.role === UserRules.ROLE.EDITOR) {
				newsmembers = members.filter((member) => {
					return member.role !== UserRules.ROLE.EDITOR;
				});
			} else if (user?.data?.role === UserRules.ROLE.SALER) {
				newsmembers = members.filter((member) => {
					return member.role !== UserRules.ROLE.SALER;
				});
			} else {
				newsmembers = members;
			}
			setNewMembers(newsmembers);
		}
	}, [user, members]);

	const handlePrivateRoom = (member) => {
		setPrivateMemberMsg(member?.id_system);
		setRole(member?.role);
		const roomId = orderIds(currentUser?.id_system, member?.id_system, NAME_ROOM.USER);
		joinRoom(roomId);
		setPrivateGroupMsg('');
		setNamePrivateRoom(CharacterRoom(member?.role));
		socket.emit('reset-notifications', roomId, currentUser?.id_system);
		//SAVESTORAGE
	};

	React.useEffect(() => {
		if (isScrollTop) {
			scrollToTop();
			setTimeout(() => {
				dispatch(userScrollTop(false));
			}, [700]);
		}
	});

	const scrollToTop = () => {
		userTopRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<div ref={userTopRef}></div>
			{newmembers?.map((member, index) => (
				<div key={index}>
					{member?.id_system !== currentUser?.id_system && (
						<li
							className={privateMemberMsg === member.id_system ? 'active' : ''}
							onClick={() => handlePrivateRoom(member)}
						>
							<div className='chat_img' data={member?.status} role={CharacterRoom(member.role)}></div>
							<div className='about'>
								<div className='name'>
									{currentUser?.role === UserRules.ROLE.ADMIN
										? member?.fullname
										: checkNameReminder(member?.id_system)}
								</div>
								{currentUser?.newMessages &&
									Object?.keys(currentUser?.newMessages)?.map((room, index2) => {
										return (
											<div key={index2}>
												{currentRoom !== room &&
													orderIds(
														currentUser?.id_system,
														member?.id_system,
														NAME_ROOM.USER
													) === room && (
														<span className='has_seen'>
															{currentUser?.newMessages?.[room]}
														</span>
													)}
											</div>
										);
									})}
							</div>
						</li>
					)}
				</div>
			))}
		</>
	);
};

export default Members;
