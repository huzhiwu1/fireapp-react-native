import React, { Component } from "react"
import { connect } from "react-redux"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import Icons from "react-native-vector-icons/Feather"
class DeviceInfoMore extends Component {
    static navigationOptions = {
        headerBackTitle: '',
        title: '更多'
    };
    item = (key, value) => {
        return <View style={styles.bar}>
            <Text style={{ fontSize: 12 }}>{key}</Text>
            {value ? <Text style={{ fontSize: 12, color: '#333' }}>{value}</Text> : <Icons name='chevron-right' color='#333' size={14}></Icons>}
        </View>
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
    // getTime=(time)=>{
    //     let date  =new Date(time)
    //     let year = date.getFullYear()
    //     let month = date.getMonth()+1
    //     let day = date.getDate()
    //     let hour
    // }
    render() {
        const { sn, gmtCreate, address, imsi, imei, notifyPhone1, notifyPhone2, notifyPhone3, notifyPhone1Name, notifyPhone2Name, notifyPhone3Name, deviceTypeEntity: { fireAppInfoImg: img }, name, deviceType, detail: { deviceStatus, eventTime, batteryVoltage } } = this.props.deviceDetail
        const { adminUser: { nickName } } = this.props.admin

        return <View style={{ padding: 10, }}>
            {
                this.card([
                    {
                        key: 'SN',
                        value: sn
                    },
                    {
                        key: 'IMEI',
                        value: imei,
                    },
                    {
                        key: '卡号',
                        value: imsi
                    },
                    {
                        key: '管理员',
                        value: nickName
                    },
                    {
                        key: '权限/权限管理',
                        value: '',
                        url: ''
                    },
                    {
                        key: '安装位置',
                        value: address
                    },
                    {
                        key: '启用时间',
                        value: new Date(gmtCreate).toLocaleString()
                    }
                ])
            }
        </View>
    }
}
const mapStateToProps = state => ({
    deviceDetail: state.device.deviceDetail,
    admin: state.device.admin
})
const mapDispatchToProps = dispatch => ({
    // getDeviceDetail(sn) {
    //     const action = findDeviceDetail(sn)
    //     dispatch(action)
    // }
})
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#333",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 }
    },
    bar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfoMore)