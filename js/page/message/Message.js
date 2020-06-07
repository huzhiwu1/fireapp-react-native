import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import Filter from '../../components/message/filter';
import { connect } from 'react-redux';
import { findMessage, findMoreMessage } from '../../actions/message/index';
import Icons from 'react-native-vector-icons/Feather';
import MessageItem from '../../components/message/messageItem';
class MessagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFilter: false,
			startTime: '',
			endTime: '',
			deviceStatus: [],
			isShowHeart: false,
			pageNumber: 1,
			refreshing: false,
		};
	}
	openFilter = () => {
		this.setState(prevState => ({
			showFilter: !prevState.showFilter,
		}));
	};
	getData = () => {
		const { deviceStatus, startTime, endTime, pageNumber } = this.state;
		console.log(deviceStatus)
		this.props.getMessage({
			deviceStatusList: deviceStatus,
			startTime,
			endTime,
			pageNumber,
		});
	};
	componentDidMount() {
		const { pageNumber } = this.state;
		this.props.getMessage({
			pageNumber,
		});
	}
	setting = ({ deviceStatus, startTime, endTime, isShowHeart }) => {
		console.log(startTime, endTime)
		this.setState(
			{
				deviceStatus,
				startTime,
				endTime,
				isShowHeart,
				pageNumber: 1,
				showFilter: false,
			},
			() => {
				this.getData();
			}
		);
	};
	getMore = () => {

		const { startTime, endTime, deviceStatus } = this.state;
		this.setState(
			{
				pageNumber: this.state.pageNumber + 1,
			},
			() => {
				this.props.getMore({
					pageNumber: this.state.pageNumber,
					startTime,
					endTime,
					deviceStatusList: deviceStatus,
				});
			}
		);
	};
	refreshing = () => {

		const { startTime, endTime, deviceStatus } = this.state;
		this.setState(
			{
				pageNumber: 1,
				refreshing: true,
			},
			() => {
				this.setState({
					refreshing: false,
				});
				this.props.getMessage({
					pageNumber: this.state.pageNumber,
					startTime,
					endTime,
					deviceStatusList: deviceStatus,
				});
			}
		);
	};
	render() {
		const { showFilter, startTime,
			endTime,
			deviceStatus,
			isShowHeart, } = this.state;
		return (
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>消息</Text>
					<TouchableOpacity onPress={this.openFilter}>
						<Icons name='filter' size={22} color='#1e88e5' />
					</TouchableOpacity>
				</View>
				{showFilter && <Filter setting={this.setting}
					startTime={startTime}
					endTime={endTime}
					deviceStatus={deviceStatus}
					isShowHeart={isShowHeart}
				/>}

				<FlatList
					style={{
						width: '100%',
						flex: 1,
						height: '100%',
						backgroundColor: '#f8f8f8',
					}}
					// contentContainerStyle={{
					// 	height: '100%',
					// 	backgroundColor: 'red',
					// }}
					// ListFooterComponent={() => (
					// 	<Text style={{ width: '100%', textAlign: 'center' }}>没有更多</Text>
					// )}
					ListEmptyComponent={() => <Text style={{ width: '100%', textAlign: 'center' }}>没有内容</Text>}
					onEndReached={this.getMore}
					// numColumns={1}
					refreshing={this.state.refreshing}
					onRefresh={this.refreshing}
					onEndReachedThreshold={1}
					data={this.props.message}
					renderItem={item => (
						<MessageItem {...item.item} isShowHeart={this.state.isShowHeart} />
					)}
				/>
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		message: state.message.message,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getMessage(obj) {
			const action = findMessage(obj);

			dispatch(action);
		},
		getMore(obj) {
			const action = findMoreMessage(obj);
			dispatch(action);
		},
	};
};
const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingTop: 15,
		paddingBottom: 15,
		width: '100%',
		backgroundColor: '#fff',
	},
	headerTitle: {
		fontSize: 16,
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessagePage);
