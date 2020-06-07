import { combineReducers } from 'redux';
import UserReducer from '../reducers/login';
import DeviceReducer from '../reducers/device';
import MessageReducer from '../reducers/message';
export default combineReducers({
	user: UserReducer,
	device: DeviceReducer,
	message: MessageReducer,
});
