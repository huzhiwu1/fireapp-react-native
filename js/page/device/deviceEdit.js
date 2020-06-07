import React, { Component } from "react"
import { connect } from "react-redux"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native"
import Icons from "react-native-vector-icons/Feather"

class DeviceEdit extends Component {
    static navigationOptions = {
        headerBackTitle: '返回',
        title: '设备编辑'
    };

    render() {
        const { name, address, notifyPhone1, notifyPhone2, notifyPhone3, notifyPhone1Name, notifyPhone2Name, notifyPhone3Name } = this.props.deviceDetail
        return (
            <View style={styles.wrapper}>
                <View style={styles.item}>
                    <Text style={{ fontSize: 12 }}>设备名称</Text>
                    <View style={styles.inputBox}>

                        <TextInput
                            style={{ fontSize: 14, flex: 1, }}
                            value={name}
                        ></TextInput>
                        <Icons name='x'></Icons>
                    </View>
                    <Text style={{ textAlign: 'right', marginTop: 5 }}>{'0'}/8</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{ fontSize: 12 }}>安装地址</Text>
                    <View style={styles.inputBox}>

                        <TextInput
                            style={{ fontSize: 14, flex: 1, }}
                            value={address}
                        ></TextInput>
                        <Icons name='x'></Icons>
                    </View>
                    {/* <Text style={{ textAlign: 'right', marginTop: 5 }}>{'0'}/8</Text> */}
                </View>
                <View style={{ ...styles.item, marginTop: 40, }}>
                    <Text style={{ fontSize: 12 }}>通知责任人1</Text>
                    <View style={styles.inputBox}>

                        <TextInput
                            style={{ fontSize: 14, flex: 1, }}
                            value={notifyPhone1Name || notifyPhone1 || '无'}
                        ></TextInput>
                        <TouchableOpacity>
                            <Text style={{ color: "#1e88e5" }}>选择好友</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={{ textAlign: 'right', marginTop: 5 }}>{'0'}/8</Text> */}
                </View>

            </View>
        )
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
    wrapper: {
        height: '100%',
        backgroundColor: "#fff",
        padding: 15,
    },
    item: {
        marginTop: 5,
    },
    inputBox: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5, paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#707070'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DeviceEdit)