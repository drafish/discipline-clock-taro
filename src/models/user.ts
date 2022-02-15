import {
  redirectTo,
  showToast,
  setStorageSync,
  getStorageSync,
  removeStorageSync,
} from '@tarojs/taro';
import { Effect, Reducer } from './connect';
import * as user from '../services/user';

export interface StateType {
  userInfo: {
    nickname: string;
    email: string;
    id: number;
    avatarUrl: string;
  };
  captcha: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    wxLogin: Effect;
    wxAuthorize: Effect;
    logout: Effect;
    register: Effect;
    updatePwd: Effect;
    captcha: Effect;
    email: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Modal: ModelType = {
  namespace: 'user',
  state: {
    userInfo: getStorageSync('userInfo') || {},
    captcha: '',
  },
  effects: {
    *login({ payload }, { put }) {
      const resp = yield user.login(payload);
      if (resp.code === 'SUCCESS') {
        setStorageSync('userInfo', resp.detail);
        yield put({
          type: 'save',
          payload: {
            userInfo: resp.detail,
          },
        });
        redirectTo({ url: '/pages/record/list/index' });
      } else if (resp.code !== 'CAPTCHA_ERROR') {
        yield put({ type: 'captcha' });
      }
      return resp;
    },
    *wxLogin({ payload }) {
      const resp = yield user.wxLogin(payload);
      return resp;
    },
    *wxAuthorize({ payload }, { put }) {
      const resp = yield user.wxAuthorize(payload);
      if (resp.code === 'SUCCESS') {
        setStorageSync('userInfo', resp.detail);
        yield put({
          type: 'save',
          payload: {
            userInfo: resp.detail,
          },
        });
        redirectTo({ url: '/pages/record/list/index' });
      }
      return resp;
    },
    *register({ payload }, { put }) {
      const resp = yield user.register(payload);
      if (resp.code === 'SUCCESS') {
        setStorageSync('userInfo', resp.detail);
        yield put({
          type: 'save',
          payload: {
            userInfo: resp.detail,
          },
        });
        redirectTo({ url: '/pages/record/list/index' });
      }
      return resp;
    },
    *logout(_, { put }) {
      const resp = yield user.logout();
      if (resp.code === 'SUCCESS') {
        yield put({
          type: 'save',
          payload: {
            userInfo: {},
          },
        });
        removeStorageSync('userInfo');
        redirectTo({ url: '/pages/user/login/index' });
      }
      return resp;
    },
    *captcha(_, { put }) {
      const resp = yield user.captcha();
      if (resp.code === 'SUCCESS') {
        yield put({
          type: 'save',
          payload: {
            captcha: resp.detail,
          },
        });
      }
    },
    *email({ payload }) {
      const resp = yield user.email(payload);
      return resp;
    },
    *updatePwd({ payload }, { put }) {
      const resp = yield user.updatePwd(payload);
      if (resp.code === 'SUCCESS') {
        showToast({ title: '密码更改成功', icon: 'success' });
        yield put({
          type: 'logout',
        });
      }
      return resp;
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Modal;
