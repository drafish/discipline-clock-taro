import { Component } from 'react';
import { getCurrentInstance, navigateBack, showToast } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Stepper, Button, Form, FormItem } from '@antmjs/vantui';
import { IFormInstanceAPI } from '@antmjs/vantui/types/form';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { Dispatch, ConnectState } from '@/models/connect';
import PopupPicker from '@/components/PopupPicker';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  detail: ConnectState['record']['detail'];
  loading?: boolean;
}
interface StateType {
  id?: string;
}
class Index extends Component<PropsType, StateType> {
  state = {
    id: undefined,
  };

  componentDidMount() {
    const params = getCurrentInstance()?.router?.params;
    this.setState({ id: params?.id }, this.getDetail);
  }

  form: IFormInstanceAPI;

  getDetail = () => {
    this.props.dispatch({
      type: 'record/detail',
      payload: { id: this.state.id },
    });
  };

  render() {
    const { detail, loading } = this.props;
    const { id } = this.state;
    return (
      <View className={styles.layout}>
        <Form
          className={styles.form}
          ref={(el) => (this.form = el)}
          initialValues={pick(detail, [
            'baichan',
            'songjing',
            'nianfo',
            'xingshan',
            'recordDate',
          ])}
          onFinish={() => {
            this.form.validateFields((errorMessage, fieldValues) => {
              if (errorMessage && errorMessage.length) {
                console.info('errorMessage', errorMessage);
                return;
              }
              const { baichan, songjing, nianfo, xingshan } = fieldValues;
              if (baichan + songjing + nianfo + xingshan === 0) {
                showToast({ title: '无数据不打卡', icon: 'error' });
                return;
              }
              this.props.dispatch({
                type: 'record/update',
                payload: { id: Number(id), ...fieldValues },
              });
            });
          }}
        >
          <FormItem
            label='柔忏'
            name='baichan'
            validateTrigger='onBlur'
            required
          >
            <Stepper min={0} />
          </FormItem>
          <FormItem
            label='经典'
            name='songjing'
            validateTrigger='onBlur'
            required
          >
            <Stepper min={0} />
          </FormItem>
          <FormItem
            label='行善'
            name='xingshan'
            validateTrigger='onBlur'
            required
          >
            <Stepper min={0} />
          </FormItem>
          <FormItem
            label='名号'
            name='nianfo'
            validateTrigger='onBlur'
            required
          >
            <Stepper inputWidth={100} step={1000} min={0} />
          </FormItem>
          <FormItem
            label='日期'
            name='recordDate'
            trigger='onConfirm'
            valueFormat={(val) => val}
            required
          >
            <PopupPicker />
          </FormItem>
          <View className={styles.button}>
            <Button type='info' formType='submit' loading={loading}>
              提交
            </Button>
            <Button onClick={() => navigateBack()}>返回</Button>
          </View>
        </Form>
      </View>
    );
  }
}

export default connect(({ record, loading }: ConnectState) => ({
  detail: record.detail,
  loading: loading.effects['record/update'],
}))(Index);
