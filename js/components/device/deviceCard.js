import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NavigationUtil from "../../navigator/NavigationUtil"
export default function DeviceCard(props) {
  const info = props.info.item;
  const statusArr = [
    {
      name: '险情',
      color: '#ff0000',
    },
    {
      name: '故障',
      color: '#f4511e',
    },

    {
      name: '离线',
      color: '#b3b3b3',
    },
    {
      name: '正常',
      color: '#1e88e5',
    },
  ];
  return (
    <TouchableOpacity style={styles.cardWrap}
      onPress={() => NavigationUtil.goPage({ sn: info.sn, deviceId: info.deviceId }, 'DeviceDetail')}
    >
      <View style={styles.left}>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{info.name}</Text>
          <View style={styles.statusWrap}>
            <View
              style={{
                ...styles.circle,
                backgroundColor: statusArr[info.detail.deviceStatus].color,
              }}
            />
            <Text style={styles.statusTitle}>
              {statusArr[info.detail.deviceStatus].name}
            </Text>
          </View>
        </View>
        <View style={styles.typeBox}>
          <Text style={styles.typeTitle}>类型：{info.deviceType}</Text>
        </View>
        <View style={styles.typeBox}>
          <Text style={styles.typeTitle}>SN码：{info.sn}</Text>
        </View>
        <View style={{ ...styles.typeBox, color: '#f00' }}>
          <Text style={{ ...styles.typeTitle, color: '#f00' }}>
            {info.detail.message && `最新情况：${info.detail.message}`}
          </Text>
        </View>
        <View style={{ ...styles.typeBox }}>
          <Text style={{ ...styles.typeTitle, lineHeihgt: 100 }}>
            地址：{info.address}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 20 }}
          source={{ uri: info.deviceTypeEntity.deviceInfoImg }}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardWrap: {
    margin: '2.5%',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    width: '45%',
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: 11,
    fontWeight: '400',
  },
  statusWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    marginLeft: 5,
    marginRight: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTitle: {
    fontSize: 7,
  },
  typeBox: {},
  typeTitle: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 6,
  },
  right: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: 'red'
  },
});
