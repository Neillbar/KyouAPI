var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
name: {type: String,required: true},
phoneNumber: {type:String,required:true},
language: {type:String,required:true},
idNumber:{type:String,required:true},
email: {type:String,required:true},
password:{type:String,required:true},
date:{type:Date,required:true,default:Date.now}
});


module.exports = mongoose.model("users",UsersSchema);