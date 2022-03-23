import { Component } from 'react';
import { redirectTo } from '@tarojs/taro';
import { Tabbar, TabbarItem } from '@antmjs/vantui';

interface PropsType {
  url: string;
}

class CustomTabbar extends Component<PropsType> {
  render() {
    const { url } = this.props;
    return (
      <Tabbar
        style={{ height: '50px' }}
        active={url}
        onChange={({ detail }) => {
          redirectTo({ url: detail as string });
        }}
      >
        <TabbarItem icon='clock-o' name='/pages/record/create/index'>
          打卡
        </TabbarItem>
        <TabbarItem icon='friends-o' name='/pages/record/list/index'>
          大厅
        </TabbarItem>
        <TabbarItem icon='user-o' name='/pages/user/index'>
          我的
        </TabbarItem>
      </Tabbar>
    );
  }
}

export default CustomTabbar;
