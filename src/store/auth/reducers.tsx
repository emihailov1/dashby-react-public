import { AuthState, AUTH_USER, AUTH_ERROR } from './types';
import { getRole } from '../../components/shared/authHelper';

const initialState : AuthState  = {
    username: '',
    role: getRole(),
    errorMessage: ''
};

function authReducer(state = initialState,action) {
    switch(action.type){
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

export {authReducer};