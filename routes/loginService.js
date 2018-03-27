var express=require('express');
var router=express.Router();
var User=require('../models/userModel')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const config = require('../models/token');
var users=new User();


router.get('/', function(req, res, next) {
  console.log("in Route");
  res.render('login.html');
});
router.post('/login',function(req,res,next){
    //console.log(req.body);
    //res.send("in login");
    User.find({"email_id":req.body.email_id},function(err,user){
        if(err)
            console.log(err);
        console.log(user);
        if(user=="") {
            console.log("not found");
                let result = {
                    status : 401,
                    text : 'Invalid Credentials Please check Username or password again'
                }
                res.status(401).send(result);
            }
            else{
                enteredPwd=req.body.password;
                userPwd=user[0]["password"];
               // console.log(users.validPassword(req.body.password));
                //console.log(user.validPassword(req.body.password));
            //    var pwdMatch=users.matchPassword(enteredPwd,userPwd);
            //                 console.log(pwdMatch);

              var matchPwd=bcrypt.compareSync(enteredPwd,userPwd, function(err, data) {
                                if(err)
                                    console.log("error");
                                        console.log(data)
                             return data;
                            });

               console.log(matchPwd);
                       
                if(!matchPwd){
                            console.log('In incorrect');
                        let content = {
                            status : 401,
                            text : 'Incorrect password'
                        }
                        res.status(401).send(content);
                        return;
                        }
                    else{
                         console.log('In  correct');
                        let token = users.generateAuthToken(user[0]);
                        let content = {
                            status : 201,
                            success :true,
                            //forgotPassword :false,
                            token: token
                        };
                        res.status(201).send(content);
                        return;
                    }
               // res.send("inelse");

            }
        
    })
     

})

    //Logout api to delete token
    router.delete('/logout',(req,res,next)=>{
          var token = req.headers.token;
          console.log(token)
        var decoded = jwt.verify(token,config.secret);
        console.log(decoded);
          User.update({'email_id':decoded.email,'_id':decoded.id}, {$pull:{tokens :{token}}}, (err, doc)=>{
              if(err){
                console.log(err); res.status(403).send(err);
              }
            console.log(doc);
               let content = {
                status : 200,
                message: 'Successfully logged out'
            }
                res.send(content);
             // res.status(200).send(doc);
          });
    });

module.exports=router;