import React, { Component } from 'react';
import NavigationUtil from '../../navigator/NavigationUtil';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { addGroup } from '../../api/device';
import AddDeviceGroupModal from '../../components/device/addDeviceGroup';
import EventBus from '../../utils/eventBus';
import ScanCodePage from '../scanCode/scanCode';
import Overlay from 'teaset/components/Overlay/Overlay';
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';
import * as actionsCreater from '../../actions/device/index';
import { connect } from 'react-redux';
import DeviceCard from '../../components/device/deviceCard';
import RefreshableList from '../../components/RefreshableList';
import DeviceTopBar from '../../components/device/deviceTopBar';
import AddDeviceModal from '../../components/device/addDeviceModal';
import MapPage from '../map/WebViewMap';
import Toast from 'teaset/components/Toast/Toast';
class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceStatus: null,
      pageNum: 1,
      currentGroupId: null,
      isNotMore: false,
      isRefresh: false,
    };

    props.getDeviceList({});
    props.getDeviceGroup();
  }

  getInfo = () => {
    console.log('jiazai');
    const { currentGroupId, deviceStatus } = this.state;
    this.setState({
      pageNum: 1,
    });
    this.props.getDeviceGroup();
    this.props.getDeviceList({
      groupId: currentGroupId,
      deviceStatus,
    });
  };
  changeDeviceStatus = deviceStatus => {
    if (deviceStatus == this.state.deviceStatus) return;
    // ModalIndicator.show(`加载中...`);
    this.setState(
      {
        deviceStatus,
      },
      () => {
        this.getInfo();
        // ModalIndicator.hide();
      }
    );
  };
  changeCurrentGroupId = groupId => {
    if (groupId == this.state.currentGroupId) return;
    this.setState(
      {
        currentGroupId: groupId,
        pageNum: 1,
      },
      () => {
        this.getInfo();
      }
    );
  };
  getMore = () => {
    let that = this;
    console.log('数组');
    const { currentGroupId, deviceStatus, pageNum } = this.state;
    if (pageNum === this.props.deviceListObj.pages) {
      this.setState({
        isNotMore: true,
      });
    } else {
      this.setState(
        preState => {
          return {
            isNotMore: false,
            pageNum: preState.pageNum + 1,
            isRefresh: true,
          };
        },
        () => {
          this.props.getMore({
            groupId: currentGroupId,
            deviceStatus,
            pageNumber: that.state.pageNum,
          });
          this.setState({
            isRefresh: false,
          });
        }
      );
    }
  };
  renderContainer = () => {
    const { groupArr, currentGroupId } = this.state;
    const { deviceListObj } = this.props;
    return (
      <View
        style={{
          width: '100%',
          // marginTop: 30,
          // height: '100%',
          flex: 100000000,
          position: 'relative',
        }}
      >
        <FlatList
          style={{
            width: '100%',
            // flex: 1,
            height: '100%',
            // backgroundColor: 'red',
          }}
          ListFooterComponent={() => (
            <Text style={{ width: '100%', textAlign: 'center' }}>
              {this.state.isNotMore && '没有更多...'}
            </Text>
          )}
          onEndReached={this.getMore}
          numColumns={2}
          refreshing={this.state.isRefresh}
          onRefresh={() => this.getInfo(1)}
          onEndReachedThreshold={0.2}
          data={this.props.deviceListObj.list}
          renderItem={item => <DeviceCard info={item} />}
        />
      </View>
    );
  };

  closeAddDeviceModal = () => {
    Overlay.hide(this.modalKey);
  };
  closeScanCode = () => {
    Overlay.hide(this.scanCodeKey);
  };
  openScanCodePage = () => {
    // this.closeAddDeviceModal();
    this.scanCodeKey = Overlay.show(
      <ScanCodePage getCode={this.getCode} closeScanCode={this.closeScanCode} />
    );
  };
  // renderLocation=(loc)=>{

  // }
  getLocation = loc => {
    // renderLocation(loc)
    // console.log(this.AddDeviceModal, '00');
    // this.AddDeviceModal.renderLocation(loc);
    let eventBus = new EventBus();
    eventBus.emit('loc', loc);
    Overlay.hide(this.mapKey);
    // this.setState(
    //   {
    //     loc,
    //   },
    //   () => {

    //   }
    // );
  };
  getCode = code => {
    let eventBus = new EventBus();
    eventBus.emit('sn', code);
    Overlay.hide(this.scanCodeKey);
  };
  addDeviceOk = () => {
    Overlay.hide(this.modalKey);
    // getDeviceList
    this.getInfo();
  };
  openMapPage = () => {
    this.mapKey = Overlay.show(<MapPage getLocation={this.getLocation} />);
  };
  addDevice = () => {
    const { deviceGroupList } = this.props;
    this.modalKey = Overlay.show(
      <AddDeviceModal
        addDeviceOk={this.addDeviceOk}
        openScanCodePage={this.openScanCodePage}
        openMapPage={this.openMapPage}
        deviceGroupList={deviceGroupList}
        closeAddDeviceModal={this.closeAddDeviceModal}
      />
    );
  };
  closeAddDeviceGroupModal = () => {
    Overlay.hide(this.addDeviceGroupModalKey);
  };
  addGroup = name => {
    addGroup({ name }).then(res => {
      if (res.code == 200) {
        Toast.message('添加分组成功');
        this.props.getDeviceGroup();
        this.closeAddDeviceGroupModal();
      } else {
        Toast.message('添加分组失败');
      }
    });
  };
  addDeviceGroup = () => {
    this.addDeviceGroupModalKey = Overlay.show(
      <AddDeviceGroupModal
        addGroup={this.addGroup}
        closeAddDeviceGroupModal={this.closeAddDeviceGroupModal}
      />
    );
  };
  render() {
    // ModalIndicator.hide();
    const { pageNum, getDeviceList, deviceGroupList } = this.props;
    const { currentGroupId, deviceStatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#fff', height: 40 }} />
        <View
          style={{
            flex: 1,
            // height: '100%',
            width: '100%',
            // backgroundColor: 'red',
            // display: 'flex',
            // marginTop: 0,
            // top: 0,
            // left: 0,
            // position: 'relative',
          }}
        >
          <ScrollView
            horizontal={true}
            style={{
              width: '100%',
              backgroundColor: '#f8f8f8',

              // height: 20,
            }}
          >
            {[{ id: null, name: '所有设备' }]
              .concat(deviceGroupList)
              .map(item => {
                return (
                  <TouchableHighlight
                    underlayColor='#f8f8f8'
                    onPress={() => this.changeCurrentGroupId(item.id)}
                  >
                    <View
                      style={{
                        ...styles.tabButton,
                        borderBottomWidth: item.id === currentGroupId ? 1 : 0,
                        borderBottomColor: '#1e88e5',
                      }}
                    >
                      <Text>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
          </ScrollView>

          {/* <RefreshableList
            getInfo={() =>
              getDeviceList({ groupId: currentGroupId, deviceStatus })
            } */}
          {/* renderContainer={this.renderContainer} */}
          {/* /> */}

          {this.renderContainer()}
        </View>

        <DeviceTopBar
          addDeviceGroup={this.addDeviceGroup}
          changeDeviceStatus={this.changeDeviceStatus}
          addDevice={this.addDevice}
        />
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // backgroundColor: 'blue',
    flex: 1,
    // height: '100%',
    width: '100%',
  },
  tabButton: {
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 5,
    // backgroundColor: 'yellow',
    marginLeft: 15,
    marginRight: 15,
    color: '#707070',
  },
});
const mapStateToProps = state => {
  return {
    deviceGroupList: state.device.deviceGroupList,
    deviceListObj: state.device.deviceListObj,
    total: state.device.deviceListObj.total || 0,
    pages: state.device.deviceListObj.pages || 0,
    pageNum: state.device.deviceListObj.pageNum || 0,
  };
};
const mapDispatchToProps = dispatch => {
  var num = 0;
  return {
    getDeviceList(args = {}) {
      // console.log(num++, 'zhixing ');
      const actions = actionsCreater.getDeviceListAction(args);
      // ModalIndicator.hide();
      dispatch(actions);
    },
    getDeviceGroup() {
      const actions = actionsCreater.findDeviceGroupList();
      dispatch(actions);
    },
    getMore(arg = {}) {
      const actions = actionsCreater.getMoreDeviceList(arg);
      dispatch(actions);
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicePage);
