import axios from 'axios';

import store from '../store';
import * as constants from '../actions/constants';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
const service = axios.create({
	timeout: 15000, // 请求超时
});

// 请求拦截器
service.interceptors.request.use(config => {
	//   const token = null;
	//   console.log(constants.TOKEN, 'Token');
	const token = store.getState()['user'][constants.TOKEN];
	// console.log(token, 'token');
	//   const token = await storage._getData(constants.TOKEN);
	if (token) {
		config.headers['Access-Token'] = token;
		config.headers['Authorization'] = token;
	}
	return config;
});

// 返回数据的拦截器
service.interceptors.response.use(response => {
	return response.data;
});

export default service;
