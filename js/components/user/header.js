import React from 'react';
import NavigationUtil from '../../navigator/NavigationUtil';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
export default function Header(props) {
	const { phone, name, headImg } = props;
	let goToUserInfoPage = () => {
		NavigationUtil.goPage({}, 'UserInfo');
	};
	return (
		<View style={styles.wrapper}>
			<View style={styles.avatarBox}>
				<Image
					style={styles.avatar}
					source={{
						uri: headImg,
					}}
				/>
			</View>
			<View style={styles.content}>
				<Text style={styles.name}>{name}</Text>
				<View style={styles.phoneBox}>
					<Icons name='smartphone' size={15} color='#1e88e5' />
					<Text style={styles.phone}>{phone}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={goToUserInfoPage}>
				<Icons name='chevron-right' size={23} color='#000' />
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#fff',
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatarBox: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	name: {
		fontSize: 20,
	},
	content: {
		alignSelf: 'stretch',
		width: '50%',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
	},
	phoneBox: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	phone: {
		fontSize: 12,
	},
});
