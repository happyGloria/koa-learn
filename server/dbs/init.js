const mongoose = require('mongoose');
const {
  dbs
} = require('./config.js');
const glob = require('glob');
const { resolve } = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './models', '**/*.js')).forEach(require)
}
exports.connect = () => {
  // 连接数据库
  mongoose.connect(dbs, {
    useNewUrlParser: true
  })
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    // 增加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(dbs)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })
    mongoose.connection.on('error', (err) => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(dbs)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })
    // 链接打开的时
    mongoose.connection.once('open', () => {
      console.log('***********数据库连接成功***********')
      resolve()
    })
  })
}