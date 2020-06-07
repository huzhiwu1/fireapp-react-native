import * as constants from '../../actions/constants';
const defaultState = {
  deviceCardList: [],
  recentSistuation: [],
  allDeviceSituation: [],
  deviceGroupList: [],
  //设备列表
  deviceListObj: [],
  deviceDetail: {
    sn: '', notifyPhone3: '', notifyPhone2: '', notifyPhone1: '', notifyPhone1Name: '', notifyPhone2Name: '', notifyPhone3Name: '', address: '', deviceTypeEntity: { fireAppInfoImg: '' }, detail: { batteryVoltage: 0, eventTime: '', deviceStatus: '' }
  },
  admin: {
    anthUser: { isAdmin: '' },
    device: {

    }
  }


};
export default function (state = defaultState, actions) {
  if (actions.type === constants.SETDEVICECARDLIST) {
    const newState = { ...state };
    newState.deviceCardList = actions.value;
    return newState;
  }
  if (actions.type === constants.SETRECENTSISTUATION) {
    const newState = { ...state };
    newState.recentSistuation = actions.value;
    return newState;
  }
  if (actions.type === constants.SETALLDEVICESITUATION) {
    const newState = { ...state };
    newState.allDeviceSituation = actions.value;
    return newState;
  }

  if (actions.type === constants.SETDEVICEGROUPLIST) {
    const newState = { ...state };
    newState.deviceGroupList = actions.value;
    return newState;
  }
  if (actions.type === constants.PUSHDEVICELIST) {
    const newState = { ...state };
    newState.deviceListObj = {
      ...actions.value,
      list: [...newState.deviceListObj.list, ...actions.value.list],
    };
    return newState;
  }
  if (actions.type === constants.SETDEVICELIST) {
    const newState = { ...state };
    newState.deviceListObj = actions.value;
    return newState;
  }
  if (actions.type === constants.DEVICEDETAIL) {
    const newState = { ...state };
    newState.deviceDetail = actions.value;
    return newState;
  }
  if (actions.type === constants.USERINFOBYDEVICE) {
    const newState = { ...state };
    newState.admin = actions.value;
    return newState;
  }
  return state;
}
