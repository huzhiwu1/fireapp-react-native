import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
export default function Bar(props) {
	const { icon, title, url } = props;
	return (
		<View style={styles.wrapper}>
			<View style={styles.content}>
				<Icons name={icon} size={15} color='#1e88e5' />
				<Text style={styles.title}>{title}</Text>
			</View>
			<TouchableOpacity>
				<Icons name='chevron-right' size={15} color='#000' />
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		paddingTop: 10,
		paddingBottom: 10,
		// paddingLeft: 20,
		// paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		marginLeft: 20,
		fontSize: 12,
	},
});
