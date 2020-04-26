import axios from 'axios';
import { LoginState, AuthActionTypes, AuthState, AUTH_USER, AUTH_ERROR } from './types';
import config from '../../config';
import { getRole } from '../../components/shared/authHelper';

export const logIn = (newState: LoginState, callback: any) => async dispatch => {
    try {
        const state = new FormData();
        state.set('scope', config.api.SCOPE);
        state.set('client_secret', config.api.CLIENT_SECRET);
        state.set('client_id', config.api.CLIENT_ID);
        state.set('grant_type', config.api.GRANT_TYPE);
        state.set('username', newState.username);
        state.set('password', newState.password);
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
        const response = await axios.post(config.url.LOGIN, state,axiosConfig);
        const role = getRole(response.data.access_token);
        //To Do Don't forget to set username
        const authState:AuthState = {
            username: '',
            role
        }
        const result: AuthActionTypes = {type: AUTH_USER, payload: authState};
        dispatch(result);
        localStorage.setItem('token',response.data.access_token);
        localStorage.setItem('refresh_token',response.data.refresh_token);
        callback();
    } catch(e) {
        dispatch({
            type: AUTH_ERROR, 
            payload: e.response.data.error_description
        });
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    const role = getRole();
    const authState:AuthState = {
        username: '',
        role
    }
    return {
        type: AUTH_USER,
        payload: authState
    }
};
