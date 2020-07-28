import { axios} from '../config.js';
/*获取产品种类*/
export const getCategories = params => { return axios.get(`/api/products/categories`,  {params:params ,headers: { 'current-party-id' : '7pr47w53y0w0'}})};
/*添加种类*/
export const addCategory = params => { return axios.post(`/api/products/categories`,  params, {headers: { 'current-party-id' : '7pr47w53y0w0'}})};
/*更改种类*/
export const updateCategory = (params,category_id)=> { return axios.put(`/api/products/categories/${category_id}`,  params, {headers: { 'current-party-id' : '7pr47w53y0w0'}})};
/*获取单个种类*/
export const getCategory = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
/*移除种类*/
export const remove = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
