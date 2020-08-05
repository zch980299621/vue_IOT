import { axios} from '../config.js';

export const mqttAuth = params => { return axios.get(params._url,  {params:params._obj,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const getDeviceStatus = param => { return axios.post(`/api/products/devices-status`, param,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};
