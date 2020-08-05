import { axios} from '../config.js';

/*获得产品*/
export const getProducts = params => { return axios.get(`/api/products/all`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*创建设备*/
export const create = (product_id,param) => { return axios.post(`/api/products/devices`, param,{params:product_id,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*获得列表*/
export const getList = params => { return axios.get(`/api/products/devices`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*状态总数*/
export const getStatistic = params => { return axios.get(`/api/products/devices/statistics`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*设备状态*/
export const getDeviceStatus = params => { return axios.post(`/api/products/devices-status`,  params, {headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*删除全部*/
export const deleteAll = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};

/*删除单个产品*/
export const deleted = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};

export const getEventAndService = params => { return axios.get(params._url,  {params:params._obj,headers: { 'current-party-id' : '7pr47w53y0w0'}})};
