import React, { Component } from 'react'
import Icons from "react-native-vector-icons/Feather"
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { getForgetCode,checkForgetCode} from '../../api/login'
import NavigationUtil from "../../navigator/NavigationUtil"
import { SegmentedView, Input, Button,Toast } from 'teaset'
export default class ForgetPage extends Component {
    static navigationOptions = {
        title: ''
    }
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            isSendSmsCode: false,
            downTime: 0,
            smsCode:''
        }

    }
    // 获取手机验证码
    getSmsCode = () => {
        console.log('获取验证码')
        const { downTime, phone } = this.state;
        const regexp = /^1[3456789]\d{9}$/
        if (!regexp.test(phone)) {
            Toast.message('请输入正确的手机号')
            return
        }
        if (downTime == 0) {
            //1. 获取验证码
            getForgetCode({ phone }).then(res => {
                if (res.code == 200) {
                    //2.倒计时
                    console.log('开始获取雁阵吗')
                    this.downTimeStart('downTime', 'isSendSmsCode')
                }
                Toast.message(res.message)
            })

        }
    }
    // 输入验证码
    inputSmsCode = (value)=>{
        this.setState({
            smsCode:value
        })
    }
    //倒计时
    downTimeStart = (timeType, codeType) => {
        this.setState({
            [codeType]: true,
            [timeType]: 60
        }, () => {
            const go = () => {
                console.log('go')
                let timer = setTimeout(() => {
                    this.setState({
                        [timeType]: this.state[timeType] - 1
                    }, () => {
                        clearTimeout(timer)
                        if (this.state[timeType] != 0) {
                            go()
                        }

                    })
                }, 1000)
            }
            go()
        })
    }
    _renderTitle(title) {

        return (
            <Text style={styles.normalTitle}>{title}</Text>
        )
    }
    inputPhone = (value) => {
        this.setState({
            phone: value,
        })
    }
    // 进入重置页面
    next = () => {
        const {phone,smsCode} = this.state
        //校验短信
        console.log(phone,smsCode)
        checkForgetCode({
            phone,
            smsCode
        }).then(res=>{
            if(res.code==200){
                NavigationUtil.goPage({phone}, 'ResetPassword')
            }
            Toast.message(res.message)
        })
      
    }
    render() {
        const { isSendSmsCode, downTime } = this.state
        return (
            <View style={styles.wrapper}>
                <SegmentedView
                    onChange={this.indexChane}
                    style={styles.segmentedView}
                    type='projector'
                    indicatorType='none'
                    justifyItem='scrollable'>
                    <SegmentedView.Sheet title={this._renderTitle('忘记密码')}>
                        <View style={styles.formWrapper}>
                            <View style={styles.inputBox}>
                                <Icons
                                    name={'smartphone'}
                                    size={autoSize(26)}
                                    style={styles.icon}
                                />
                                <Input
                                    onChangeText={this.inputPhone}
                                    style={styles.input}
                                    placeholder='请输入您的手机号' />
                            </View>
                        </View>
                        <View style={styles.formWrapper}>
                            {
                                <View style={styles.inputBox}>
                                    <Icons
                                        name={'shield'}
                                        size={autoSize(26)}
                                        style={styles.icon}
                                    />
                                    <Input
                                        onChangeText={this.inputSmsCode}
                                        style={styles.input}
                                        placeholder='请输入验证码' />
                                    <View style={styles.iconAndTextWrap}>
                                        {
                                            isSendSmsCode ? <Text
                                                onPress={this.getSmsCode}
                                                style={styles.sendSmsCode}
                                            >重新发送{downTime != 0 && ('(' + downTime + ')')}</Text> : <Text
                                                onPress={this.getSmsCode}
                                                style={styles.sendSmsCode}
                                            >获取验证码</Text>
                                        }

                                        <Icons
                                            name={'chevron-right'}
                                            size={autoSize(18)}
                                            style={styles.icon}
                                        />
                                    </View>

                                </View>
                            }
                            <Button
                                onPress={this.next}
                                style={styles.button}
                                title={<Text style={styles.btnTitle}>下一步</Text>} />
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: autoSize(71),
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    normalTitle: {
        fontSize: autoSize(25),
        color: '#1e88e5'
    },
    segmentedView: {
        width: "100%",
        height: "100%",
        paddingLeft: autoSize(22),
        paddingRight: autoSize(22)
    },
    formWrapper: {
        width: '100%',
        marginTop: autoSize(32)
    },
    inputBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        marginBottom: autoSize(34),
        paddingBottom: 5,
    },
    input: {
        borderWidth: 0,
        flex: 1,
        fontSize: autoSize(15)
    },
    icon: {
        color: '#1e88e5',
    },
    iconAndTextWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    sendSmsCode: {
        fontSize: autoSize(15),
        color: '#1e88e5'
    },
    button: {
        backgroundColor: '#1e88e5',
        color: '#fff',
        borderRadius: 40,
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnTitle: {
        color: '#fff',
        fontSize: autoSize(15),
        letterSpacing: 8,
    },
})