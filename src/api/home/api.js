import { axios} from '../config.js';

/*登陆系统*/
export const userLogin = params => { return axios.post(`/api/auth/login`,  params)};
/*退出系统*/
export const exitSystem = params => { return axios.post(`/api/auth/signout`,{params:params})};
