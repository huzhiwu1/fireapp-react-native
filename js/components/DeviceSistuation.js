import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import Icons from 'react-native-vector-icons/Feather';
export default class DeviceSistuation extends Component {
  static bgColor = {
    险情: '#f00',
    故障: '#f4511e',
    正常: '#1e88e5',
    离线: '#707070'
  };
  static defaultProps = {
    DeviceSistuationArr: [
      {
        name: '险情',
        num: 0
      },
      {
        name: '故障',
        num: 2
      },
      {
        name: '离线',
        num: 3
      },
      {
        name: '正常',
        num: 90
      }
    ],
    num: 30
  };
  constructor(props) {
    super(props);
  }
  _toPercent = point => {
    let str = Number(point * 100).toFixed();
    str += '%';
    return str;
  };
  render() {
    const { num, DeviceSistuationArr, getInfo } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <View style={styles.column} />
            <View style={styles.titleBox}>
              <Text style={styles.title}>设备概况</Text>
              <Text style={styles.deviceNum}>
                当前共有注册设备
                {DeviceSistuationArr.reduce((prev, current) => {
                  return prev + current.num;
                }, 0)}
                台
              </Text>
            </View>
          </View>
          <View style={styles.btnBox}>
            <Icons
              name='rotate-cw'
              size={16}
              onPress={() => {
                getInfo();
              }}
            />
          </View>
        </View>
        <View style={styles.rowDivider} />
        <View style={styles.cardBox}>
          {DeviceSistuationArr.map((item, index) => {
            return (
              <View style={styles.card}>
                <View style={styles.infoBox}>
                  <View
                    style={{
                      ...styles.circle,
                      backgroundColor: DeviceSistuation.bgColor[item.name]
                    }}
                  >
                    <Text style={styles.percent}>
                      {this._toPercent(item.num / num)}
                    </Text>
                    <Text style={styles.percent}>{item.num}台</Text>
                  </View>
                  <Text
                    style={{
                      ...styles.title,
                      color: DeviceSistuation.bgColor[item.name]
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {(index != 0 || index != 3) && (
                  <View style={styles.blackColumn} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    width: width,
    borderRadius: 10,
    backgroundColor: '#fff'
    // height: 130,
  },
  top: {
    // height:30,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  column: {
    height: '100%',
    width: 4,
    marginRight: 10,
    backgroundColor: '#1e88e5'
  },
  topLeft: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  title: {
    fontSize: 14
  },
  deviceNum: {
    marginLeft: 10,
    fontSize: 7,
    fontWeight: '300'
  },
  rowDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#707070'
  },
  blackColumn: {
    height: '100%',
    width: 1,
    backgroundColor: '#707070'
  },
  cardBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  blackColumn: {
    height: '100%',
    width: 1,
    backgroundColor: '#707070'
  },
  infoBox: {
    height: 94,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  percent: {
    color: '#fff',
    fontSize: 9
  },
  // deviceNum:{
  //     color:'#fff',
  //     fontSize:9,
  // },
  title: {
    fontSize: 14,
    fontWeight: '300'
  }
});
