import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { divider, Divider } from 'react-native-elements';
const { width } = Dimensions.get('window');
export default class DeviceWarnCard extends Component {
  static defaultProps = {
    // deviceStatus: 0,
    // address: '汕头市金融大厦4楼v单元口',
    // deviceType: '烟雾&毒气&一氧化碳',
    // errorType: '无法检测温度(00001)',
    // errorTime: '2019-7-26 9:45'
  };
  constructor(props) {
    super(props);
  }
  statusList = {
    0: '险情',
    1: '故障',
    2: '离线',
    3: '正常'
  };
  render() {
    const {
      deviceStatus,
      address,
      deviceType,
      errorType,
      errorTime
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.messageType}>
          <Text style={styles.message}>{this.statusList[deviceStatus]}</Text>
          <Icons name='alert-circle' size={15} style={{ color: '#f00' }} />
        </View>
        <Divider style={{ backgroundColor: '#707070' }} />
        <View style={styles.infoBox}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>设备位置 : {address}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>设备型号 : {deviceType}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>
              故障类型 : <Text style={styles.errorType}>{errorType}</Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>故障时间 : {errorTime}</Text>
          </View>
        </View>
        <View style={styles.btnBox}>
          <View style={styles.btn}>
            <Text style={styles.btnTitle}>查看详情</Text>
            <Icons name='chevron-right' size={14} style={{ color: '#000' }} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    // paddingBottom:10,
    // paddingTop:10,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  messageType: {
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  message: {
    fontSize: 15,
    color: '#f00',
    marginRight: 5
  },
  infoBox: {
    height: 120,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  itemTitle: {
    fontSize: 12,
    color: '#000'
  },
  btnBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'right'
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontSize: 12
  }
});
