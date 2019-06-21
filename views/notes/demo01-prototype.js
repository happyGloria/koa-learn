// 原型链
function Person (name, age) {
  this.name = name;
  this.age = age;
  this.run = function () {
    console.log(`${this.name}-${this.age}-is running.`)
  }
}

Person.set = function () {
  console.log('静态方法');
}

Person.prototype.work = function () {
  console.log(`${this.name}-${this.age}-工作是...`)
}

var p = new Person('张三', 20);
p.work()
Person.set()
// p.set() // 静态方法需要用类名来调用， p.set is not a function
console.log('==========================================')
// 继承
function Web (name, age) {
  Person.call(this, name, age); // 对象冒充实现继承
}

Web.prototype = new Person(); // 原型链继承
var w = new Web('李四', 28);
w.run()
w.work() // 对象冒充实现继承, 无法继承原型链上面的属性和方法。w.work is not a function