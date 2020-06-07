import axios from '../utils/request';
import api from './index';
import store from '../store';
import * as constants from '../actions/constants';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const os = Platform.OS;
// 用户
// 登陆
export function login(parameter) {
	return axios({
		url: api.apiUserLogin,
		method: 'post',
		data: {
			phone: parameter.phone,
			password: parameter.password,
			loginType: 1,
		},
	});
}

// 注册
export function register(parameter) {
	console.log(parameter, parameter);
	return axios({
		url: api.apiUserRegister,
		method: 'post',
		data: {
			nickName: parameter.nickName,
			phone: parameter.phone,
			password: parameter.password,
			smsCode: parameter.smsCode,
			cityId: parameter.cityId,
			areaId: parameter.areaId,
			countryId: parameter.countryId,
			codeTxt: '获取验证码',
		},
	});
}

// 注册验证码
export function getRegisterSms(parameter) {
	return axios({
		url: api.apiUserRegisterCode + '?phone=' + parameter.phone,
		method: 'get',
	});
}

// 获取验证码登录的验证码
export function getLoginSms(parameter) {
	return axios({
		url: api.apiLoginSms + '?phone=' + parameter.phone,
		method: 'get',
	});
}

// 通过短信登录
export function loginBySms(parameter) {
	return axios({
		url: api.apiLoginBySms,
		method: 'post',
		data: {
			phone: parameter.phone,
			verificationCode: parameter.smsCode,
			loginType: 1,
		},
	});
}

// 重置密码的验证码
export function getForgetCode(parameter) {
	return axios({
		url: api.apiUserForgetCode + '?phone=' + parameter.phone,
		method: 'get',
	});
}

// 修改密码的短信校验
export function checkForgetCode(parameter) {
	return axios({
		url: api.apiCheckForgetSms,
		method: 'post',
		data: {
			phone: parameter.phone,
			smsCode: parameter.smsCode,
		},
	});
}

// 修改密码
export function changeUserPwd(parameter) {
	return axios({
		url: api.apiChangePwd,
		method: 'post',
		data: {
			phone: parameter.phone,
			password: parameter.password,
		},
	});
}
// 获取用户信息
export function getUserInfo(parameter) {
	return axios({
		url: api.apiGetUserInfo,
		method: 'get',
	});
}
// 更改用户信息
export function userUpdate(parameter) {
	return axios({
		url: api.apiUserUpdate,
		method: 'post',
		data: {
			nickName: parameter.nickName,
			headImg: parameter.headImg,
		},
	});
}
// 用户上传头像
export function userUpload(parameter) {
	// console.log(parameter.uri, 'uri');
	// console.log(api.apiUserUpload);
	// console.log(RNFetchBlob.wrap(parameter.uri), 'data');
	const token = store.getState()['user'][constants.TOKEN];
	// console.log(
	// return RNFetchBlob.fetch('get', 'http://mptn3r.natappfree.cc/user/upload3', {
	// 	'Access-Token': token,
	// 	Authorization: token,
	// 	// 'Content-Type': 'multipart/form-data',
	// });

	// 	// RNFetchBlob.wrap(parameter.uri)
	// 	[
	// 		{
	// 			name: 'upFile',
	// 			filename: parameter.filename,
	// 			type: 'image/jpeg',
	// 			data: RNFetchBlob.wrap(parameter.uri),
	// 		},
	// 	]
	// );
	// RNFetchBlob.fetch('GET', 'http://www.baidu.com').then(res =>
	// 	console.log(res, 'res')
	// );
	// return RNFetchBlob.fetch(
	// 	'POST',
	// 	api.apiUserUpload,
	// 	{
	// 		'Access-Token': token,
	// 		Authorization: token,
	// 		'Content-Type': 'multipart/form-data',
	// 	},
	// 	[
	// 		{
	// 			name: 'upFile',
	// 			filename: parameter.filename,
	// 			type: parameter.type,
	// 			// data: parameter.data,
	// 			data: RNFetchBlob.wrap(parameter.uri),
	// 		},
	// 	]
	// RNFetchBlob.wrap(parameter.uri)
	// [
	// 	{
	// 		name: 'upFile',
	// 		filename: parameter.filename,
	// 		type: parameter.type,
	// 		// data: parameter.data,
	// 		data: RNFetchBlob.wrap(parameter.uri),
	// 	},
	// ]
	console.log(parameter.data, 'data');
	// );
	// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
	return fetch(api.apiUserUpload, {
		method: 'POST',
		headers: {
			'Access-Token': token,
			Authorization: token,
			//'Content-type': 'application/x-www-form-urlencoded',
			'Content-Type':
				'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
			UserAgent: os,
		},
		// Accept: 'application/json',
		// contentType: false,
		// processData: false,
		body: parameter.data,
	});
	return axios.post(api.apiUserUpload, parameter.data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return axios({
		method: 'post',
		url: api.apiUserUpload,

		data: parameter.data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}
