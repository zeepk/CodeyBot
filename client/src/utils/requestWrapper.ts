import axios from 'axios';

type OptionsType = {
	url: string;
	method: any;
	data?: any;
	params?: any;
};

function configureRequest(options: OptionsType) {
	const client = axios.create({
		withCredentials: true,
		baseURL: options.url,
		method: options.method,
		data: options.data,
		params: options.params,
	});
	return client(options);
}

export default async function requestWrapper(options: OptionsType) {
	return configureRequest(options);
}
