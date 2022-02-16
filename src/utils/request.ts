import {
  request,
  getEnv,
  showToast,
  setStorageSync,
  getStorageSync,
} from '@tarojs/taro';

export const isWeb = getEnv() === 'WEB';

export default (url: string, options: {}) => {
  return request({
    url: `${isWeb ? '/api' : 'https://liubuqu.top/api'}${url}`,
    ...options,
    ...(isWeb
      ? {}
      : {
          header: {
            Cookie: getStorageSync('cookie'),
          },
        }),
  }).then((res) => {
    if (!isWeb && res.header['Set-Cookie']) {
      setStorageSync('cookie', res.header['Set-Cookie']);
    }
    if (res.data.code === 'NOT_LOGIN') {
      showToast({
        title: '请重新登录',
        icon: 'error',
      });
      global.store.dispatch({ type: 'user/logout' });
      return res.data;
    }
    if (res.data.code !== 'SUCCESS') {
      showToast({ title: res.data.msg || 'response error', icon: 'error' });
    }
    return res.data;
  });
};
