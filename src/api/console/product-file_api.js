import { axios} from '../config.js';

export const getProductFiles = params => { return axios.get(params._url,  {params:params._obj,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const addProductFile = (params,form) => { return axios.post(params._url, form,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const updateProductFile = (params,form) => { return axios.put(params._url, form,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const deleteProductFile = params=> { return axios.put(params._url, '',{headers: { 'current-party-id' : '7pr47w53y0w0'}})};
