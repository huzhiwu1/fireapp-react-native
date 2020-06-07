import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  default as Easing,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { RNCamera } from 'react-native-camera';

let { width } = Dimensions.get('window');
export default class ScanCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      moveAnim: new Animated.Value(6),
    };
  }
  static navigationOptions = {
    headerBackTitle: '返回',
    title: '扫码添加',
  };
  //扫描条形码
  onBarCodeRead = result => {
    this.props.getCode(result.data);
    // this.setState({
    //   code: result.data,
    // });
  };
  componentDidMount() {
    this.animation();
  }
  animation = () => {
    this.state.moveAnim.setValue(6);
    // this.setState({ moveAnim: 6 });
    Animated.sequence([
      Animated.timing(this.state.moveAnim, {
        toValue: (width / 3) * 2 - 6,
        duration: 2000,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.moveAnim, {
        toValue: 6,
        duration: 2000,
        easing: Easing.linear,
      }),
    ]).start(() => {
      this.animation();
    });
  };
  closeScanCodePage = () => {
    this.props.closeScanCode();
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: '申请摄像头权限',
            message: '用于扫描二维码 ',
            buttonPositive: '确认',
            buttonNegative: '取消',
          }}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={styles.codePageWrap}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                width: '100%',
              }}
            >
              <TouchableOpacity onPress={this.closeScanCodePage}>
                <Icons name='x' size={30} color='#fff' style={{ margin: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.qrcodeWrap}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  // width: '100%',
                  // height: '100%',
                  flex: 1,
                }}
              />
              <ImageBackground
                style={styles.innerQrCode}
                source={require('../../assets/scanCodeBorder.png')}
              >
                <Animated.View
                  style={{
                    ...styles.border,
                    transform: [{ translateY: this.state.moveAnim }],
                  }}
                />
              </ImageBackground>

              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  // width: '100%',
                  flex: 1,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                width: '100%',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              扫码添加设备
            </Text>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                width: '100%',
              }}
            />
          </View>
        </RNCamera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  border: {
    height: 1,
    width: '90%',
    backgroundColor: '#34b5ff',
  },
  codePageWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcodeWrap: {
    // flex: 1,
    // height: (width / 3) * 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    // alignItems: 'stretch',
    overflow: 'hidden',
    // height: 100,
    // backgroundColor: 'rgba(0,0,0,0.7)',
  },
  innerQrCode: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    maxWidth: (width / 3) * 2,
    maxHeight: (width / 3) * 2,
    minHeight: (width / 3) * 2,
    minWidth: (width / 3) * 2,
    width: (width / 3) * 2,
    height: (width / 3) * 2,
    // flex: 1,
    // width: '60%',
    // paddingTop: '60%',
    // backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
