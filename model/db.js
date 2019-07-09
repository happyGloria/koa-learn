// DB库
let MongoDB = require('mongodb'),
  MongoClient = MongoDB.MongoClient,
  Config = require('./config.js'),
  ObjectID = MongoDB.ObjectID

class DB {
  static getInstance () {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance
  }
  constructor () {
    this.dbClient = ''
    this.connect()
  }
  connect () {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!_this.dbClient) {
        MongoClient.connect(Config.dbUrl, (err, client) => {
          if (err) {
            reject(err)
          }
          _this.dbClient = client.db(Config.dbName)
          resolve(_this.dbClient) // 返回一个db
        })
      } else {
        resolve(_this.dbClient)
      }
    })
  }
  find (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let res = db.collection(collectionName).find(json)
        res.toArray((err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        })
      })
    })
  }
  update (collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.conllection(collectionName).insertOne(json, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }
  remove(collectionName, json) {
    return new Promise(resolve, reject).then((resolve, reject) => {
      db.collection(collectionName).removeOne(json, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  getObjectId(id) {
    return new ObjectID(id)
  }
}

module.exports = DB.getInstance()
/* var myDb = DB.getInstance()

setTimeout(() => {
  console.time('start')
  myDb.find('user', {}).then(d => {
    console.timeEnd('start')
  })
}, 100)

setTimeout(() => {
  console.time('start1')
  myDb.find('user', {}).then(d => {
    console.timeEnd('start1')
  })
}, 3000)


setTimeout(() => {
  console.time('start2')
  myDb.find('user', {}).then(d => {
    console.timeEnd('start2')
  })
}, 5000)

var mydb2 = DB.getInstance()

setTimeout(() => {
  console.time('start3')
  mydb2.find('user', {}).then((d) => {
    console.timeEnd('start3')
  })
}, 7000)

setTimeout(() => {
  console.time('start4')
  mydb2.find('user', {}).then((d) => {
    console.timeEnd('start4')
  })
}, 9000)

setTimeout(() => {
  console.time('start5')
  mydb2.find('user', {}).then((d) => {
    console.timeEnd('start5')
  })
}, 10000)


setTimeout(() => {
  console.time('start6')
  mydb2.find('user', {}).then((d) => {
    console.timeEnd('start6')
  })
}, 11000)


setTimeout(() => {
  console.time('start7')
  mydb2.find('user', {}).then((d) => {
    console.timeEnd('start7')
  })
}, 14000) */