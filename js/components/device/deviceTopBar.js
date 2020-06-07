import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Popover from 'teaset/components/Popover/Popover';
import Icons from 'react-native-vector-icons/Feather';
export default function(props) {
  let statusArr = [
    {
      color: '#00c4ff',
      title: '所有状态',
      deviceStatus: null,
    },
    {
      color: '#1e88e5',
      title: '正常',
      deviceStatus: 3,
    },
    {
      color: '#ff0000',
      title: '险情',
      deviceStatus: 0,
    },
    {
      color: '#f4511e',
      title: '故障',
      deviceStatus: 1,
    },
    {
      color: '#707070',
      title: '离线',
      deviceStatus: 2,
    },
  ];
  let addArr = [
    {
      iconName: 'home',
      title: '添加场景',
    },
    {
      iconName: 'layers',
      title: '添加设备',
    },
  ];
  let [showPopver, setShowPopver] = useState(false);
  let [showAddArr, setShowAddArr] = useState(false);
  let [currentStatus, setCurrentStatus] = useState({
    color: '#00c4ff',
    title: '所有状态',
    deviceStatus: 111,
  });
  // 选择状态
  function handleSelectStatus(status) {
    // console.log(status);
    statusArr.forEach(item => {
      if (item.deviceStatus === status) {
        setCurrentStatus(item);

        setShowPopver(false);
        props.changeDeviceStatus(item.deviceStatus);
        // return;
      }
    });
  }
  // 展示气泡选择框
  function showStatusArr() {
    setShowPopver(!showPopver);
  }
  //展示添加按钮
  function handleShowAddArr() {
    setShowAddArr(!showAddArr);
  }
  // 点击添加按钮框
  function handleSelectAddTap(item) {
    if (item.title === '添加设备') {
      props.addDevice();
    } else {
      props.addDeviceGroup();
    }
    // console.log(item);
    setShowAddArr(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.selectStatus}>
          <TouchableOpacity underlayColor='#f8f8f8' onPress={showStatusArr}>
            <View style={styles.currentStatus}>
              <View
                style={{
                  ...styles.circle,
                  backgroundColor: currentStatus.color,
                }}
              />
              <Text style={styles.title}>{currentStatus.title}</Text>
            </View>
          </TouchableOpacity>
          {showPopver && (
            <Popover arrow='top'>
              {statusArr.map(item => {
                return (
                  <TouchableOpacity
                    underlayColor='#f8f8f8'
                    style={{
                      position: 'relative',
                      zIndex: 999,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    onPress={() => handleSelectStatus(item.deviceStatus)}
                  >
                    <View style={styles.selectStatusArr}>
                      <View
                        style={{
                          ...styles.circle,
                          backgroundColor: item.color,
                        }}
                      />
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Popover>
          )}
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.addWrap}>
          <TouchableOpacity
            underlayColor='#f8f8f8'
            style={{ position: 'relative' }}
            onPress={handleShowAddArr}
          >
            <Icons name='plus' size={20} />
          </TouchableOpacity>

          {showAddArr && (
            <Popover arrow='topRight' style={{ position: 'relative' }}>
              {addArr.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    underlayColor='#f8f8f8'
                    onPress={() => handleSelectAddTap(item)}
                  >
                    <View
                      style={[
                        styles.addTab,
                        index === 0 && { borderBottomWidth: 1 },
                      ]}
                    >
                      <Icons
                        name={item.iconName}
                        style={{ marginRight: 3, color: '#1e88e5' }}
                        size={20}
                      />
                      <Text>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Popover>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    // height: 30,
    // lineHeight: 50,
    // paddingBottom: 20,
    // backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,

    // backgroundColor: '#fff',
  },
  left: {
    height: '100%',
    // position: 'absolute',
  },
  right: {
    // width: 100,
    height: '100%',
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  addWrap: {
    // position: 'absolute',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  addTab: {
    // width: 100,
    padding: 8,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#aaa',
  },
  selectStatus: {
    // position: 'absolute',
  },
  currentStatus: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  selectStatusArr: {
    padding: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    marginBottom: 10,
  },
  circle: {
    marginRight: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
});
