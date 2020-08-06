import { axios} from '../config.js';

export const getProductImages = params => { return axios.get(params._url,  {params:params._obj,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const addProductImage = (params,form) => { return axios.post(params._url, form,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const updateProductImage = (params,form) => { return axios.put(params._url, form,{headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const deleteProductImage = params=> { return axios.put(params._url, '',{headers: { 'current-party-id' : '7pr47w53y0w0'}})};
