import React, { Component } from 'react';
import Icons from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import {
	View,
	Text,
	StyleSheet,
	Image,
	touchableOpacity,
	Platform,
	// FormData,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationUtil from '../../navigator/NavigationUtil';
import ImagePicker from 'react-native-image-picker';
import { userUpdate, userUpload } from '../../api/login';

// console.log(token, 'token');
//   const token = await storage._getData(constants.TOKEN);
// if (token) {
// 	config.headers['Access-Token'] = token;
// 	config.headers['Authorization'] = token;
// }
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
		skipBackup: true,
	},
};
class UserInfoPage extends Component {
	static navigationOptions = {
		title: '个人信息',
		headerBackTitle: '我的',
	};
	selectedHeadImg = () => {
		ImagePicker.showImagePicker(options, response => {
			let file;
			// if (Platform.OS === 'android') {
			file = response.uri;
			// } else {
			// file = response.uri.replace('file://', '');
			// }
			// console.log(response, 'response');
			var formData = new FormData();
			var data = {
				uri: file,
				data: response.data,
				type: 'multipart/form-data',
				fileType: response.type,
				name: response.fileName || 'image.jpg',
				// size: response.fileSize,
			};
			// data = new Blob(data);

			formData.append('file', data);
			console.log(formData, 'form');
			// formData.append('file', file);
			// console.log(response, 'response');
			// console.log(response.uri, 'response');
			// let data = new FormData();
			// let binary = new Blob();
			// let fileBody = {
			// 	source: file,
			// 	type: 'multipart/form-data',
			// 	name: 'image.jpg',
			// };
			// data.append('file', fileBody);
			// data.append('file', {
			// 	uri: file,
			// 	fileName: 'upFile',
			// 	type: 'image/jpeg',
			// });
			// data.append('file', );
			// console.log(data);
			// console.log(data, 'data');
			// console.log(file, 'file');
			// console.log(data);
			userUpload({
				type: 'multipart/form-data',
				data: formData,
				uri: response.uri,
				filename: response.fileName || 'file',
				fileType: response.type,
			})
				.then(res => console.log(res, 'chengg'))
				.finally(res => {
					console.log(res, 'ahninbg');
				})
				.catch(err => console.log(err, '报错'));
			// 	.catch(e => {
			// 		console.log(e, error);
			// 	});
			// data.append('name', 'huhziwu');
			// console.log(response);
			// let formData = new FormData();
			// formData.append('name', 'upFile');
			// formData.append('upFile', response.uri);
			// console.log(formData);
			// axios({
			// 	url: api.apiUserUpload,
			// 	method: 'post',
			// 	headers: {
			// 		'Access-Token': token,
			// 		Authorization: token,
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// 	data: data,
			// }).finally(res => {
			// 	console.log(res, 'res0-9');
			// });
			// userUpdate({
			// 	headImg: response.data,
			// })
			// 	.then(res => {
			// 		console.log(res, 'Res');
			// 	})
			// 	.finally(res => console.log(res, 'res'));
			// // console.log(response, 'response');
			// // Same code as in above section!
		});

		// NavigationUtil.goPage({}, 'SelectedHeadImg');
	};
	changeHeadImg = () => {};
	render() {
		const { headImg, phone, nickName } = this.props.userInfo;
		return (
			<View style={styles.wrapper}>
				<View style={styles.panel}>
					<Text style={styles.text}>头像</Text>
					<View style={styles.right}>
						<Image style={styles.headImg} source={{ uri: headImg }} />
						<TouchableOpacity onPress={this.selectedHeadImg}>
							<Icons name='chevron-right' size={23} color='#000' />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.panel}>
					<Text style={styles.text}>昵称</Text>
					<View style={styles.right}>
						<Text style={{ marginRight: 10 }}>{nickName}</Text>
						<TouchableOpacity onPress={this.changeHeadImg}>
							<Icons name='chevron-right' size={23} color='#000' />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.panel}>
					<Text style={styles.text}>手机号</Text>
					<View style={styles.right}>
						<Text style={{ marginRight: 10 }}>{phone}</Text>
						<Icons name='chevron-right' size={23} color='#000' />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
		padding: 20,
		backgroundColor: '#fff',
	},
	panel: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: '#707070',
	},
	text: {
		fontSize: 12,
	},
	right: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headImg: {
		width: 78,
		height: 78,
		borderRadius: 39,
		marginRight: 10,
	},
});
const mapDispatchToProps = dispatch => {
	return {};
};
const mapStateToProps = state => {
	return {
		userInfo: state.user.userInfo,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfoPage);
