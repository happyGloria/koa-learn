const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaPV = require('./middleware/koa-pv.js')
const index = require('./routes/index')
const users = require('./routes/users')
const { connect, initSchemas } = require('./server/dbs/init.js')
// error handler
onerror(app)

// middlewares 配置post提交数据的中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

/* app.use(session)
app.use(Redis) */

/* // session
const session = require('koa-session')
app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess', // cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge is ms （default is 1 days）
  overwrite: true, // 是否可以overwrite，默认是true
  httpOnly: true, // cookie 是否只有服务器端可以访问， 默认是true
  signed: true, // 默认是true
  rolling: true, // 在每次请求时强行设置cookie, 将重置cookie过期时间（默认false）
  renew: false // when session is nearly expired
}
app.use(session(CONFIG, app)) */
// session-end

// redis-start
app.keys = ['keys', 'keykeys']
app.use(session({
  key: 'mt',
  prefix: 'mtpr',
  store: new redisStore() // 存储session
}))
app.use(koaPV())
// redis-end
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// index.routes()启动路由。
// index.allowedMethods用在了index.routes()之后，表示在当所有路由中间件最后调用，此时根据ctx.status设置response响应头
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 数据库
;(async () => {
  await connect()
  initSchemas()
})()
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
