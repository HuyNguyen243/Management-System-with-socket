export const formatDate = (value) => {
	//value =  Thu Nov 24 2022 00:00:00 GMT+0700 (Indochina Time)
	return value?.toLocaleDateString('vi-VN', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	// => 24/11/2022
};

export const formatTimeStamp = (timestamp) => {
	// timestamp = 2389283989458343
	const date_not_formatted = new Date(timestamp);
	const month = date_not_formatted.getMonth() + 1;
	const day = date_not_formatted.getDate();
	const year = date_not_formatted.getFullYear();

	let formatted_string = `${month}/${day}/${year}`;
	if (month <= 9) {
		formatted_string = `0${month}/${day}/${year}`;
	}
	if (day <= 9) {
		formatted_string = `0${month}/0${day}/${year}`;
	}

	return new Date(formatted_string);
	// => 11/24/2022
};

export function convertDate(arr) {
	//arr = [Wed Nov 16 2022 00:00:00 GMT+0700 (Indochina Time), Thu Nov 24 2022 00:00:00 GMT+0700 (Indochina Time)]
	const result = [];
	for (let i = 0; i < arr?.length; i++) {
		if (arr[i]) {
			const date = new Date(arr[i]),
				mnth = ('0' + (date?.getMonth() + 1)).slice(-2),
				day = ('0' + date?.getDate()).slice(-2);
			result.push([day, mnth, date?.getFullYear()].join('-'));
		}
	}
	return result;
	// = > [16/11/2022,24/11/2022]
}

export function dayToTimeStamp(s) {
	//s = 24/11/2022
	const b = s.split(/\D/);
	const d = Date.now(b[2], --b[1], b[0]);
	return d ? d : new Date(NaN);
	//return 29389283982832
}

export const dateString = (date) => {
	if (date) {
		const d = date.split('-');
		const result = `${d[1]}/${d[0]}/${d[2]}`;
		return result;
	}
};

export const timezoneToDate = (input) => {
	//2022-12-12T12:24:20.038Z
	if (input) {
		const date = new Date(input);
		if (date) {
			const month = date.getMonth();
			const year = date.getFullYear();
			const day = date.getDate();

			return day + '/' + (month + 1) + '/' + year;
		} else {
			return '';
		}
	} else {
		return '';
	}
	// December 23 20022
};
