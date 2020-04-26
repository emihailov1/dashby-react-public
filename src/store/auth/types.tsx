import { Roles } from '../../components/shared/roles';
export interface LoginState {
    username: string;
    password: string;
}

export interface AuthState {
    username : string,
    role: Roles,
    errorMessage?: string
}

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

interface AuthAction {
    type: typeof AUTH_USER ;
    payload: AuthState;
}
  
  export type AuthActionTypes = AuthAction;