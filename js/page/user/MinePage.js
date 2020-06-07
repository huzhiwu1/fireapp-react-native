import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import Header from '../../components/user/header';
import Bar from '../../components/user/bar';
import { Logout, loadUserInfo } from '../../actions/login';
import { connect } from 'react-redux';
class MinePage extends Component {
	static navigationOptions = {
		title: '我的',
		header: '我的',
	};
	componentDidMount() {
		this.props.navigation.setParams('name', 'user');
		this.props.getUserInfo();
	}
	render() {
		const { headImg, phone, nickName } = this.props.userInfo;
		return (
			<View style={styles.wrapper}>
				<Text
					style={{
						width: '100%',
						backgroundColor: '#fff',
						fontSize: 15,
						paddingLeft: 20,
						paddingTop: 10,
						paddingBottom: 10,
					}}
				>
					我的
				</Text>
				<Header headImg={headImg} name={nickName} phone={phone} />
				<View style={styles.content}>
					<View style={{ ...styles.box, marginTop: 10 }}>
						<Bar title={'设备管理'} url='' icon='layers' />
					</View>
					<View style={styles.box}>
						<Bar title={'场景管理'} url='' icon='grid' />
						<View style={styles.rowline} />
						<Bar title={'好友管理'} url='' icon='users' />
					</View>
					<View style={styles.box}>
						<Bar title={'小蓝商城'} url='' icon='shopping-cart' />
						<View style={styles.rowline} />
						<Bar title={'账户充值'} url='' icon='credit-card' />
					</View>
					<View style={styles.box}>
						<Bar title={'投诉建议'} url='' icon='alert-circle' />
						<View style={styles.rowline} />
						<Bar title={'关于深蓝'} url='' icon='clipboard' />
					</View>
				</View>
				<TouchableOpacity
					style={{
						marginTop: 10,
						width: '80%',
						padding: 10,
						borderRadius: 1000,
						textAlign: 'center',
						backgroundColor: '#1e88e5',
					}}
				>
					<Text style={styles.button}>退出登录</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
		backgroundColor: '#f8f8f8',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	box: {
		backgroundColor: '#fff',
		marginTop: 5,
		marginBottom: 5,
		width: '100%',
		paddingLeft: 20,
		paddingRight: 20,
	},
	button: {
		// marginTop: 10,
		// width: '80%',

		textAlign: 'center',
		color: '#fff',
		fontSize: 13,
	},
	content: {
		width: '100%',
	},
	rowline: {
		width: '100%',
		backgroundColor: '#ccc',
		height: 1,
	},
});
const mapDispatchToProps = dispatch => {
	return {
		logout() {
			const action = Logout();
			dispatch(action);
		},
		getUserInfo() {
			const action = loadUserInfo();
			dispatch(action);
		},
	};
};
const mapStateToProps = state => {
	return {
		userInfo: state.user.userInfo,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MinePage);
