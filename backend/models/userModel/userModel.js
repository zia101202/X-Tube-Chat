// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId :
  {
    type:String, 
    required: true,
  } ,
  email :   {
    type:String, 
    required: true,
    unique: true,
  } ,
  name :   {
    type:String, 
    required: true,
  } ,
  nickname:   {
    type:String, 
    required: true,
  } ,
  picture:   {
    type:String, 
    required: true,
  } ,
  sub:  {
    type:String, 
    required: true,
  } ,
 updated_at:   {
  type:String, 
  required: true,
} 
});

module.exports = mongoose.model('User', userSchema);
