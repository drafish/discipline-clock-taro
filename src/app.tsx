import { Component } from 'react';
import { Provider } from 'react-redux';
import dva from './utils/dva';
import user from './models/user';
import record from './models/record';
import './app.less';

const dvaApp = dva.createApp({
  initialState: {},
  models: [user, record],
});
const store = dvaApp.getStore();
global.store = store;

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
