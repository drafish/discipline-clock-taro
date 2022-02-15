import request from '@/utils/request';

export const update = (values: any) => {
  return request('/record/update', {
    method: 'POST',
    data: values,
  });
};

export const create = (values: any) => {
  return request('/record/create', {
    method: 'POST',
    data: values,
  });
};

export const del = (values: any) => {
  return request('/record/delete', {
    method: 'DELETE',
    data: values,
  });
};

export const list = (values: any) => {
  return request('/record/list', {
    method: 'GET',
    data: values,
  });
};

export const detail = (values: any) => {
  return request('/record/detail', {
    method: 'GET',
    data: values,
  });
};
