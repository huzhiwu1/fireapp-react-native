import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
export default function messageItem(props) {
	let colorList = {
		'0': 'red',
		'3': '#1e88e5',
		'2': '#1e88e5',
		'1': '#f4511e',
	};
	let iconList = {
		'0': 'alert-circle',
		'1': 'alert-triangle',
		'2': 'smile',
		'3': 'smile',
	};
	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<View style={styles.top}>
					<Text style={styles.title}>{props.groupName}</Text>
					<Text style={{ ...styles.title, color: '#707070' }}>
						{props.eventTime}
					</Text>
				</View>
				<View style={styles.bottom}>
					<View>
						<Text
							style={{
								...styles.title,
								color: colorList[props.deviceStatus],
								marginTop: 4,
								marginBottom: 4,
							}}
						>
							{props.messageType}
						</Text>
						<Text style={{ ...styles.title, marginTop: 4, marginBottom: 4 }}>
							{props.device.address}
						</Text>
					</View>

					{props.deviceStatus === 2 && props.isShowHeart && (
						<View style={styles.badge}>
							<Text style={{ color: '#fff', fontSize: 12 }}>心跳</Text>
						</View>
					)}
				</View>
				<View
					style={{
						...styles.img,
						backgroundColor: colorList[props.deviceStatus],
					}}
				>
					<Icons
						name={iconList[props.deviceStatus]}
						style={styles.icon}
						size={24}
						color={'#fff'}
						// color={colorList[props.deviceStatus]}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		marginBottom: 10,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		backgroundColor: '#fff',
		width: '90%',
		padding: 10,
		borderRadius: 5,
		shadowOffset: { width: 4, height: 4 },
		shadowRadius: 5,
		shadowOpacity: 0.3,
		position: 'relative',
	},
	title: {
		fontSize: 12,
	},
	badge: {
		marginBottom: 4,
		backgroundColor: '#1e88e5',
		borderRadius: 4,
		padding: 5,
		alignSelf: 'flex-end',
	},
	img: {
		position: 'absolute',
		top: -10,
		left: -10,
		width: 44,
		height: 44,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 22,
	},
	icon: {},
	top: {
		padding: 8,
		paddingLeft: 30,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#b3b3b3',
	},
	bottom: {
		width: '100%',

		padding: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
});
