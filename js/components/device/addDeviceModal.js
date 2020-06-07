import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { addDevice } from '../../api/device';
import Toast from 'teaset/components/Toast/Toast';
import EventBus from '../../utils/eventBus';
import NavigationUtil from '../../navigator/NavigationUtil';
import Select from 'teaset/components/Select/Select';
import Icons2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Feather';
import Overlay from 'teaset/components/Overlay/Overlay';
import { getImeiBySn } from '../../api/device';
let { width } = Dimensions.get('window');
let eventBus = new EventBus();
export default function AddDeviceModal(props) {
  console.log(props, 'props');
  let [sn, setSn] = useState('');
  let [address, setAddress] = useState('');
  let [deviceName, setDeviceName] = useState('');
  let [deviceType, setDeviceType] = useState('');
  let [deviceImg, setDeviceImg] = useState('');
  let [deviceGroup, setDeviceGroup] = useState('');
  let [imei, setImei] = useState('');
  eventBus.addEventListener('loc', function(loc) {
    console.log(loc[0], 'locbus');
    setAddress(...loc);
  });
  eventBus.addEventListener('sn', function(code) {
    setSn(...code);
  });
  let cancel = () => {
    props.closeAddDeviceModal();
  };
  let changeInput = (value, type) => {
    // console.log(type);

    let fn = `set${type}`;

    eval(fn)(value);
    if (type == 'Sn' && value.length == 13) {
      getImeiBySn({ sn: value }).then(res => {
        // console.log(sn, 'sn');
        if (res.code == 200) {
          setDeviceImg(res.data.deviceType.fireAppAddImg);
          setImei(res.data.imei);
          setDeviceType(res.data.deviceType.typeName);
        }
      });
    }
  };
  let handleOk = () => {
    if (!sn || !imei || !address || !deviceName || !deviceGroup) {
      Toast.message('请填写完整信息');
      return;
    }
    addDevice({
      sn,
      imei,
      address: address.poiaddress,
      city: address.cityname,
      groupId: deviceGroup,
      name: deviceName,
      latitude: address.latlng.lat,
      longitude: address.lng,
    }).then(res => {
      console.log(res, 'res');
      if (res.code == 200) {
        props.addDeviceOk();
      }
    });
  };
  let goToWebViewMap = () => {
    props.openMapPage();
    // console.log('地图');
    // NavigationUtil.goPage({}, 'MyMapPage');
  };
  let goToScanCode = () => {
    // props.closeAddDeviceModal();
    // NavigationUtil.goPage({}, 'ScanCode');
    props.openScanCodePage();
  };
  return (
    <Overlay.PopView
      modal={true}
      style={{ alignItems: 'center', justifyContent: 'center', zIndex: 0 }}
    >
      <View style={styles.wrapper}>
        <View style={styles.nameBox}>
          <Icons name='layers' color='#1e88e5' size={20} />
          <Text
            style={{
              color: '#1e88e5',
              fontSize: 15,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            添加设备
          </Text>
          <TouchableOpacity onPress={goToScanCode}>
            <Icons2 name='qrcode-scan' color='#707070' size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder={'请输入sn码'}
            onChangeText={text => changeInput(text, 'Sn')}
            value={sn}
          />
        </View>
        <TouchableOpacity style={styles.inputBox} onPress={goToWebViewMap}>
          <Text
            style={styles.input}
            placeholder='请输入地址'
            editable={false}
            // onChangeText={text => changeInput(text, 'Address')}
            value={address ? address.poiaddress : ''}
          >
            {address ? address.poiaddress : '请输入地址'}
          </Text>
        </TouchableOpacity>
        {deviceImg != '' && (
          <Image
            style={{ width: 58, height: 58, borderRadius: 29 }}
            source={{
              uri: deviceImg,
            }}
          />
        )}
        {deviceType != '' && (
          <Text style={{ fontSize: 12, color: '#707070' }}>
            设备类型：{deviceType}
          </Text>
        )}

        <View style={styles.inputBox}>
          <TextInput
            style={{ ...styles.input, color: '#1e88e5' }}
            placeholder='请输入设备名称'
            onChangeText={text => changeInput(text, 'DeviceName')}
            value={deviceName}
          />
        </View>
        <Select
          icon='none'
          style={{
            marginTop: 7,
            marginBottom: 7,
            width: '80%',
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            borderRadius: 100,

            // paddingTop: 20,
            borderColor: '#1e88e5',
            // paddingBottom: 20,
          }}
          valueStyle={{
            padding: 0,
            margin: 0,

            textAlign: 'center',
            fontSize: 12,
            color: '#707070',
          }}
          value={deviceGroup || '选择分组'}
          pickerTitle='选择分组'
          getItemValue={(item, index) => item.id}
          getItemText={(item, index) => item.name}
          onSelected={(item, index) => changeInput(item.id, 'DeviceGroup')}
          items={props.deviceGroupList}
        />
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={{
              width: '40%',
              justifyContent: 'center',
              borderWidth: 1,
              alignItems: 'center',
              borderColor: '#1e88e5',
              borderRadius: 1000,
            }}
            onPress={cancel}
          >
            <Text style={styles.button}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '40%',
              justifyContent: 'center',
              borderWidth: 1,
              alignItems: 'center',
              borderColor: '#1e88e5',
              borderRadius: 1000,
              backgroundColor: '#1e88e5',
            }}
            onPress={handleOk}
          >
            <Text
              style={{
                ...styles.button,
                color: '#fff',
              }}
            >
              确认
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: 'absolute', top: 15, right: 15 }}
          onPress={cancel}
        >
          <Icons name='x' size={23} />
        </TouchableOpacity>
      </View>
    </Overlay.PopView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: (width / 10) * 9,
    borderRadius: 10,
    padding: 15,
    paddingBottom: 25,
    paddingTop: 25,
    alignItems: 'center',
  },
  nameBox: {
    //   display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 7,
    marginBottom: 7,
    width: '80%',
    paddingTop: 7,
    paddingBottom: 7,
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 100,
  },
  input: {
    margin: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    padding: 0,
    paddingTop: -100,
    paddingBottom: -100,
    color: '#707070',
  },
  buttonWrap: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    // marginTop: 7,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    // borderWidth: 1,

    // borderRadius: 15,
    color: '#1e88e5',
    // borderColor: '#1e88e5',
  },
});
