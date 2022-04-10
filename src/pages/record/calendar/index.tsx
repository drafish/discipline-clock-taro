import { Component } from 'react';
import { View } from '@tarojs/components';
import { Calendar } from '@antmjs/vantui';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import CustomTabbar from '@/components/CustomTabbar';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './index.less';

interface PropsType {
  dispatch: Dispatch;
  month: ConnectState['record']['month'];
  userInfo: ConnectState['user']['userInfo'];
}
interface StateType {
  minDate: number;
  maxDate: number;
}
class Index extends Component<PropsType, StateType> {
  state = {
    minDate: dayjs().startOf('month').valueOf(),
    maxDate: dayjs().endOf('month').valueOf(),
  };

  componentDidMount() {
    this.getMonth(dayjs().format('YYYY-MM'));
  }

  getMonth = (month: string) => {
    const { dispatch, userInfo } = this.props;
    dispatch({
      type: 'record/month',
      payload: { month, userId: userInfo.id },
    });
  };

  render() {
    const { month } = this.props;
    const { minDate, maxDate } = this.state;
    let pageY;
    return (
      <View
        className={styles.layout}
        onTouchStart={({ changedTouches }) => {
          pageY = changedTouches[0].pageY;
        }}
        onTouchEnd={({ changedTouches }) => {
          if (pageY === changedTouches[0].pageY) return;
          const dirctionY = pageY - changedTouches[0].pageY < 0 ? -1 : 1;
          this.setState({
            minDate: dayjs(minDate).add(dirctionY, 'month').valueOf(),
            maxDate: dayjs(maxDate).add(dirctionY, 'month').valueOf(),
          });
          this.getMonth(
            dayjs(minDate).add(dirctionY, 'month').format('YYYY-MM'),
          );
        }}
      >
        <Calendar
          title='日历'
          poppable={false}
          showConfirm={false}
          className={styles.calendar}
          type='multiple'
          defaultDate={month}
          minDate={minDate}
          maxDate={maxDate}
          color='#07c160'
        />
        <CustomTabbar url='/pages/record/calendar/index' />
      </View>
    );
  }
}

export default connect(({ record, user }: ConnectState) => ({
  month: record.month,
  userInfo: user.userInfo,
}))(Index);
