import { Component } from 'react';
import { getCurrentInstance, navigateTo, navigateBack } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { CellGroup, Cell, Button } from '@antmjs/vantui';
import { connect } from 'react-redux';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  detail: ConnectState['record']['detail'];
  userInfo: ConnectState['user']['userInfo'];
}
interface StateType {
  id?: string;
  nickname?: string;
}
class Index extends Component<PropsType, StateType> {
  state = {
    id: undefined,
    nickname: undefined,
  };

  componentDidMount() {
    const params = getCurrentInstance()?.router?.params;
    this.setState(
      { id: params?.id, nickname: params?.nickname },
      this.getDetail,
    );
  }

  getDetail = () => {
    this.props.dispatch({
      type: 'record/detail',
      payload: { id: this.state.id },
    });
  };

  render() {
    const { detail, userInfo } = this.props;
    const { nickname } = this.state;
    return (
      <View className={styles.layout}>
        <CellGroup title='详情'>
          <Cell title='昵称' value={nickname} />
          <Cell title='柔忏' value={detail.baichan} />
          <Cell title='经典' value={detail.songjing} />
          <Cell title='行善' value={detail.xingshan} />
          <Cell title='名号' value={detail.nianfo} />
          <Cell title='日期' value={detail.recordDate} />
          <Cell title='提交时间' value={detail.createTime} />
        </CellGroup>
        <View className={styles.button}>
          {detail.userId === userInfo.id && (
            <Button
              type='info'
              onClick={() =>
                navigateTo({
                  url: `/pages/record/update/index?id=${detail.id}`,
                })
              }
            >
              修改
            </Button>
          )}
          <Button onClick={() => navigateBack()}>返回</Button>
        </View>
      </View>
    );
  }
}

export default connect(({ record, user }: ConnectState) => ({
  detail: record.detail,
  userInfo: user.userInfo,
}))(Index);
