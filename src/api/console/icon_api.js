import { axios} from '../config.js';

/*获取图片列表*/
export const getIconImages = params => { return axios.get(`/api/products/icons/list`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*删除单个图标*/
export const deleteIconImage = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};

/*上传图标*/
export const addIconImage = param => { return axios.post(`/api/products/icons/create`, param,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*编辑模态框*/
export const updateProductImage = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
