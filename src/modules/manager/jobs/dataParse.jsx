export const dataParseCustomer = (data) => {
	if (Array.isArray(data)) {
		const result = data.map((item) => {
			const newobject = {
				name: item?.fullname,
				id_system: item?.id_system,
				create_by: item?.create_by,
				email: item?.information?.email,
				phone: item?.information?.phone,
				status: item?.status,
			};
			return newobject;
		});
		return result;
	}
};

export const dataParseEditor = (data) => {
	if (Array.isArray(data)) {
		const result = data.map((item) => {
			const newobject = {
				name: item?.fullname,
				id_system: item?.id_system,
				create_by: item?.create_by,
				email: item?.email,
				phone: item?.phone,
				status: item?.status,
			};
			return newobject;
		});
		return result;
	}
};

export const dataParse = (data) => {
	if (Array.isArray(data)) {
		const result = data.map((item) => {
			const newobject = {
				id_system: item?.infor_id?.id_system,
				reminder_customer: item?.infor_reminder?.reminder_customer,
				reminder_saler: item?.infor_reminder?.reminder_saler,
				reminder_editor: item?.infor_reminder?.reminder_editor,
				total_cost: item?.cost?.total_cost,
				start_day: item?.infor?.start_day,
				end_day: item?.infor?.end_day,
				quality: item?.infor?.quality,
				status_jobs: item?.infor?.status_jobs,
				saler_cost: item?.cost?.saler_cost,
				editor_cost: item?.cost?.editor_cost,
				admin_cost: item?.cost?.admin_cost,
				work_notes: item?.infor?.work_notes,
				request_content: item?.infor?.request_content,
				photo_types: item?.infor?.photo_types,
				org_link: item?.infor?.org_link,
				finished_link: item?.infor?.finished_link,
				status_editor: item?.infor?.status_editor,
				status_customer: item?.infor?.status_customer,
				type_models: item?.infor?.type_models,
				id_customer: item?.infor_id?.id_customer,
				id_saler: item?.infor_id?.id_saler,
				id_editor: item?.infor_id?.id_editor,
			};
			return newobject;
		});
		return result;
	}
};
