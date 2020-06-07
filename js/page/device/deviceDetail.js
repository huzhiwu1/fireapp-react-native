import React, { Component } from 'react';
import NavigationUtil from '../../navigator/NavigationUtil';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,

} from 'react-native';
import { erasure } from "../../api/device"
import { connect } from "react-redux"
import { findDeviceDetail, getAdminByDevice } from "../../actions/device"
import Icons from "react-native-vector-icons/Feather"
import Icons2 from "react-native-vector-icons/AntDesign"
import { Toast } from 'teaset';
Toast.messageDefaultPosition = 'center';
const statusList = {
    0: '险情',
    1: '故障',
    2: '离线',
    3: '正常'
};
let colorList = {
    '0': 'red',
    '3': '#1e88e5',
    '2': '#1e88e5',
    '1': '#f4511e',
};

class DeviceDetail extends Component {
    static navigationOptions = {
        headerBackTitle: '返回',
        header: null
    };
    constructor(props) {
        super(props)
        this.state = {
            sn: props.navigation.getParam('sn'),
            deviceId: props.navigation.getParam('deviceId')
        }

    }
    item = (key, value) => {
        return <View style={styles.bar}>
            <Text style={{ fontSize: 12 }}>{key}</Text>
            {value ? <Text style={{ fontSize: 12, color: '#333' }}>{value}</Text> : <Icons name='chevron-right' color='#333' size={14}></Icons>}
        </View>
    }
    handleErasure = () => {
        let { deviceId } = this.props.deviceDetail
        erasure({ deviceId }).then(res => {
            // console.log(res, 'res')
            Toast.message(res.message)
        })
    }
    card = (arr) => {
        return <View style={styles.card}>
            {arr.map((item, index) => {
                return <TouchableOpacity
                    onPress={() => {

                        item['url'] && NavigationUtil.goPage({}, item['url'])
                    }}
                >
                    {this.item(item['key'], item['value'])}
                    {index != arr.length - 1 && <View style={{ backgroundColor: "#aaa", marginTop: 3, marginBottom: 3, width: '100%', height: 0.5 }}></View>}
                </TouchableOpacity>

            })}
        </View>
    }
    componentWillMount() {
        this.props.getDeviceDetail(this.state.sn)
        this.props.getAdminInfo(this.state.deviceId)
    }
    render() {

        const { sn, address, notifyPhone1, notifyPhone2, notifyPhone3, notifyPhone1Name, notifyPhone2Name, notifyPhone3Name, deviceTypeEntity: { fireAppInfoImg: img }, name, deviceType, detail: { deviceStatus, eventTime, batteryVoltage } } = this.props.deviceDetail

        return (
            this.props.deviceDetail.deviceTypeEntity ? <View style={styles.wrapper}>
                <View style={styles.header}>
                    <ImageBackground source={{ uri: img }} style={{ width: '100%', height: '100%' }} >
                        <View style={styles.headerBar}>
                            <TouchableOpacity onPress={() => NavigationUtil.goBack(this.props.navigation)}>

                                <Icons name={'chevron-left'} size={25}></Icons>
                            </TouchableOpacity>
                            <TouchableOpacity >

                                <Icons2 name={'questioncircleo'} size={21}></Icons2>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </View>
                <View style={styles.headerBottom}>
                    <View style={styles.hdLeft}>
                        <View style={styles.hdlTop}>
                            <Text style={{ fontSize: 17 }}>{name}</Text>
                            <View style={styles.statusBox}>
                                <View style={{ width: 6, height: 6, borderRadius: 3, marginRight: 4, backgroundColor: colorList[deviceStatus] }}></View>
                                <Text style={{ fontSize: 12, color: colorList[deviceStatus] }}>{statusList[deviceStatus]}</Text>
                            </View>
                        </View>
                        <Text style={styles.hdlBottom}>
                            {deviceType}
                        </Text>
                    </View>
                    <View style={styles.hdRight}>
                        <View style={styles.hdrTop}>
                            <TouchableOpacity
                                onPress={() => NavigationUtil.goPage({}, 'DeviceEdit')}
                            >
                                <View style={styles.btnBox}>
                                    <View style={styles.iconBox}>
                                        <Icons name={'edit'} color='#fff' size={14} />
                                    </View>
                                    <Text style={{ fontSize: 12, marginLeft: 3 }} > 编辑</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={

                                    this.handleErasure
                                }
                            >
                                <View style={{ ...styles.btnBox, marginLeft: 10 }}>
                                    <View style={styles.iconBox}>
                                        <Icons name={'volume-x'} color='#fff' size={14} />
                                    </View>
                                    <Text style={{ fontSize: 12, marginLeft: 3 }} >静音</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hdrBottom}>
                            <Icons2 name={'clockcircleo'} size={7}></Icons2>
                            <Text style={{ fontSize: 8, marginLeft: 2 }}>{eventTime}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ padding: 15, }}>
                    {
                        this.card([
                            { key: 'SN', value: sn },
                            { key: '安装位置', value: address },
                            { key: '权限/权限管理' + (this.props.admin.anthUser.isAdmin ? '(管理员)' : ''), value: '' },
                            { key: '更多', value: '', url: 'DeviceInfoMore' }]
                        )
                    }
                    {
                        this.card([
                            {
                                key: "电压(V)",
                                value: (batteryVoltage / 10).toFixed(2),
                            },
                            {
                                key: '到期时间',
                                value: '2019-7-15'
                            },
                            {
                                key: '历史消息',
                                value: ''
                            }
                        ])
                    }
                    {
                        this.card([
                            {
                                key: '通知责任人1',
                                value: notifyPhone1Name || notifyPhone1 || '无'
                            },
                            {
                                key: '通知责任人2',
                                value: notifyPhone2Name || notifyPhone2 || '无'
                            },
                            {
                                key: '通知责任人3',
                                value: notifyPhone1Name || notifyPhone3 || '无'
                            }
                        ])
                    }
                </ScrollView>

            </View > : <Text>加载中...</Text>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%'
    },
    header: {
        width: '100%',
        height: '25%',
    },
    headerBar: {
        padding: 15,
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4
    },
    headerBottom: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hdLeft: {

    },
    hdRight: {

    },
    card: {
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#333",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 }
    },
    hdlBottom: {
        fontSize: 8
    },
    hdlTop: {
        flexDirection: 'row',
        marginBottom: 10,

    },
    statusBox: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hdrBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hdrTop: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnBox: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    iconBox: {
        padding: 3,
        backgroundColor: '#1e88e5',
        borderRadius: 10000
    }
})
const mapStateToProps = state => ({
    deviceDetail: state.device.deviceDetail,
    admin: state.device.admin
})
const mapDispatchToProps = dispatch => ({
    getDeviceDetail(sn) {
        const action = findDeviceDetail(sn)
        dispatch(action)
    },
    getAdminInfo(deviceId) {
        const action = getAdminByDevice(deviceId)
        dispatch(action)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail)