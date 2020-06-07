import React, { Component } from "react"
import Icons from "react-native-vector-icons/Feather"
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from "react-native"
import NavigationUtil from '../../navigator/NavigationUtil'
import Popup from '../../components/Popup';
import Address from '../../components/Address';
import * as actionCreators from "../../actions/login"
import { connect } from "react-redux"
import { SegmentedView, Label, Input, Button, Toast } from 'teaset'
import autoSize from '../../utils/autoSize'
import { register, getRegisterSms,getLoginSms } from '../../api/login'

class LoginPage extends Component {
    static navigationOptions = {
        title: '登录'
    }
    constructor(props) {
        Toast.messageDefaultPosition = 'center'
        super(props)
        this.state = {
            index: 0,
            phone: '',
            password: '',
            smsTypeLogin: false,
            isSendSmsCode: false,
            downTime: 0,
            isSendRegisterSmsCode: false,
            registerDownTime: 0,
            address: null,
            smsCode: '',
            checkPassword: '',
            isPasswordSame: true,
        }
    }
    _renderTitle(title, titleIndex) {
        const { index } = this.state
        return (
            <Text style={styles.normalTitle, (index == titleIndex) && styles.activeTitle}>{title}</Text>
        )
    }
    indexChane = (index) => {
        this.setState({
            index,
            downTime: 0,
            isSendSmsCode: false,
            password: '',
            phone: '',
            smsCode: '',
            checkPassword: '',
            // 两次密码是否一样
            isPasswordSame: true
        })
    }
    inputPhone = (value) => {
        this.setState({
            phone: value,
        })
    }
    inputPassword = (value) => {
        this.setState({
            password: value
        }, () => {
            if (this.state.password !== this.state.checkPassword) {
                this.setState({
                    isPasswordSame: false
                })
            } else {
                this.setState({
                    isPasswordSame: true
                })
            }
        })
    }
    forgetPassword = () => {
        // console.log('忘记密码')
        NavigationUtil.goPage({}, 'Forget')
    }
    // 手机验证码登录
    triggerSmsType = (bool) => {
        this.setState({
            smsTypeLogin: bool,
            downTime: 0,
            isSendSmsCode: false,
            password: '',
            phone: '',
            smsCode: '',
            checkPassword: '',
            // 两次密码是否一样
            isPasswordSame: true
        })
    }
    // 获取手机验证码
    getSmsCode = () => {
        console.log('获取验证码')
        const { downTime,phone } = this.state;
        if(!phone){
            Toast.message('请填写手机号')
            return;
        }
        const regexp = /^1[3456789]\d{9}$/
        if (!regexp.test(phone)) {
            Toast.message('请输入正确的手机号')
            return
        }
        if (downTime == 0) {
            //1. 获取验证码
            getLoginSms({phone}).then(res=>{
                if(res.code==200){
                     //2.倒计时
            console.log('开始获取雁阵吗')
                    this.downTimeStart('downTime', 'isSendSmsCode')
                }
                Toast.message(res.message)
            })
           
           
        }
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
    // 获取注册验证码
    getRegisterSmsCode = () => {
        const { registerDownTime, phone } = this.state
        const regexp = /^1[3456789]\d{9}$/
        if (!regexp.test(phone)) {
            Toast.message('请输入正确的手机号')
            return
        }
        if (registerDownTime == 0) {
            //1获取注册验证码
            getRegisterSms({ phone }).then(res => {
                if (res.code == 200) {
                    //2倒计时
                    Toast.message(res.message)
                    this.downTimeStart('registerDownTime', 'isSendRegisterSmsCode')
                } else {
                    Toast.message(res.message)
                }
            })

        }

    }
    // 打开地址选择器
    openAddress = () => {
        Popup.show({
            title: "请选择地址",
            popupHeight: 300,
            content: (
                <Address length={3} activeColor="#1e88e5" change={(res) => {
                    this.setState({
                        address: res
                    })
                }}></Address>
            )
        }, (res) => {
            console.log(this.state.address);
            if (this.state.address && this.state.address.length < 3) {
                Toast.message("请选择地址");
            } else {
                Popup.hide();
            }
        });
    }
    // 用户登录
    userLogin = () => {
        const { smsTypeLogin, phone, password } = this.state
        
        if (!smsTypeLogin) {
            if (!phone && !password) {
                Toast.message('请填写完整信息')
                return;
            }
            this.props.login({ phone, password })
        }else{
            this.props.loginBySms({phone,password})
        }
    }
    // 第二次输入密码
    inputCheckPassword = (value) => {
        console.log('第二次输入密码')
        this.setState({
            checkPassword: value
        }, () => {
            if (this.state.password !== this.state.checkPassword) {
                this.setState({
                    isPasswordSame: false
                })
            } else {
                this.setState({
                    isPasswordSame: true
                })
            }
        })
    }

    // 用户注册
    userRegister = () => {
        let cityId = '', countryId = '', areaId = '';
        if (this.state.address) {
            cityId = this.state.address[1].value;
            areaId = this.state.address[2].value;
            countryId = this.state.address[0].value;
        }

        const { phone, password, smsCode, isPasswordSame } = this.state
        if (!phone || !password || !smsCode || !cityId || !areaId || !countryId) {
            Toast.message('请填写完整信息')
            return;
        }
        if (!isPasswordSame) {
            Toast.message('两次密码不一致')
            return;
        }
        register({
            cityId,
            areaId,
            countryId,
            smsCode,
            phone,
            password,
            nickName: ''
        }).then(res => {
            console.log(res, "注册")
            if (res.code == 200) {
                this.setState({
                    index: 0
                })
                Toast.message('注册成功')
            } else {
                Toast.message(res.message)

            }
        })

    }
    // 填写注册验证码
    inputRegisterSms = (value) => {
        this.setState({
            smsCode: value
        })
    }
    render() {
        const { smsTypeLogin, address, isPasswordSame, isSendSmsCode, registerDownTime, downTime, isSendRegisterSmsCode } = this.state
        return (
            <View style={styles.wrapper}>

                <SegmentedView
                    activeIndex={this.state.index}
                    onChange={this.indexChane}
                    style={styles.segmentedView}
                    type='projector'
                    indicatorType='none'
                    justifyItem='scrollable'>
                    <SegmentedView.Sheet title={this._renderTitle('登陆', 0)}>
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
                            {
                                smsTypeLogin ? <View style={styles.inputBox}>
                                    <Icons
                                        name={'shield'}
                                        size={autoSize(26)}
                                        style={styles.icon}
                                    />
                                    <Input
                                        onChangeText={this.inputPassword}
                                        style={styles.input}
                                        placeholder='请输入验证码' />
                                    <View style={styles.iconAndTextWrap}>
                                        {
                                            isSendSmsCode ? <Text
                                                onPress={this.getSmsCode}
                                                style={styles.forget}
                                            >重新发送{downTime != 0 && ('(' + downTime + ')')}</Text> : <Text
                                                onPress={this.getSmsCode}
                                                style={styles.forget}
                                            >获取验证码</Text>
                                        }

                                        <Icons
                                            name={'chevron-right'}
                                            size={autoSize(18)}
                                            style={styles.icon}
                                        />
                                    </View>

                                </View> : <View style={styles.inputBox}>
                                        <Icons
                                            name={'lock'}
                                            size={autoSize(26)}
                                            style={styles.icon}
                                        />
                                        <Input
                                            secureTextEntry={true}
                                            onChangeText={this.inputPassword}
                                            style={styles.input}
                                            placeholder='请输入您的账号密码' />
                                        <Text
                                            onPress={this.forgetPassword}
                                            style={styles.forget}
                                        >忘记密码？</Text>
                                    </View>
                            }


                            <Button
                                onPress={this.userLogin}
                                style={styles.button}
                                title={<Text style={styles.btnTitle}>登录</Text>} />
                            {
                                smsTypeLogin ? <View style={styles.toOtherPage}>
                                    <Text
                                        onPress={() => this.triggerSmsType(false)}
                                        style={styles.toOtherPageTitle}
                                    >密码登录</Text>
                                    <Icons
                                        name='chevron-right'
                                        size={autoSize(16)}
                                        style={styles.littleIcon}
                                    />
                                </View> : <View style={styles.toOtherPage}>
                                        <Text
                                            onPress={() => this.triggerSmsType(true)}
                                            style={styles.toOtherPageTitle}
                                        >手机验证码登录</Text>
                                        <Icons
                                            name='chevron-right'
                                            size={autoSize(16)}
                                            style={styles.littleIcon}
                                        />
                                    </View>
                            }
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title={this._renderTitle('注册', 1)}>
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
                            <View style={styles.inputBox}>
                                <Icons
                                    name={'lock'}
                                    size={autoSize(26)}
                                    style={styles.icon}
                                />
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={this.inputPassword}
                                    style={styles.input}
                                    placeholder='请输入您的密码' />
                            </View>
                            <View style={styles.inputBox}>
                                <Icons
                                    name={'lock'}
                                    size={autoSize(26)}
                                    style={styles.icon}
                                />
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={this.inputCheckPassword}
                                    style={styles.input}
                                    placeholder='请再次输入您的密码' />
                            </View>
                            {
                                !isPasswordSame && <View style={styles.showError} >
                                    <Text style={{ color: '#f00' }}>两次密码不一致</Text>
                                </View>
                            }


                            <TouchableHighlight
                                underlayColor='#fff'
                                onPress={this.openAddress}
                            >
                                <View

                                    style={styles.inputBox}>
                                    <Icons
                                        name={'map-pin'}
                                        size={autoSize(26)}
                                        style={styles.icon}
                                    />
                                    <Text
                                        style={styles.address}
                                        >{address ? (address.map(item => item.label)).join(' ') : '请选择地区'}</Text>
                                </View>
                            </TouchableHighlight>

                            <View style={styles.inputBox}>
                                <Icons
                                    name={'shield'}
                                    size={autoSize(26)}
                                    style={styles.icon}
                                />
                                <Input
                                    onChangeText={this.inputRegisterSms}
                                    style={styles.input}
                                    placeholder='请输入验证码' />
                                <View style={styles.iconAndTextWrap}>
                                    {
                                        isSendRegisterSmsCode ? <Text
                                            onPress={this.getRegisterSmsCode}
                                            style={styles.forget}
                                        >重新发送{registerDownTime != 0 && '(' + registerDownTime + ')'}</Text> : <Text
                                            onPress={this.getRegisterSmsCode}
                                            style={styles.forget}
                                        >获取验证码</Text>
                                    }

                                    <Icons
                                        name={'chevron-right'}
                                        size={autoSize(18)}
                                        style={styles.icon}
                                    />
                                </View>

                            </View>
                            <Button
                                onPress={this.userRegister}
                                style={styles.button} title={<Text style={styles.btnTitle}>注册</Text>} />
                        </View>
                    </SegmentedView.Sheet>

                </SegmentedView>
                <Popup />
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
    icon: {
        color: '#1e88e5',
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
    activeTitle: {
        fontSize: autoSize(25),
        color: '#1e88e5'
    },
    segmentedView: {
        width: "100%",
        height: "100%",
        paddingLeft: autoSize(22),
        paddingRight: autoSize(22)
    },
    normalTitle: {
        marginRight: autoSize(23),
        fontSize: autoSize(20),
        color: '#2e2e2e',
        padding: 0,
    },
    formWrapper: {
        width: '100%',
        marginTop: autoSize(32)

    },
    address:{
        color:"#ccc",
        fontSize: autoSize(15),
        marginLeft:15
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
    forget: {
        fontSize: autoSize(15),
        color: '#1e88e5'
    },
    toOtherPage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: autoSize(22),
        alignItems: 'center'
    },
    toOtherPageTitle: {
        fontSize: autoSize(13),
        color: '#1e88e5'
    },
    littleIcon: {
        color: '#1e88e5'
    },
    iconAndTextWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    showError: {
        width: '100%',
        textAlign: 'left',
        marginTop: -30,
        marginBottom: 15,
        color: '#f00'
    }
})
const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login({ phone, password }) {
            const action = actionCreators.Login({ phone, password })
            dispatch(action)
        },
        loginBySms({phone,smsCode}){
            const action = actionCreators.LoginBySms({phone,smsCode})
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)