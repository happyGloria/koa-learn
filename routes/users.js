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
  const Person = mongoose.model('Person');
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
module.exports = router
