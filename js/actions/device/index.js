import {
  getDeviceCardList,
  recentSituation,
  getAllDeviceSistuation,
  getDeviceGroupList,
  getDeviceList,
  getDeviceBySn,
  getUserInfoByDevice
} from '../../api/device';
// import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';

import * as constants from '../constants';
export const setUserInfoByDevice = value => ({
  type: constants.USERINFOBYDEVICE,
  value,
})
export const pushDeviceList = value => ({
  type: constants.PUSHDEVICELIST,
  value,
});
export const setDeviceCardList = deviceCardList => ({
  type: constants.SETDEVICECARDLIST,
  value: deviceCardList,
});
export const setRecentSituation = value => ({
  type: constants.SETRECENTSISTUATION,
  value: value,
});
export const setAllDeviceSituation = value => ({
  type: constants.SETALLDEVICESITUATION,
  value,
});
export const setDeviceGroupList = value => ({
  type: constants.SETDEVICEGROUPLIST,
  value,
});
export const setDeviceListObj = value => ({
  type: constants.SETDEVICELIST,
  value,
});
export const setDeviceDetail = value => ({
  type: constants.DEVICEDETAIL,
  value
})
export const findDeviceCardList = () => {
  return dispatch => {
    getDeviceCardList()
      .then(res => {
        if (res.code == 200) {
          const action = setDeviceCardList(res.data);
          dispatch(action);
        } else {
        }
      })
      .catch(err => { });
  };
};
// 获取最近概况
export const getRecentSituation = () => {
  return dispatch => {
    recentSituation()
      .then(res => {
        if (res.code == 200) {
          const action = setRecentSituation(res.data);
          dispatch(action);
        } else {
        }
      })
      .catch(err => { });
  };
};
// 获取全局设备概况
export const allDeviceSituation = () => {
  return dispatch => {
    getAllDeviceSistuation()
      .then(res => {
        if (res.code == 200) {
          const action = setAllDeviceSituation(res.data);
          dispatch(action);
        } else {
        }
      })
      .catch(err => { });
  };
};
// 获取全部设备分组
export const findDeviceGroupList = () => {
  return dispatch => {
    getDeviceGroupList().then(res => {
      const action = setDeviceGroupList(res);
      dispatch(action);
    });
  };
};
// 获取设备列表
export const getDeviceListAction = ({
  pageSize,
  pageNumber,
  groupId,
  name,
  deviceStatus,
  deviceType,
  // fn
}) => {
  return dispatch => {
    getDeviceList({
      pageSize,
      pageNumber,
      groupId,
      name,
      deviceStatus,
      deviceType,
    }).then(res => {
      const action = setDeviceListObj(res);
      // console.log(res, 'res');

      dispatch(action);
    });
  };
};
export const getMoreDeviceList = ({
  pageSize,
  pageNumber,
  groupId,
  name,
  deviceStatus,
  deviceType,
  // fn
}) => {
  return dispatch => {
    getDeviceList({
      pageSize,
      pageNumber,
      groupId,
      name,
      deviceStatus,
      deviceType,
    }).then(res => {
      const action = pushDeviceList(res);
      // console.log(res, 'res');

      dispatch(action);
    });
  };
};
//查询单个设备
export const findDeviceDetail = (sn) => {
  return dispatch => {
    getDeviceBySn({ sn }).then(res => {
      if (res.code === 200) {
        const action = setDeviceDetail(res.data)
        dispatch(action)
      }
    })
  }
}

//查询设备管理员
export const getAdminByDevice = (deviceId) => {
  return dispatch => {
    getUserInfoByDevice({ deviceId }).then(res => {
      if (res.code == 200) {
        const action = setUserInfoByDevice(res.data)
        dispatch(action)
      }
    })
  }
}