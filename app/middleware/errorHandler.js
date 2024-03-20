module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 处理异常
      ctx.app.emit('error', err, ctx); // 将错误抛出到应用级别错误事件
      ctx.status = err.status || 500;
      ctx.body = {
        code: ctx.status,
        message: err.message,
      };
    }
  };
};
