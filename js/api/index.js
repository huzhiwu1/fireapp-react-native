const prefix = 'https://www.slwliot.cn';

const userPrefix = prefix + '/user';

const smsPrefix = prefix + '/sms';

const devicePrefix = prefix + '/device';

const sistuationPrefix = prefix + '/situation';
const historyPrefix = prefix + '/history';
const apiHistoryList = historyPrefix + '/list';
const apiSendMufflerCommon = devicePrefix + '/sendMufflerCommon'
const apiUserUpload = userPrefix + '/upload';
const apiUserUpdate = userPrefix + '/update';
const apiGetUserInfo = userPrefix + '/info';
const deviceGroupPrefix = devicePrefix + '/group';
const deviceSearchPrefix = devicePrefix + '/search';
const apiUserInfoByDevice = userPrefix + '/infoByDevice'
const apiSearchDeviceBySn = deviceSearchPrefix + '/sn'
const apiDeviceGroupAdd = deviceGroupPrefix + '/add';
const apiDeviceUpdate = devicePrefix + '/update'
const apiDeviceList = devicePrefix + '/list';
const deviceSearchGetImei = deviceSearchPrefix + '/getImei';
const apiDeviceAdd = devicePrefix + '/add';
const apiDeviceGroupList = deviceGroupPrefix + '/list';
const apiAllDeviceSistuation = sistuationPrefix + '/allDeviceSituation';
const apiRecentSistuation = sistuationPrefix + '/recentSituation';
const apiGetCardList = devicePrefix + '/getCardList';
const apiUserLogin = userPrefix + '/login';
const apiUserRegisterCode = smsPrefix + '/register_code';
const apiUserRegister = userPrefix + '/register';
const apiLoginSms = smsPrefix + '/loginCode';
const apiLoginBySms = userPrefix + '/smsLogin';
const apiUserForgetCode = smsPrefix + '/forget_code';
const apiChangePwd = userPrefix + '/changePwd';
const apiCheckForgetSms = userPrefix + '/verification';
const api = {
	apiSendMufflerCommon,
	apiHistoryList,
	apiUserUpload,
	apiUserUpdate,
	apiDeviceUpdate,
	apiGetUserInfo,
	apiDeviceGroupAdd,
	deviceSearchGetImei,
	apiDeviceAdd,
	apiDeviceList,
	apiDeviceGroupList,
	apiAllDeviceSistuation,
	apiRecentSistuation,
	apiGetCardList,
	apiChangePwd,
	apiCheckForgetSms,
	apiUserForgetCode,
	apiUserLogin,
	apiUserRegisterCode,
	apiUserRegister,
	apiLoginSms,
	apiLoginBySms,
	apiSearchDeviceBySn,
	apiUserInfoByDevice
};
export default api;
