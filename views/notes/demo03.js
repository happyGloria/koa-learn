// 实现单例

class Person {
  static getInstance () {
    if (!Person.instance) {
      Person.instance = new Person();
    }
    return Person.instance;
  }
  constructor () {
    console.log('构造函数里的方法') // 实例化时，会触发
  }
  connect () {

  }
  find () {
    console.log('查询数据库里的方法')
  }
}

var p1 = Person.getInstance()
var p2 = Person.getInstance()
console.log(p1.find(), p2.find())