import React, { Component, version } from 'react'
import Icons from "react-native-vector-icons/Feather"
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid
} from 'react-native'
import {changeUserPwd} from '../../api/login'
import NavigationUtil from '../../navigator/NavigationUtil'
import {SegmentedView,Input,Button,Toast} from 'teaset'
export default class ForgetPage extends Component {
    static navigationOptions = {
        title: ''
    }
    constructor(props) {
        super(props)
        this.state={
            phone:this.props.navigation.getParam('phone'),
            password:'',
            checkPassword:'',
            isPasswordSame:true
        }
        
    }
     // 获取手机验证码
     getSmsCode = () => {
        console.log('获取验证码')
        const { downTime } = this.state;
        if (downTime == 0) {
            //1. 获取验证码
            //2.倒计时
            console.log('开始获取雁阵吗')
            this.downTimeStart('downTime','isSendSmsCode')
        }
    }
    //倒计时
    downTimeStart = (timeType,codeType) => {
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
                        if(this.state[timeType]!=0){
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
    inputPassword = (value)=>{
        this.setState({
            password:value
        },() => {
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
    // 修改密码
    changePwd = ()=>{
        const {password,phone} = this.state
        if(!password){
            Toast.message('请填写密码')
            return;
        }
        changeUserPwd({phone,password}).then(res=>{
            console.log(res,"res")
            if(res.code==200){
                NavigationUtil.goPage({},"Login")
            }
            Toast.message(res.message)
        })
        
    }
    inputCheckPassword=value=>{
        this.setState({
            checkPassword:value
        },() => {
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
    render() {
        const {isPasswordSame} = this.state
        return (
            <View style={styles.wrapper}>
                <SegmentedView
                    onChange={this.indexChane}
                    style={styles.segmentedView}
                    type='projector'
                    indicatorType='none'
                    justifyItem='scrollable'>
                    <SegmentedView.Sheet title={this._renderTitle('重置密码')}>
                        <View style={styles.formWrapper}>
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
                                    placeholder='请输入您的新密码' />
                            </View>
                        </View>
                        <View style={styles.formWrapper}>
                        
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
                                        placeholder='请再次输入您的新密码' />
                                    {/* <View style={styles.iconAndTextWrap}>
                                        {
                                            isSendSmsCode ? <Text
                                                onPress={this.getSmsCode}
                                                style={styles.sendSmsCode}
                                            >重新发送{downTime!=0&&('('+downTime+')')}</Text> : <Text
                                                onPress={this.getSmsCode}
                                                style={styles.sendSmsCode}
                                            >获取验证码</Text>
                                        }

                                        <Icons
                                            name={'chevron-right'}
                                            size={autoSize(18)}
                                            style={styles.icon}
                                        />
                                    </View> */}

                                </View> 
                                {
                                !isPasswordSame && <View style={styles.showError} >
                                    <Text style={{ color: '#f00' }}>两次密码不一致</Text>
                                </View>
                            }
                             <Button 
                             onPress={this.changePwd}
                             style={styles.button} 
                             title={<Text style={styles.btnTitle}>完成</Text>} />
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        paddingTop: autoSize(71),
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    normalTitle:{
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
    sendSmsCode:{
        fontSize: autoSize(15),
        color:'#1e88e5'
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
    showError: {
        width: '100%',
        textAlign: 'left',
        marginTop: -30,
        marginBottom: 15,
        color: '#f00'
    }
})