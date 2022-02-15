import { redirectTo, showToast } from '@tarojs/taro';
import { Input, View, Text } from '@tarojs/components';
import { Form, FormItem, Button } from '@antmjs/vantui';
import { IFormInstanceAPI } from '@antmjs/vantui/types/form';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  loading?: boolean;
  emailLoading?: boolean;
}

interface StateType {
  count: number;
}

class LoginPage extends PureComponent<PropsType, StateType> {
  state = {
    count: 0,
  };

  componentDidMount() {}

  getCaptcha = (email: string) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/email', payload: { email } }).then((resp) => {
      if (resp.code === 'SUCCESS') {
        let count = 60;
        this.setState({ count });
        const interval = setInterval(() => {
          count--;
          this.setState({ count });
          if (count === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  };

  form: IFormInstanceAPI;

  render() {
    const { loading, emailLoading } = this.props;
    const { count } = this.state;
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
                type: 'user/register',
                payload: fieldValues,
              });
            });
          }}
        >
          <FormItem
            label='邮箱'
            name='email'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            rules={{
              rule: (val, call) => {
                if (!isEmail(val)) {
                  call('邮箱格式不正确');
                }
              },
            }}
            required
          >
            <Input placeholder='请输入邮箱' />
          </FormItem>
          <FormItem
            label='微信昵称'
            name='nickname'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            required
          >
            <Input placeholder='请输入微信昵称' />
          </FormItem>
          <FormItem
            label='密码'
            name='password'
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
                if (this.form.getFieldValue('password') !== val) {
                  call('两次密码输入不一致');
                }
              },
            }}
            required
          >
            <Input password placeholder='请输入密码' />
          </FormItem>
          <FormItem
            label='验证码'
            name='captcha'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
            renderRight={
              <Button
                className={styles.captcha}
                loading={emailLoading}
                onClick={() => {
                  if (!this.form.getFieldValue('email')) {
                    showToast({ title: '请先输入邮箱', icon: 'error' });
                  } else {
                    this.getCaptcha(this.form.getFieldValue('email'));
                  }
                }}
              >
                {count ? `${count}s` : '获取验证码'}
              </Button>
            }
            required
          >
            <Input placeholder='邮箱验证码' />
          </FormItem>
          <View className={styles.button}>
            <Button loading={loading} type='primary' formType='submit'>
              注册
            </Button>
            <Text
              onClick={() => redirectTo({ url: '/pages/user/login/index' })}
              className={styles.floatRight}
            >
              有账号？去登录
            </Text>
          </View>
        </Form>
      </View>
    );
  }
}

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects['user/register'],
  emailLoading: loading.effects['user/email'],
}))(LoginPage);
