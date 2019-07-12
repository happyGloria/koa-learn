let mongoose = require('mongoose');
let personSchema = new mongoose.Schema({
  name: String,
  age: Number
}, {
  collection: 'person'
});
// 发布模型

mongoose.model('Person', personSchema);