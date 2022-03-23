import { Component } from 'react';
import { showToast } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Stepper, Button, Form, FormItem } from '@antmjs/vantui';
import { IFormInstanceAPI } from '@antmjs/vantui/types/form';
import { connect } from 'react-redux';
import CustomTabbar from '@/components/CustomTabbar';
import dayjs from 'dayjs';
import { Dispatch, ConnectState } from '@/models/connect';
import PopupPicker from '@/components/PopupPicker';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  loading?: boolean;
}

class Index extends Component<PropsType> {
  form: IFormInstanceAPI;

  onShareAppMessage() {
    return {
      title: '六部曲打卡',
      path: '/pages/record/create/index',
    };
  }

  onShareTimeline() {
    return {
      title: '六部曲打卡',
      path: '/pages/record/create/index',
    };
  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.layout}>
        <Form
          className={styles.form}
          ref={(el) => (this.form = el)}
          initialValues={{
            baichan: 0,
            songjing: 0,
            nianfo: 0,
            xingshan: 0,
            recordDate: dayjs().format('YYYY-MM-DD'),
          }}
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
                type: 'record/create',
                payload: fieldValues,
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
            {/* <Button onClick={() => navigateBack()}>返回</Button> */}
          </View>
        </Form>
        <CustomTabbar url='/pages/record/create/index' />
      </View>
    );
  }
}

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects['record/create'],
}))(Index);
