import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  // SafeAreaView,
  ImageBackground
} from 'react-native';
import Weather from '../components/Weather';
import HomeMessage from '../components/HomeMessage';
import Icons from 'react-native-vector-icons/Feather';
import RefreshableList from '../components/RefreshableList';
import DeviceGroupCard from '../components/DeviceGroupCard';
import RecentlyStatusCard from '../components/RecentlyStatusCard';
import DeviceWarnCard from '../components/DeviceWarnCard';
import DeviceSistuation from '../components/DeviceSistuation';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/device';
// import { getCardList } from '../api/device';
class HomePage extends Component {
  constructor(props) {
    super(props);
    // console.log(props, 'props');
    // props.getDeviceCardList();
    // this.getCardList();
    // props.getDeviceCardList();

    this.state = {
      refreshDate: ''
    };
    this.getAllInfo();
    // this.props.getDeviceCardList();
  }
  getAllInfo = () => {
    this.props.getDeviceCardList();
    this.props.getRecentSituation();
    this.props.getAllDeviceSituation();
    this.props.getDeviceGroupList();
    this.getDate();
    // console.log('geIOn');
  };
  getDate = () => {
    // console.log('GetDate');
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (month <= 9) {
      month = '0' + month;
    }
    day <= 9 && (day = '0' + day);
    hour <= 9 && (hour = '' + hour);
    minute <= 9 && (minute = '' + minute);
    second <= 9 && (second = '' + second);
    let date =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    // console.log(date, 'date');
    this.setState({ refreshDate: date });
  };
  // getCardList = () => {
  //   getCardList()
  //     .then(res => {
  //       console.log(res, 'res');
  //     })
  //     .catch(err => {
  //       console.log(err, 'Err');
  //     });
  // };
  renderHeaderRightComponet = () => {
    return <Icons name='mail' size={26} style={styles.icon} />;
  };
  renderContainer = () => {
    const {
      deviceGroupList,
      deviceCardList,
      recentSistuation,
      getAllDeviceSituation,
      allDeviceSituation
    } = this.props;
    return (
      <View style={styles.body}>
        <ImageBackground
          source={require('../assets/sun.png')}
          style={{ flex: 1, paddingBottom: 80 }}
        >
          <Weather />
          <HomeMessage />
          <ScrollView horizontal={true}>
            {deviceCardList.map(item => {
              return (
                <DeviceWarnCard
                  deviceStatus={item.deviceStatus}
                  address={item.device.address}
                  deviceType={item.device.deviceType}
                  errorType={item.messageType}
                  errorTime={item.startTime}
                />
              );
            })}

            {/* <DeviceWarnCard />
            <DeviceWarnCard />
            <DeviceWarnCard /> */}
          </ScrollView>
        </ImageBackground>
        <View style={{ position: 'relative', top: -75, marginBottom: -75 }}>
          <RecentlyStatusCard statusArr={recentSistuation} />
        </View>

        <DeviceSistuation
          getInfo={getAllDeviceSituation}
          DeviceSistuationArr={allDeviceSituation}
        />
        <DeviceGroupCard deviceGroup={deviceGroupList} />
        <Text
          style={{
            // position: 'relative',
            // left: '50%',
            textAlign: 'center',
            width: 'auto'
          }}
        >
          最后更新于：{this.state.refreshDate}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Header
                        backgroundColor='transparent'
                        rightComponent={this.renderHeaderRightComponet()}
                        statusBarProps={{ backgroundColor: '#1e88e5' }}
                    /> */}
        <RefreshableList
          getInfo={this.getAllInfo}
          renderContainer={this.renderContainer}
        />
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1
  },
  icon: {
    color: '#fff'
  },
  body: {
    width: '100%',
    backgroundColor: '#F8F8F8'
  }
});
const mapStateToProps = state => {
  return {
    deviceCardList: state.device.deviceCardList,
    recentSistuation: state.device.recentSistuation,
    allDeviceSituation: state.device.allDeviceSituation,
    deviceGroupList: state.device.deviceGroupList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDeviceCardList() {
      const actions = actionCreators.findDeviceCardList();
      dispatch(actions);
    },
    getRecentSituation() {
      const actions = actionCreators.getRecentSituation();
      dispatch(actions);
    },
    getAllDeviceSituation() {
      const actions = actionCreators.allDeviceSituation();
      dispatch(actions);
    },
    getDeviceGroupList() {
      const actions = actionCreators.findDeviceGroupList();
      dispatch(actions);
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
