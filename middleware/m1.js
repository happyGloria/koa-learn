// m1 统计功能
// 1. 声明一个函数，用来执行app的处理过程
function m1(ctx) {
  global.console.log('m1');
}

// 2. 导出处理过程，导出一个函数，这是因为外层引用会写成 app.use(m1())
module.exports = function () {
  return async function (ctx, next) { // 返回一个异步函数
    global.console.log('m1 start');
    m1(ctx);
    await next(); // 当前中间件运行完毕，交给下一个中间件
    global.console.log('m1 end');
  }
}
