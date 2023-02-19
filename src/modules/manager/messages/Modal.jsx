import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { roleGroup } from '../../modal/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { Chips } from 'primereact/chips';
import { ListBox } from 'primereact/listbox';
import { NAME_ROOM } from '../../../constants';
import { createGroupMsgRequest, updateGroupMsgRequest, deleteGroupMsgRequest } from '../../../redux/messages/action';
import { useForm, Controller } from 'react-hook-form';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { resetGroupEdit, resetGroupCreate } from '../../../redux/messages/messageSlice';

const Modal = ({
	isOpenCreateGroup,
	setIsOpenCreateGroup,
	nameModal,
	editDataGroup,
	setEditDataGroup,
	setMembersInGroup,
}) => {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employee.dashboard);
	const createGroup = useSelector((state) => state.message.createGroupMsg);
	const updateGroup = useSelector((state) => state.message.updateGroupMsg);

	const user = useSelector((state) => state.auth.user);

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		register,
		watch,
	} = useForm();

	const dataWatch = watch();

	const resetModal = React.useCallback(() => {
		setIsOpenCreateGroup(false);
		setEditDataGroup({});
		reset({
			data: 'test',
		});
	}, [setIsOpenCreateGroup, reset, setEditDataGroup]);

	useEffect(() => {
		if (nameModal === NAME_ROOM.EDIT && Object.keys(editDataGroup)?.length > 0) {
			setValue('name', editDataGroup?.name);
			setValue('members', editDataGroup?.members);
			setValue('role', roleGroup?.[0]?.code);
		} else {
			setValue('name', '');
			setValue('members', [user?.data?.id_system]);
			setValue('role', {});
		}
	}, [editDataGroup, setValue, nameModal, user]);
	useEffect(() => {
		if (createGroup?.data) {
			resetModal();
			setTimeout(() => {
				dispatch(resetGroupCreate());
			}, 500);
		}
	}, [createGroup, setIsOpenCreateGroup, user, resetModal, dispatch]);

	useEffect(() => {
		if (updateGroup?.data) {
			resetModal();
			setTimeout(() => {
				dispatch(resetGroupEdit());
			}, 500);
		}
	}, [updateGroup, setIsOpenCreateGroup, user, resetModal, dispatch]);

	const handleAddMember = (e) => {
		const { value } = e;
		if (!dataWatch?.members.includes(value)) {
			setValue('members', [...dataWatch?.members, value]);
		} else {
			const arr = dataWatch?.members.filter((item) => {
				return item !== value;
			});
			setValue('members', arr);
		}
	};

	const handleRemoveMember = (e) => {
		const { value } = e;
		const newValue = value[0] !== user?.data?.id_system ? value[0] : '';
		const arr = dataWatch?.members.filter((item) => {
			return item !== newValue;
		});
		setValue('members', arr);
	};

	const changeRole = (e, field) => {
		const { value } = e;
		field.onChange(value);
		const filter = `?keyword=${value?.code}`;
		dispatch(dashboardEmployeeRequest(filter));
	};

	const onSubmit = (data) => {
		const result = {
			name: data.name,
			members: data.members,
		};
		if (nameModal === NAME_ROOM.CREATE) {
			result.type = NAME_ROOM.GROUP;
			result.create_by = user?.data?.id_system;
			dispatch(createGroupMsgRequest(result));
		} else {
			const req = {
				data: result,
				id: editDataGroup?.group_id,
			};
			setMembersInGroup(result.members);
			dispatch(updateGroupMsgRequest(req));
		}
	};

	const membersTemplate = (option) => {
		return (
			<div className={`members-item ${dataWatch?.members?.includes(option?.id_system) && 'active'} `}>
				<div>
					{option.fullname} <span style={{ fontSize: '12px' }}>( {option.id_system} )</span>
				</div>
			</div>
		);
	};

	const handleDeleteGroup = () => {
		confirmDialog({
			message: 'Bạn có chắc muốn xóa nhóm này không ?',
			header: 'Xóa nhóm',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			accept: () => {
				dispatch(deleteGroupMsgRequest(editDataGroup?.group_id));
				resetModal();
			},
			reject: () => {},
		});
	};

	return (
		<>
			<ConfirmDialog />
			<Dialog
				header={nameModal === NAME_ROOM.CREATE ? 'Tạo nhóm:' : 'Sửa nhóm:'}
				visible={isOpenCreateGroup}
				onHide={() => resetModal()}
				breakpoints={{ '960px': '75vw' }}
				style={{ width: '50vw' }}
			>
				<form className='grid' onSubmit={handleSubmit(onSubmit)}>
					<div className={`field col-12 md:col-${nameModal === NAME_ROOM.EDIT ? '11' : '12'}`}>
						<span htmlFor='autocomplete'>
							Tên group:
							<span className='warning'>*</span>
						</span>
						<InputText
							className='group__name'
							placeholder='Nhập tên group'
							{...register('name', {
								required: { value: true, message: 'Tên không được để trống' },
								maxLength: 55,
								minLength: 6,
							})}
						/>
						{errors?.name && (
							<span className='warning' style={{ fontSize: '12px' }}>
								{errors?.name.message}
							</span>
						)}
						{errors?.name?.type === 'minLength' && (
							<span className='warning' style={{ fontSize: '12px' }}>
								"Tên nhóm tối thiểu 6 ký tự"
							</span>
						)}
					</div>
					{nameModal === NAME_ROOM.EDIT && (
						<div className='field col-12 md:col-1 relative'>
							<img
								src='images/trash.svg'
								alt=''
								className='absolute top-50 '
								style={{ right: '12px', cursor: 'pointer' }}
								onClick={handleDeleteGroup}
							/>
						</div>
					)}
					<div className='field col-12 md:col-12'>
						<span htmlFor='autocomplete'>
							Thành viên trong group: <span className='warning'>*</span>
						</span>
						<Controller
							name='members'
							control={control}
							rules={{ required: true, message: 'Thành viên không được để trống' }}
							render={({ field }) => (
								<Chips style={{ width: '100%' }} onRemove={handleRemoveMember} value={field.value} />
							)}
						/>
					</div>
					<div className='field col-12 md:col-12 '>
						<span htmlFor='autocomplete'>
							Chức vụ : <span className='warning'>*</span>
						</span>
						<Controller
							name='role'
							control={control}
							rules={{ required: 'Chức vụ không được để trống' }}
							render={({ field }) => (
								<Dropdown
									options={roleGroup}
									optionLabel='name'
									value={field.value}
									onChange={(e) => changeRole(e, field)}
									placeholder='Chọn chức vụ'
								/>
							)}
						/>
					</div>
					{errors?.role && (
						<span className='warning' style={{ fontSize: '12px' }}>
							{errors?.role.message}
						</span>
					)}
					{employees?.data && (
						<div className='field col-12 md:col-12 '>
							<span htmlFor='autocomplete'>
								Thành viên : <span className='warning'>*</span>
							</span>
							<ListBox
								options={employees?.data}
								onChange={handleAddMember}
								optionLabel='fullname'
								optionValue='id_system'
								filter
								className='member__search'
								itemTemplate={membersTemplate}
							/>
						</div>
					)}
					<div className='w-full'>
						<div className='flex justify-content-end align-items-center w-full'>
							<Button label={nameModal === NAME_ROOM.CREATE ? 'Đồng ý' : 'Cập nhật'} className='w-full' />
						</div>
					</div>
				</form>
				<Button
					label='Hủy bỏ'
					icon='pi pi-times'
					onClick={() => resetModal()}
					className='p-button-text btn__close w-full pr-5'
				/>
			</Dialog>
		</>
	);
};

export default Modal;
