import { redirectTo, showToast } from '@tarojs/taro';
import uniqBy from 'lodash/uniqBy';
import { Effect, Reducer, PageList, ConnectState } from './connect';
import * as record from '../services/record';

export interface StateType {
  list: PageList;
  detail: { [key: string]: any };
  month: string[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    update: Effect;
    create: Effect;
    del: Effect;
    refresh: Effect;
    loadMore: Effect;
    detail: Effect;
    month: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Modal: ModelType = {
  namespace: 'record',
  state: {
    list: {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],
    },
    detail: {},
    month: [],
  },
  effects: {
    *update({ payload }) {
      const res = yield record.update(payload);
      if (res.code === 'SUCCESS') {
        showToast({ title: '修改成功', icon: 'success' });
        redirectTo({ url: '/pages/record/list/index' });
      }
      return res;
    },
    *create({ payload }) {
      const res = yield record.create(payload);
      if (res.code === 'SUCCESS') {
        showToast({ title: '创建成功', icon: 'success' });
        redirectTo({ url: '/pages/record/list/index' });
      }
      return res;
    },
    *del({ payload }) {
      const res = yield record.del(payload);
      if (res.code === 'SUCCESS') {
        showToast({ title: '删除成功', icon: 'success' });
      }
      return res;
    },
    *refresh({ payload }, { put, select }) {
      const res = yield record.list(payload);
      if (res.code === 'SUCCESS') {
        const { list } = yield select(
          ({ record: recordState }: ConnectState) => recordState,
        );
        res.detail.list = uniqBy(
          res.detail.list.concat(list.list),
          (item: any) => item.id,
        );
        yield put({
          type: 'save',
          payload: { list: res.detail },
        });
      }
    },
    *loadMore({ payload }, { put, select }) {
      const res = yield record.list(payload);
      if (res.code === 'SUCCESS') {
        const { list } = yield select(
          ({ record: recordState }: ConnectState) => recordState,
        );
        res.detail.list = list.list.concat(res.detail.list);
        yield put({
          type: 'save',
          payload: { list: res.detail },
        });
      }
    },
    *detail({ payload }, { put }) {
      const res = yield record.detail(payload);
      if (res.code === 'SUCCESS') {
        yield put({
          type: 'save',
          payload: { detail: res.detail },
        });
      }
    },
    *month({ payload }, { put }) {
      const res = yield record.month(payload);
      if (res.code === 'SUCCESS') {
        yield put({
          type: 'save',
          payload: { month: res.detail },
        });
      }
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
