import * as constants from '../../actions/constants';
import storage from '../../storage';
const defaultState = {
	token: '',
	userInfo: {},
};
export default function(state = defaultState, action) {
	if (action.type === constants.TOKEN) {
		let newState = { ...state };
		newState.token = action.value;
		storage._saveData(constants.TOKEN, action.value);
		return newState;
	}
	if (action.type === constants.LOGOUT) {
		let newState = { ...state };
		newState.token = '';
		storage._removeData(constants.TOKEN);
		return newState;
	}
	if (action.type === constants.USERINFO) {
		let newState = { ...state };
		newState.userInfo = action.value;
		return newState;
	}
	return state;
}
