import { getMessage } from '../../api/message';
// import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';

import * as constants from '../constants';
export const setMessage = value => ({
	type: constants.SETMESSAGE,
	value,
});
export const addMessage = value => ({
	type: constants.ADDMESSAGE,
	value,
});

export const findMessage = ({
	pageSize,
	pageNumber,
	groupId,
	endTime,
	startTime,
	deviceId,
	deviceStatusList,
}) => {
	return dispatch => {
		getMessage({
			pageSize,
			pageNumber,
			groupId,
			endTime,
			startTime,
			deviceId,
			deviceStatusList,
		}).then(res => {
			// if (res.code === 200) {
			const action = setMessage(res);
			dispatch(action);
			// }
		});
	};
};
export const findMoreMessage = ({
	pageSize,
	pageNumber,
	groupId,
	endTime,
	startTime,
	deviceId,
	deviceStatusList,
}) => {
	return dispatch => {
		getMessage({
			pageSize,
			pageNumber,
			groupId,
			endTime,
			startTime,
			deviceId,
			deviceStatusList,
		}).then(res => {
			// if (res.code === 200) {
			const action = addMessage(res);
			dispatch(action);
			// }
		});
	};
};
