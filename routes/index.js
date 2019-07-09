const router = require('koa-router')()
/* let render = require('koa-art-template')
render(new Koa(), {
  root: path.join(__dirname, 'views'), // 视图位置
  extname: '.html',
  debug: process.env.NODE_ENV != 'production' // 是否开启调试模式
}) */
router.get('/', async (ctx, next) => {
  global.console.log('/index')
  /* const a = await A;
  const b = await B;
  const c = await C; */
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    list: [1, 2, 3, 4, 5]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
  ctx.cookies.set('name', 'happyGloria')
  console.log('转换base64:', Buffer.from('hello, wrold!').toString('base64')) // 转换成base64字符串 aGVsbG8sIHdvcmxkIQ==
  console.log('还原base64:', Buffer.from('aGVsbG8sIHdvcmxkIQ==', 'base64').toString()) //还原base64
  /* setTimeout(() => {
    console.log(ctx.cookies.get('name'))
  }, 1000) */
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/testAsync', async (ctx, next) => {
  global.console.log('start：', new Date().getTime())
  const A = await new Promise((resolve, reject) => { 
    // A是计算await后面的表达式， 
    // 如果没有await, A是拿不到222这个结果的，并且 ctx.body会先执行
    setTimeout(() => {
      global.console.log('async a：', new Date().getTime())
      resolve('222') // 异步结束之后，该结果返回给A
    }, 1000)
  })
  const B = await 12 // await会将后面的对象包装成Promise.resolve('ccc')
  const C = await new Promise((resolve, reject) => {
    setTimeout(() => {
      global.console.log('async c：', new Date().getTime())
      resolve('ddd') // 异步结束之后，该结果返回给A
    }, 3000)
  })
  ctx.body = {
    A,
    B,
    C
  }
})

router.get('/product/:aid', async (ctx) => {
  console.log('params: ', ctx.params) // params:  { aid: '1234' }
  ctx.body = '这是个商品页面'
})
module.exports = router
