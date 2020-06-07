import axios from '../utils/request';
import api from './index';

//  获取message的消息
export function getMessage(parameter) {
	return axios({
		url: api.apiHistoryList,
		method: 'post',
		data: {
			pageSize: parameter.pageSize || 15,
			pageNumber: parameter.pageNumber || 1,
			groupId: parameter.groupId || null,
			endTime: parameter.endTime || null,
			startTime: parameter.startTime || null,
			deviceId: parameter.deviceId || null,
			deviceStatusList: parameter.deviceStatusList || null,
			event_time: 'asc',
		},
	});
}
