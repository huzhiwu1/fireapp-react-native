import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Overlay from 'teaset/components/Overlay/Overlay';
import Toast from 'teaset/components/Toast/Toast';
import Icons from 'react-native-vector-icons/Feather';
let { width } = Dimensions.get('window');
export default function AddDeviceGroup(props) {
  Toast.messageDefaultPosition = 'top';
  let [name, setName] = useState('');
  let changeName = value => {
    value.length > 8
      ? (Toast.message('场景名不能超过8个字'), console.log('cuo'))
      : setName(value);
  };
  let cancel = () => {
    props.closeAddDeviceGroupModal();
  };
  let handleOk = () => {
    props.addGroup(name);
  };
  return (
    <Overlay.PopView
      modal={true}
      style={{ alignItems: 'center', justifyContent: 'center', zIndex: 0 }}
    >
      <View style={styles.wrap}>
        <View style={styles.top}>
          <Icons name='home' size={23} color='#1e88e5' />
          <Text style={{ margin: 10, color: '#1e88e5', fontSize: 15 }}>
            添加场景
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='请输入场景名'
            value={name}
            onChangeText={text => changeName(text)}
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.btn} onPress={cancel}>
            <Text style={{ color: '#1e88e5' }}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOk}
            style={{ ...styles.btn, backgroundColor: '#1e88e5' }}
          >
            <Text
              style={{
                color: '#fff',
              }}
            >
              确定
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
          }}
          onPress={cancel}
        >
          <Icons name='x' size={23} color='#707070' />
        </TouchableOpacity>
      </View>
    </Overlay.PopView>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: (width / 10) * 9,
    padding: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 300,
    width: '90%',
    padding: 0,
  },
  input: {
    fontSize: 10,
    padding: 4,
    margin: 0,
    textAlign: 'center',
  },
  bottom: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    textAlign: 'center',
    width: '40%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
