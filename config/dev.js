/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          // target: 'http://yapi.smart-xwork.cn/mock/130692',
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  },
};
