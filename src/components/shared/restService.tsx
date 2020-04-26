import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from '../../config';
import { getToken, getRefreshToken, setToken, setRefreshToken } from '../shared/authHelper';
import { logOut } from '../../store/auth/actions';
import store from '../../store';
import { history }  from '../../index';

const restService: AxiosInstance = axios.create({
    baseURL: config.url.BASE,
});

restService.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

restService.interceptors.response.use((response: AxiosResponse<any>) => {
    return response
    }, 
    function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const state = new FormData();
        state.set('scope', config.api.SCOPE);
        state.set('client_secret', config.api.CLIENT_SECRET);
        state.set('client_id', config.api.CLIENT_ID);
        state.set('grant_type', config.api.GRANT_TYPE_REFRESH);
        state.set('refresh_token', getRefreshToken() as string);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Accept": "application/json",
            },
            auth: {
                username: config.api.CLIENT_ID,
                password: config.api.CLIENT_SECRET
              }
          };


        return axios.post(config.url.REFRESH,state,axiosConfig)
            .then(response => {
                if (response.status === 201) {
                    // 1) put token to LocalStorage
                    setToken(response.data.access_token);
                    setRefreshToken(response.data.refresh_token);
    
                    // 2) Change Authorization header
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
                    axios.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    
                    // 3) return originalRequest object with Axios.
                    return axios(originalRequest) as unknown as AxiosResponse<any>; 
                }
            }).catch((e) => {
                console.log("Refreshing token failed with status:"+e.response.status);
                store.dispatch(logOut());
                history.push('/');
            });
    }
    // return Error object with Promise
   return Promise.reject(error);
});


export default restService;