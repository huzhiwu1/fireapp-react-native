import React, { Component } from 'react';
import Icons from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import HomePage from '../page/HomePage';
import DevicePage from '../page/device/DevicePage';
import MinePage from '../page/user/MinePage';
import MessagePage from '../page/message/Message';

const Tabs = {
	Home: {
		screen: HomePage,
		navigationOptions: {
			headerShown: false,
			title: '首页',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icons name={'home'} size={26} style={{ color: tintColor }} />
			),
		},
	},
	Device: {
		screen: DevicePage,
		navigationOptions: {
			title: '设备',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icons name={'layers'} size={26} style={{ color: tintColor }} />
			),
		},
	},
	Message: {
		screen: MessagePage,
		navigationOptions: {
			title: '消息',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icons name={'mail'} size={26} style={{ color: tintColor }} />
			),
		},
	},
	Mine: {
		screen: MinePage,
		navigationOptions: {
			title: '我的',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icons name={'user'} size={26} style={{ color: tintColor }} />
			),
		},
	},
};

export default class MainTabNavigator extends Component {
	_Navigator() {
		const { Home, Device, Message, Mine } = Tabs;
		const tabs = { Home, Device, Message, Mine };
		if (!this.navigator) {
			this.navigator = createAppContainer(
				createBottomTabNavigator(tabs, {
					tabBarComponent: props => (
						<BottomTabBar {...props} activeTintColor='#34b5ff' />
					),
				})
			);
		}
		return this.navigator;
	}
	render() {
		const TabNavigator = this._Navigator();
		return <TabNavigator />;
	}
}

const styles = StyleSheet.create({
	BottomTabBarIconImage: {
		width: 30,
		height: 30,
	},
});
