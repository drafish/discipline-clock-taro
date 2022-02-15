import { Input, View } from '@tarojs/components';
import { Form, FormItem, Button } from '@antmjs/vantui';
import { IFormInstanceAPI } from '@antmjs/vantui/types/form';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  loading?: boolean;
}

class LoginPage extends PureComponent<PropsType> {
  componentDidMount() {}

  form: IFormInstanceAPI;

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.layout}>
        <Form
          className={styles.form}
          ref={(el) => (this.form = el)}
          onFinish={() => {
            this.form.validateFields((errorMessage, fieldValues) => {
              if (errorMessage && errorMessage.length) {
                console.info('errorMessage', errorMessage);
                // Toast.fail('用户名或密码不能为空');
                return;
              }
              this.props.dispatch({
                type: 'user/updatePwd',
                payload: fieldValues,
              });
            });
          }}
        >
          <FormItem
            label='旧密码'
            name='oldPassword'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            required
          >
            <Input password placeholder='请输入密码' />
          </FormItem>
          <FormItem
            label='新密码'
            name='newPassword'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            rules={{
              rule: /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/,
              message: '密码必须包含字母+数字，不少于8位',
            }}
            required
          >
            <Input password placeholder='请输入密码' />
          </FormItem>
          <FormItem
            label='确认密码'
            name='confirmPassword'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            rules={{
              rule: (val, call) => {
                if (this.form.getFieldValue('newPassword') !== val) {
                  call('两次密码输入不一致');
                }
              },
            }}
            required
          >
            <Input password placeholder='请输入密码' />
          </FormItem>
          <View className={styles.button}>
            <Button loading={loading} type='primary' formType='submit'>
              确认
            </Button>
          </View>
        </Form>
      </View>
    );
  }
}

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects['user/login'],
}))(LoginPage);
