import { axios} from '../config.js';

export const cteate = param => { return axios.post(`/api/applications`, param,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*获得列表*/
export const getList = params => { return axios.get(`/api/applications`,  {params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

/*删除列表*/
export const deleted = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
