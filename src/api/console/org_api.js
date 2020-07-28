import { axios} from '../config.js';

export const attach_orgs = () => { return axios.get(`/api/orgs/attach-orgs`,  {headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const addOrg = param => { return axios.post(`/api/orgs/addOrg`, param,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const editOrg = param => { return axios.put(param._url, param._body,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const out_org = params => {return axios.delete(`/api/orgs/out`,{params:params,headers: { 'current-party-id' : '7pr47w53y0w0'}})};
