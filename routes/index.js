const router = require('koa-router')()
router.get('/', async (ctx, next) => {
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

router.get('/product/:aid', async (ctx) => {
  console.log('params: ', ctx.params) // params:  { aid: '1234' }
  ctx.body = '这是个商品页面'
})
module.exports = router
