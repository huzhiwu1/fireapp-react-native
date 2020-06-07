import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMessage } from '../../actions/message';
export default function Filter(props) {
	let dispatch = useDispatch();
	const [date, setDate] = useState('2020-05-20');
	const [showStart, setShowStart] = useState(false);
	const [currentStartDate, setCurrentStartDate] = useState(props.startTime);
	const [currentEndDate, setCurrentEndDate] = useState(props.endTime);
	const [showEnd, setShowEnd] = useState(false);
	const [status, setStatus] = useState(props.deviceStatus || []);
	const [heart, setHeart] = useState(props.isShowHeart);
	const onChangeStart = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		getTime(currentDate);
	};
	const onChangeEnd = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		getTime(currentDate);
	};
	const getTime = time => {
		let date = new Date(time);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month > 9 ? month : '0' + month;
		let day = date.getDate();
		day = day > 0 ? day : '0' + day;
		date = year + '-' + month + '-' + day;
		setDate(date);
	};
	const handleStartOk = () => {
		setShowStart(false);
		setCurrentStartDate(date);
	};
	const handleEndOk = () => {
		setShowEnd(false);
		setCurrentEndDate(date);
	};
	const handleStartCancel = () => {
		setShowStart(false);
	};
	const handleEndCancel = () => {
		setShowEnd(false);
	};
	const handleStartDateShow = () => {
		setShowStart(true);
		setShowEnd(false);
	};
	const handleEndDateShow = () => {
		setShowEnd(true);
		setShowStart(false);
	};
	const reset = () => {
		setStatus([]);
		setCurrentEndDate(null);
		setCurrentStartDate(null);
		setShowEnd(false);
		setShowStart(false);
		setHeart(false);
	};
	const handleOk = () => {
		// props.isShowHeart(heart);
		let newStatus = status.length === 0 ? null : status;
		// let action = getMessage({
		// 	deviceStatus: newStatus,
		// 	startTime: currentStartDate,
		// 	endTime: currentEndDate,
		// });
		// console.log(action, 'action');
		// dispatch(action);
		// console.log(newStatus);

		props.setting({
			deviceStatus: newStatus,
			startTime: currentStartDate,
			isShowHeart: heart,
			endTime: currentEndDate,
		});
	};
	const selectStatus = value => {
		let index = status.indexOf(value);
		if (index != -1) {
			let newStatus = [...status];
			newStatus.splice(index, 1);
			setStatus(newStatus);
		} else {
			let newStatus = [...status];
			newStatus.push(value);
			setStatus(newStatus);
		}
	};
	const showHeart = () => {
		setHeart(!heart);
	};
	return (
		<View style={styles.wrapper}>
			<View style={styles.item}>
				<Text style={{ fontSize: 9, marginTop: 10, marginBottom: 10 }}>
					状态
				</Text>
				<View style={styles.itemTab}>
					<TouchableOpacity
						onPress={() => selectStatus(3)}
						style={{
							...styles.button,
							backgroundColor: status.includes(3) ? '#1e88e5' : '#fff',
						}}
					>
						<Text
							style={{
								...styles.title,
								color: status.includes(3) ? '#fff' : '#1e88e5',
							}}
						>
							正常
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => selectStatus(0)}
						style={{
							...styles.button,
							backgroundColor: status.includes(0) ? '#1e88e5' : '#fff',
						}}
					>
						<Text
							style={{
								...styles.title,
								color: status.includes(0) ? '#fff' : '#1e88e5',
							}}
						>
							险情
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => selectStatus(1)}
						style={{
							...styles.button,
							backgroundColor: status.includes(1) ? '#1e88e5' : '#fff',
						}}
					>
						<Text
							style={{
								...styles.title,
								color: status.includes(1) ? '#fff' : '#1e88e5',
							}}
						>
							故障
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.item}>
				<Text style={{ fontSize: 9, marginTop: 10, marginBottom: 10 }}>
					心跳
				</Text>
				<View style={styles.itemTab}>
					<TouchableOpacity
						onPress={showHeart}
						style={{
							...styles.button,
							backgroundColor: heart ? '#1e88e5' : '#fff',
						}}
					>
						<Text
							style={{ ...styles.title, color: heart ? '#fff' : '#1e88e5' }}
						>
							显示
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.item}>
				<Text style={{ fontSize: 9, marginTop: 10, marginBottom: 10 }}>
					日期范围
				</Text>
				<View style={styles.itemTab}>
					<TouchableOpacity
						onPress={handleStartDateShow}
						style={{
							...styles.button,
							width: '40%',
							backgroundColor: '#eee',
							borderColor: '#000',
						}}
					>
						<Text style={styles.title}>{currentStartDate || '起始日期'}</Text>
					</TouchableOpacity>
					<View style={{ width: '10%', height: 1, backgroundColor: '#000' }} />
					<TouchableOpacity
						style={{
							...styles.button,
							width: '40%',
							backgroundColor: '#eee',
							borderColor: '#000',
						}}
						onPress={handleEndDateShow}
					>
						<Text style={styles.title}>{currentEndDate || '截止日期'}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{showStart && (
				<View>
					<View style={styles.btnBar}>
						<TouchableOpacity onPress={handleStartCancel}>
							<Text style={styles.title}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleStartOk}>
							<Text style={{ ...styles.title, color: '#1e88e5' }}>确定</Text>
						</TouchableOpacity>
					</View>
					<DateTimePicker
						testID='dateTimePicker'
						timeZoneOffsetInMinutes={0}
						value={new Date(date)}
						mode={'date'}
						display='date'
						onChange={onChangeStart}
					/>
				</View>
			)}
			{showEnd && (
				<View key={909090}>
					<View style={styles.btnBar}>
						<TouchableOpacity onPress={handleEndCancel}>
							<Text style={styles.title}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleEndOk}>
							<Text style={{ ...styles.title, color: '#1e88e5' }}>确定</Text>
						</TouchableOpacity>
					</View>
					<DateTimePicker
						testID='dateTimePicker'
						timeZoneOffsetInMinutes={0}
						value={new Date(date)}
						mode={'date'}
						display='date'
						onChange={onChangeEnd}
					/>
				</View>
			)}
			<View style={styles.footer}>
				<TouchableOpacity style={styles.btn} onPress={reset}>
					<Text style={{ fontSize: 12 }}>重置</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.btn, backgroundColor: '#1e88e5', marginLeft: -1 }}
					onPress={handleOk}
				>
					<Text style={{ fontSize: 12, color: '#fff' }}>完成</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		backgroundColor: '#fff',
		borderColor: '#707070',
		borderWidth: 1,
		padding: 10,
		position: 'relative',
	},
	itemTab: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#fff',
		fontSize: 12,
	},
	button: {
		borderWidth: 1,
		borderRadius: 10000,
		paddingTop: 6,
		paddingBottom: 6,
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#1e88e5',
		backgroundColor: '#1e88e5',
	},
	btnBar: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	title: {
		fontSize: 16,
	},
	footer: {
		marginTop: 10,
		marginBottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	btn: {
		width: '50%',
		textAlign: 'center',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#000',
	},
});
