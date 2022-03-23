export default defineAppConfig({
  pages: [
    'pages/record/create/index',
    'pages/record/list/index',
    'pages/record/detail/index',
    'pages/record/update/index',
    'pages/user/index',
    'pages/user/login/index',
    'pages/user/register/index',
    'pages/user/updatePwd/index',
  ],
  animation: false,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
