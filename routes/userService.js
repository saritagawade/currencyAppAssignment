var express=require('express');
var router=express.Router();
const user=require('../models/userModel');

router.post('/saveUser',function(req,res,next){
    console.log(req);
    //var dob=new Date(req.body.DOB);
    //console.log(dob);
    var users=new user({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        DOB:req.body.DOB,
        email_id:req.body.email_id,
        street_name:req.body.street_name,
        zipcode:req.body.zipcode,
        city:req.body.city,
        country:req.body.country
    });
    users.password=users.generateHash(req.body.password);
    users.save((err,data)=>{
        if(err){
                     let content = {
                        status : 400,
                        text :'Failed To Register details Email already exist'
                    }
                   res.status(400).send(content);
                   //res.send(err);
        }else{

                     let content = {
                        status : 201,
                        text :'Registration Successfull'
                    }
                    res.status(201).send(content);
        }
            
        
    });
   

//res.send("in user service");
});

module.exports=router;