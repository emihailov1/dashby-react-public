import React, { useEffect } from 'react';
import { History } from 'history';
import { decode } from 'jsonwebtoken';
import { Roles } from './roles';

interface AuthWrapperProps {
  history: History<any>,
  roles: Roles[],
  redirectUrl: string
}

interface SecuredProps {
  roles: Roles[]
}

export const getRole = (token?: any) => {
  if(token === undefined) token = localStorage.getItem('token');
  return decode(token) != null ? decode(token).role : Roles.Anonymous;
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const setToken = (token:string) => {
  localStorage.setItem('token',token);
};

export const getRefreshToken = () => {
  const token = localStorage.getItem('refresh_token');
  return token;
};

export const setRefreshToken = (token:string) => {
  localStorage.setItem('refresh_token',token);
};

const isInRole = (roles: Roles[]) => {
    const role = getRole();
    return roles.includes(role);
};

export const shouldNavigateAway = (roles: Roles[]) => {
  return !isInRole(roles) ? true : false;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {

  useEffect(() => {
    if(shouldNavigateAway(props.roles)) props.history.push(props.redirectUrl);
  });

  return (
    <>
      {props.children}
    </>
  );
}

export const SecuredContent: React.FC<SecuredProps> = (props) => {

  if(shouldNavigateAway(props.roles)) return <></>;
  else return (
    <>
      {props.children}
    </>
  );

}

