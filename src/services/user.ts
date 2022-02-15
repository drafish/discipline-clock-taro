import request from '@/utils/request';

export const login = (values: any) => {
  return request('/user/login', {
    method: 'POST',
    data: values,
  });
};

export const wxLogin = (values: any) => {
  return request('/user/wxLogin', {
    method: 'POST',
    data: values,
  });
};

export const wxAuthorize = (values: any) => {
  return request('/user/wxAuthorize', {
    method: 'POST',
    data: values,
  });
};

export const logout = () => {
  return request('/user/logout', {
    method: 'GET',
  });
};

export const captcha = () => {
  return request('/user/captcha', {
    method: 'GET',
  });
};

export const email = (values: any) => {
  return request('/user/email', {
    method: 'POST',
    data: values,
  });
};

export const register = (values: any) => {
  return request('/user/register', {
    method: 'POST',
    data: values,
  });
};

export const updatePwd = (values: any) => {
  return request('/user/updatePwd', {
    method: 'POST',
    data: values,
  });
};
