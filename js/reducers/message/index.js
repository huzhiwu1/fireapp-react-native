import * as constants from '../../actions/constants';
const defaultState = {
	message: [],
};
export default function(state = defaultState, actions) {
	if (actions.type === constants.SETMESSAGE) {
		const newState = {
			...state,
			message: actions.value.list,
		};
		return newState;
	}
	if (actions.type === constants.ADDMESSAGE) {
		let arr = actions.value.list.concat(state.message);
		let newState = {
			...state,
			message: arr,
		};
		return newState;
	}
	return state;
}
