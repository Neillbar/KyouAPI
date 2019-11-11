var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalSchema = new Schema ({

"name":{type:String,required:true},
"latitude":{type: Number,required:true},
"longitude":{type:Number,required:true},
"description":{type:String,required:true},
"date": {type:Date,required:true,default:Date.now}



})

module.exports = mongoose.model("hospitals",hospitalSchema);