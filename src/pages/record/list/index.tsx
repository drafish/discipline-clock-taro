import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { PowerScrollView, Cell, Tag } from '@antmjs/vantui';
import { connect } from 'react-redux';
import CustomTabbar from '@/components/CustomTabbar';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  pageList: ConnectState['record']['list'];
}
class Index extends Component<PropsType> {
  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    this.props.dispatch({
      type: 'record/refresh',
      payload: { pageNum: 1, pageSize: 20 },
    });
  };

  loadMore = async () => {
    const {
      dispatch,
      pageList: { pageNum, pageSize },
    } = this.props;
    dispatch({
      type: 'record/loadMore',
      payload: { pageNum: pageNum + 1, pageSize },
    });
  };

  render() {
    const {
      pageList: { list, totalCount },
    } = this.props;
    return (
      <View className={styles.layout}>
        <PowerScrollView
          className={styles.scrollView}
          //  通过 finishedText 可以设置数据已全部加载完毕的底部提示文案。
          finishedText='没有更多了'
          // 通过 successText 可以设置刷新成功后的顶提示文案。
          successText='刷新成功'
          onScrollToUpper={this.refresh}
          onScrollToLower={this.loadMore}
          current={list.length}
          finished={list.length === totalCount}
          // lowerThreshold={800}
        >
          {list.map((item) => (
            <Cell
              key={item.id}
              linkType='navigateTo'
              url={`/pages/record/detail/index?id=${item.id}&nickname=${item.user.nickname}`}
              renderTitle={
                <>
                  <View>
                    <Text className={styles.nickname}>
                      {item.user.nickname}
                    </Text>
                    {item.createTime.split(' ')[0] !== item.recordDate && (
                      <Tag type='primary'>补卡</Tag>
                    )}
                  </View>
                </>
              }
              value={`日期: ${item.recordDate}`}
              label={`提交于 ${item.createTime}`}
            />
          ))}
        </PowerScrollView>
        <CustomTabbar active={0} url='/pages/user/index' />
      </View>
    );
  }
}

export default connect(({ record }: ConnectState) => ({
  pageList: record.list,
}))(Index);
