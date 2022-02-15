import { redirectTo } from '@tarojs/taro';
import { Input, View, Text, Image } from '@tarojs/components';
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
  captcha: string;
}

class LoginPage extends PureComponent<PropsType> {
  componentDidMount() {
    this.getCaptcha();
  }

  getCaptcha = () => {
    this.props.dispatch({ type: 'user/captcha' });
  };

  form: IFormInstanceAPI;

  render() {
    const { loading, captcha } = this.props;

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
                type: 'user/login',
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
            label='密码'
            name='password'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
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
              <View onClick={this.getCaptcha}>
                <Image className={styles.img} src={captcha} />
              </View>
            }
            required
          >
            <Input placeholder='图片验证码' />
          </FormItem>
          <View className={styles.button}>
            <Button loading={loading} type='primary' formType='submit'>
              登录
            </Button>
            <Text
              onClick={() => redirectTo({ url: '/pages/user/register/index' })}
              className={styles.floatRight}
            >
              没有账号？去注册
            </Text>
          </View>
        </Form>
      </View>
    );
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  captcha: user.captcha,
  loading: loading.effects['user/login'],
}))(LoginPage);
