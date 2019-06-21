let MongoClient = require('mongodb').MongoClient,
  dbUrl = 'mongodb://localhost:27017',
  dbName = 'koa'
// 连接数据库
console.time('start')
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err)
    return
  }
  const db = client.db(dbName) // 选择数据库
  // 选择表， 增加数据
  db.collection('user').insertOne({
    'username': 'Gloria',
    'age': 25,
    'sex': 'FeMale',
    'status': '0'
  }, (err, result) => {
    if (!err) {
      console.log('增加数据成功')
      client.close()
      console.timeEnd('start')
    }
  })
})

console.time('start1')

// 查询数据
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err)
    return
  }
  let db = client.db(dbName)
  let result = db.collection('user').find({});
  result.toArray((err, docs) => {
    console.timeEnd('start1')
    // console.log(docs)
  })
})

console.time('start2')
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err)
    return
  }
  let db = client.db(dbName)
  let res = db.collection('user').find({})
  res.toArray((err, docs) => {
    console.timeEnd('start2')
    // console.log(docs)
  })
})