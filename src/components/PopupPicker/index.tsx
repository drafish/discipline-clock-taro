import { Component } from 'react';
import { View } from '@tarojs/components';
import { Popup, DatetimePicker } from '@antmjs/vantui';
import dayjs from 'dayjs';

interface PropsType {
  onConfirm?: (e) => void;
  onCancel?: () => void;
  value?: string;
}

interface StateType {
  show: boolean;
}

class PopupPicker extends Component<PropsType, StateType> {
  state = { show: false };

  toggleShow(show) {
    this.setState({ show });
  }

  onConfirm = (e) => {
    if (this.props.onConfirm)
      this.props.onConfirm(dayjs(e.detail.value).format('YYYY-MM-DD'));
    this.setState({ show: false });
  };

  onCancel = () => {
    if (this.props.onCancel) this.props.onCancel();
    this.setState({ show: false });
  };

  render() {
    const { value } = this.props;
    // console.log(value);
    return (
      <>
        <View
          onClick={() => this.toggleShow(true)}
          style={{ minWidth: '200px' }}
        >
          {value}
        </View>
        <Popup
          position='bottom'
          show={this.state.show}
          onClose={() => this.toggleShow(false)}
        >
          <DatetimePicker
            type='date'
            value={dayjs(value).valueOf()}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            maxDate={dayjs().valueOf()}
          />
        </Popup>
      </>
    );
  }
}

export default PopupPicker;
