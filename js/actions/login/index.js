import * as constants from '../constants';
import { login, loginBySms, getUserInfo } from '../../api/login';
import NavigationUtil from '../../navigator/NavigationUtil';
import { Toast } from 'teaset';
Toast.messageDefaultPosition = 'center';
export const setToken = token => ({
	type: constants.TOKEN,
	value: token,
});
export const setUserInfo = value => ({
	type: constants.USERINFO,
	value,
});
export const removeToken = () => ({
	type: constants.LOGOUT,
});
export const Login = ({ phone, password }) => {
	return dispatch => {
		login({ phone, password })
			.then(res => {
				if (res.code == 200) {
					const action = setToken(res.data);
					NavigationUtil.goPage({}, 'Main');
					dispatch(action);
				} else {
					Toast.message(res.message);
				}
			})
			.catch(err => {
				Toast.message('登录失败');
			});
	};
};
export const LoginBySms = ({ phone, smsCode }) => {
	return dispatch => {
		loginBySms({ phone, smsCode }).then(res => {
			if (res.code == 200) {
				const actiom = setToken(res.data);
				NavigationUtil.goPage({}, 'Main');
				dispatch(action);
			} else {
				Toast.message(res.message);
			}
		});
	};
};
export const Logout = () => {
	return dispatch => {
		NavigationUtil.goPage({}, 'Login');
		console.log('action收到');
		const action = removeToken();
		dispatch(action);
	};
};
export const loadUserInfo = () => {
	return dispatch => {
		getUserInfo().then(res => {
			if (res.code == 200) {
				console.log(res);
				const action = setUserInfo(res.data);
				dispatch(action);
			}
		});
	};
};
