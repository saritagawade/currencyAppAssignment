var mongoose=require('mongoose');
var schema=mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); 
const config = require('../models/token');
const UserSchema=new schema({

    first_name:String,
    last_name:String,
    DOB:Date,
    email_id:{type:String,unique:true},
    street_name:String,
    zipcode:Number,
    city:String,
    country:String,
    password:String,
     tokens: [{
        token: {
        type: String
        }
    }]
})

UserSchema.methods.generateHash=function(password){
    
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

UserSchema.methods.generateAuthToken=function(user){
    console.log("in genarate authtoken");
    var data = {
            'id': user._id,
            'email': user.email_id,
            'uid':createUUID()
        }
        console.log(data);
         let token = jwt.sign(data, config.secret,{ expiresIn: 7200 });
         console.log(token);
          console.log(user.tokens.push({token}));
           user.save((err,result)=>{
            if(err){
                console.log('ERROR while Storing token in DB',err);
                 }
            console.log('Successfully Stores Token in DB');
        });
        return token;
        //console.log(data);

}
 function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 6; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[1] = hexDigits.substr((s[2] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    var uuid = s.join("");
    //console.log('Radom uuid',uuid);
    return uuid;
    }

module.exports=mongoose.model("User",UserSchema);