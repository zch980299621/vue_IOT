import { axios} from '../config.js';

export const getFeatures = params => { return axios.get(params._url,  {params:params._obj,headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const getFeature = params => { return axios.get(params._url,  {headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const deleteFeature = params => { return axios.put(params._url, params._body , {headers: { 'current-party-id' : '7pr47w53y0w0'}})};

export const middleWarePushModel = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};

export const middleWarePushConfig = params =>  { return axios({ url: params._url,method: params._method, data: params._body ,header: {  'current-party-id' : '7pr47w53y0w0' }}).then(res => res )};
