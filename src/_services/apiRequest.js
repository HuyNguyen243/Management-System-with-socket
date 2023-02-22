import axios from 'axios';
import { storage } from '../_services/sesionStorage';
import { createAxios } from '../_services/createInstance';
import { NAME_SESSION_STORAGE_TOKEN } from '../constants';

export const post = async (url, body) => {
	var requestOptions = {
		method: 'POST',
		data: body,
	};
	requestOptions.headers = new Headers();
	requestOptions.headers.append('Accept', 'application/json');
	requestOptions.headers.append('Content-Type', 'multipart/form-data');

	return apiRequest(url, requestOptions);
};

export const put = (url, body) => {
	var requestOptions = {
		method: 'PUT',
		data: body,
		redirect: 'follow',
	};

	requestOptions.headers = new Headers();
	requestOptions.headers.append('Accept', 'application/json');
	// requestOptions.headers.append('Content-Type', "application/x-www-form-urlencoded")

	return apiRequest(url, requestOptions);
};

export const get = (url) => {
	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};
	requestOptions.headers = new Headers();
	requestOptions.headers.append('Accept', 'application/json');
	return apiRequest(url, requestOptions);
};

export const del = (url) => {
	var requestOptions = {
		method: 'DELETE',
		redirect: 'follow',
	};
	requestOptions.headers = new Headers();
	requestOptions.headers.append('Accept', 'application/json');

	return apiRequest(url, requestOptions);
};

async function apiRequest(url, requestOptions) {
	const URL = process.env.REACT_APP_API || process.env.REACT_APP_DEV_API;
	requestOptions.url = URL + '/' + url;
	const token = storage.get(NAME_SESSION_STORAGE_TOKEN);
	let res;
	if (token) {
		const JWTaxios = createAxios(token);
		res = await JWTaxios(requestOptions);
	} else {
		res = await axios(requestOptions);
	}

	return res.data;
}
