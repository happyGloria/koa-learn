// DB库
let MongoClient = require('mongodb').MongoClient,
  Config = require('./config.js')

class DB {
  constructor () {
    this.connect()
  }
  connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(Config.dbUrl, (err, client) => {
        if (err) {
          reject(err)
        }
        resolve(client.db(Config.dbName)) // 返回一个db
      })
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
  update () {

  }
  insert () {

  }
}

var mydb = new DB()

mydb.find('user', {}).then(d => console.log(d))