class Person {
  constructor (name, age) {
    this._name = name;
    this._age = age
  }
  getName () {
    console.log(this._name)
  }
  setName (name) {
    this._name = name
  }
}

var p = new Person('Gloria', 18)
p.getName()
p.setName('赵')
p.getName()

// 继承

class Web extends Person {
  constructor (name, age, sex) {
    super(name, age)
    this.sex = sex
  }
  static classMethod () {
    return 'hello'
  }
  print () {
    console.log(`${this._name}-${this._age}- ${this.sex}`)
  }
}

var w = new Web('dd', 10, '男')
w.print()