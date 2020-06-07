import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');
export default class DeviceGroupCard extends Component {
  static defaultProps = {
    deviceGroup: [
      {
        id: 123,
        deviceNum: 3,
        name: '默认分组'
      },
      {
        id: 234,
        deviceNum: 3,
        name: '公司'
      },
      {
        id: 134,
        deviceNum: 3,
        name: '家'
      }
    ]
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { deviceGroup } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <View style={styles.column}></View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>场景分组</Text>
            <Text style={styles.tips}>
              当前共有注册场景{deviceGroup.lenght}
            </Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.cardBox}>
          {deviceGroup.map((item, index) => {
            return (
              <View style={styles.listItem}>
                <View style={styles.contaienr}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.deviceNum}>
                      设备数 : {item.deviceNum}
                    </Text>
                  </View>
                  <View style={styles.btnBox}>
                    <Icons
                      name='chevron-right'
                      size={18}
                      style={{ color: '#000' }}
                    />
                  </View>
                </View>

                {index !== deviceGroup.length - 1 && (
                  <View style={styles.Itemdivider}></View>
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
    marginTop: 20,
    marginBottom: 20,
    width: width,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  top: {
    // height:'100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  infoBox: {
    paddingTop: 1,
    paddingBottom: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexDirection: 'row'
  },
  column: {
    height: '100%',
    width: 4,
    backgroundColor: '#1e88e5',
    marginRight: 10
  },
  title: {
    fontSize: 14,
    fontWeight: '300'
  },
  tips: {
    marginLeft: 10,
    fontSize: 7,
    fontWeight: '300'
  },
  cardBox: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#707070'
  },
  Itemdivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(112,112,112,0.5)'
  },
  contaienr: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  listItem: {
    // width:'100%',
  },
  itemLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  name: {
    fontSize: 14,
    // fontWeight:'300',
    marginRight: 10
  },
  deviceNum: {
    fontSize: 14,
    fontWeight: '300',
    marginRight: 10,
    color: 'rgba(0,0,0,0.5)'
  }
});
