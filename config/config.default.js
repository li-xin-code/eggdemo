/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1710774431927_4378';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.8.146',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'ticketing_system',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.onerror = {
    // all(err, ctx) {
    //   // 定义所有响应类型的错误处理方法
    //   // 定义了 config.all 后，其他错误处理不再生效
    //   ctx.body = 'error';
    //   ctx.status = 500;
    // },
    html(err, ctx) {
      // HTML 错误处理
      console.log(err);
      ctx.body = `<h3>${err}</h3>`;
      ctx.status = 500;
    },
    json(err, ctx) {
      // JSON 错误处理
      console.log(err);
      ctx.body = { err };
      ctx.status = 500;
    },
  };

  config.customLoader = {
    dao: {
      loadunit: true,
      directory: 'app/dao',
      inject: 'app',
    },
  };
  config.security = {
    csrf: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};
