import axios from '../utils/request';
import api from './index';
export function getDeviceCardList(parameter) {
  return axios({
    method: 'get',
    url: api.apiGetCardList,
  });
}
//最近预警概况
export function recentSituation(parameter) {
  return axios({
    method: 'get',
    url: api.apiRecentSistuation,
  });
}
//获取全局设备概况
export function getAllDeviceSistuation(parameter) {
  return axios({
    method: 'get',
    url: api.apiAllDeviceSistuation,
  });
}
//获取设备分组
export function getDeviceGroupList(parameter) {
  return axios({
    url: api.apiDeviceGroupList + '?isAdminGroup=0',
    method: 'get',
  });
}

// 获取设备列表
export function getDeviceList(parameter) {
  return axios({
    url: api.apiDeviceList,
    method: 'post',
    data: {
      pageNumber: parameter.pageNumber || 1,
      pageSize: parameter.pageSize || 13,
      groupId: parameter.groupId || null,
      name: parameter.name || null,
      deviceStatus: parameter.deviceStatus,
      deviceType: parameter.deviceType || null,
    },
  });
}
// 增加设备
export function addDevice(parameter) {
  return axios({
    url: api.apiDeviceAdd,
    method: 'post',
    data: {
      address: parameter.address,
      city: parameter.city || '',
      imei: parameter.imei | '',
      sn: parameter.sn || '',
      name: parameter.name || '',
      deviceType: parameter.deviceType || '',
      groupId: parameter.groupId || '',
      latitude: parameter.latitude || '',
      longitude: parameter.longitude || '',
    },
  });
}
// 根据sn获取imei
export function getImeiBySn(parameter) {
  return axios({
    url: api.deviceSearchGetImei + '?sn=' + parameter.sn,
    method: 'get',
    data: {
      sn: parameter.sn,
    },
  });
}
//添加设备分组
export function addGroup(parameter) {
  return axios({
    method: 'post',
    url: api.apiDeviceGroupAdd,
    data: {
      name: parameter.name,
    },
  });
}
// 查询单个设备的详情
export function getDeviceBySn(parameter) {
  return axios({
    method: 'get',
    url: api.apiSearchDeviceBySn + '?sn=' + parameter.sn
  })
}
// 消音
export function erasure(parameter) {
  return axios({
    url: api.apiSendMufflerCommon,
    method: 'post',
    data: {
      deviceId: parameter.deviceId
    }
  })
}

// 查询设备的管理员
export function getUserInfoByDevice(parameter) {
  return axios({
    url: api.apiUserInfoByDevice + '?deviceId=' + parameter.deviceId,
    method: 'get'
  })
}
//  修改设备
export function updateDevice(parameter) {
  return axios({
    url: api.apiDeviceUpdate,
    method: 'put',
    data: parameter.data
  })
}