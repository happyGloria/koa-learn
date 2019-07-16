const router = require('koa-router')()
// const Person = require('../server/dbs/models/person.js')
const mongoose = require('mongoose')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson', async function (ctx, next) {
  const Person = mongoose.model('Person')
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 1
  } catch (error) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

router.post('/getPerson', async function(ctx, next) {
  const Person = mongoose.model('Person')
  const result = await Person.findOne({ name: ctx.request.body.name });
  const results = await Person.find({ name: ctx.request.body.name })
  ctx.body = {
    code: 1,
    result: result,
    results: results
  }
})

router.post('/updatePerson', async function (ctx, next) {
  const Person = mongoose.model('Person')
  let code
  try {
    await Person.where({
      name: ctx.request.body.name
    }).update({
      age: ctx.request.body.age
    })
    code = 1
  } catch(err) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

router.post('/delPerson', async function (ctx, next) {
  const Person = mongoose.model('Person')
  let code
  try {
    await Person.where({
      name: ctx.request.body.name
    }).remove()
    code = 1
  } catch(err) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

const koaRedis = require('koa-redis')
const Store = new koaRedis().client

router.get('/fix', async function(ctx, next) {
  const st = await Store.hset('fix','name', Math.random())
  ctx.body = {
    code: 1
  }
})
module.exports = router
