var mongoose=require('mongoose');
var User=require('./userModel');
var schema=mongoose.Schema;

var userQueries=new schema({
exchange_value:Number,
from_currency:String,
to_currency:String,
converted_value:Number,
exchange_rate_date:Date,
query_date:Date,
user_id:{ type: schema.Types.ObjectId,ref: 'User'}

});

module.exports=mongoose.model("UserQueries",userQueries);