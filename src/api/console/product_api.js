import { axios} from '../config.js';

/*获取产品*/
export const getProducts = params => { return axios.get(`/api/products`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};
/*获取单个产品*/
export const getProduct = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
/*新增产品*/
export const addProduct = params => { return axios.post(`/api/products`,  params, {headers: { 'current-party-id' : '7pr47w53y0w0'}})};
/*更新产品*/
export const updateProduct = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
/*更新状态*/
export const updateEnabledState = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
/*克隆*/
export const clone = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
/*删除*/
export const deletedProduct = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
