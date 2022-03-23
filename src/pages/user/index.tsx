import { Component } from 'react';
import { navigateTo, getUserProfile, login } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Cell, Divider, Button, Image } from '@antmjs/vantui';
import { connect } from 'react-redux';
import CustomTabbar from '@/components/CustomTabbar';
import { ConnectState, Dispatch } from '@/models/connect';
import { isWeb } from '@/utils/request';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  userInfo: ConnectState['user']['userInfo'];
}
class Index extends Component<PropsType> {
  render() {
    const {
      userInfo: { id, nickname, email, avatarUrl },
      dispatch,
    } = this.props;
    return (
      <View className={styles.layout}>
        {id ? (
          <>
            <Cell
              title='头像'
              renderExtra={
                <Image round width={100} height={100} src={avatarUrl} />
              }
            />
            <Cell title='昵称' value={nickname} />
            <Cell title='邮箱' value={email} />
            <Divider />
            <Cell
              isLink
              title='修改密码'
              linkType='navigateTo'
              url='/pages/user/updatePwd/index'
            />
            <Cell
              title='登出'
              onClick={() => {
                dispatch({
                  type: 'user/logout',
                });
              }}
            />
            {/* <Button
              className={styles.button}
              type='info'
              block
              onClick={() => {
                navigateTo({ url: '/pages/record/create/index' });
              }}
            >
              打卡
            </Button> */}
          </>
        ) : (
          <>
            <Cell
              isLink
              title='登录'
              linkType='navigateTo'
              url='/pages/user/login/index'
            />
            <Cell
              isLink
              title='注册'
              linkType='navigateTo'
              url='/pages/user/register/index'
            />
            {!isWeb && (
              <>
                <Divider />
                <Cell
                  isLink
                  title='微信授权登录，无需注册'
                  onClick={() => {
                    login({
                      success: ({ code }) => {
                        dispatch({
                          type: 'user/wxLogin',
                          payload: {
                            code,
                          },
                        });
                      },
                    });
                    getUserProfile({
                      desc: '获取您的昵称、头像',
                      success: ({ encryptedData, iv }) => {
                        dispatch({
                          type: 'user/wxAuthorize',
                          payload: {
                            encryptedData,
                            iv,
                          },
                        });
                      },
                    });
                  }}
                />
              </>
            )}
          </>
        )}
        <CustomTabbar url='/pages/user/index' />
      </View>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  userInfo: user.userInfo,
}))(Index);
