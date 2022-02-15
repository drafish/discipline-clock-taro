import { AnyAction } from 'redux';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { StateType as UserStateType } from './user';
import { StateType as RecordStateType } from './record';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    user?: boolean;
    record?: boolean;
  };
}

export interface PageList<T = { [key: string]: any }> {
  pageNum: number;
  pageSize: number;
  totalCount: number;
  list: T[];
}

export interface ConnectState {
  loading: Loading;
  user: UserStateType;
  record: RecordStateType;
}

export interface Action<T = any> {
  type: T;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A,
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A,
) => void;

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (
  api: SubscriptionAPI,
  done: Function,
) => void | Function;
