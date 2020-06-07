import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import LoginPage from '../page/Login/LoginPage';
import BottomTabPage from '../page/BottomTabPage';

import DeviceGroupManagerPage from '../page/DeviceGroupManagerPage';

import PermissionPage from '../page/PermissionPage';
import DeviceEditPage from "../page/device/deviceEdit"
import ForgetPage from '../page/Login/ForgetPage';
import MoreBaseInfoPage from '../page/MoreBaseInfoPage';
import DeviceManagerPage from '../page/DeviceManagerPage';
import FriendManagerPage from '../page/FriendManagerPage';
import ResetPasswordPage from '../page/Login/ResetPasswordPage';
import ScanCodePage from '../page/scanCode/scanCode';
import MapPage from '../page/map/WebViewMap';
import DeviceDetailPage from "../page/device/deviceDetail"
import DeviceInfoMorePage from "../page/device/deviceInfoMore"
import UserInfoPage from "../page/user/UserInfoPage"
// import SelectedHeadImgPage from '../page/user/selectedHeadImg';
const InitNavigator = createStackNavigator(
	{
		Welcome: WelcomePage,
		Login: LoginPage,
		Forget: {
			screen: ForgetPage,
			navigationOptions: {
				headerShown: true,
			},
		},
		ResetPassword: {
			screen: ResetPasswordPage,
			navigationOptions: {
				headerShown: true,
			},
		},
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
	}
);
const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: BottomTabPage,
			navigationOptions: {
				headerShown: false,
			},
		},
		DeviceGroupManager: DeviceGroupManagerPage,
		FriendManager: FriendManagerPage,

		MoreBaseInfo: MoreBaseInfoPage,
		DeviceDetail: DeviceDetailPage,
		Permission: PermissionPage,
		DeviceManager: DeviceManagerPage,
		MyMapPage: MapPage,
		// SelectedHeadImg: SelectedHeadImgPage,
		ScanCode: ScanCodePage,
		UserInfo: UserInfoPage,
		DeviceInfoMore: DeviceInfoMorePage,
		DeviceEdit: DeviceEditPage,
	},
	{
		// defaultNavigationOptions:{
		//     headerShown:false
		// },
		initialRouteName: 'Home',
	}
);

export const RootNavigator = createAppContainer(
	createSwitchNavigator(
		{
			Init: InitNavigator,
			Main: MainNavigator,
		},
		{
			defaultNavigationOptions: {
				headerShown: false,
			},
		}
	)
);
