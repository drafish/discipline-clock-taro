import { Component } from 'react';
import { redirectTo } from '@tarojs/taro';
import { Tabbar, TabbarItem } from '@antmjs/vantui';

interface PropsType {
  url: string;
  active: number;
}

class CustomTabbar extends Component<PropsType> {
  render() {
    const { url, active } = this.props;
    return (
      <Tabbar
        style={{ height: '50px' }}
        active={active}
        onChange={() => {
          redirectTo({ url: url });
        }}
      >
        <TabbarItem icon='friends-o'>大厅</TabbarItem>
        <TabbarItem icon='user-o'>我的</TabbarItem>
      </Tabbar>
    );
  }
}

export default CustomTabbar;
