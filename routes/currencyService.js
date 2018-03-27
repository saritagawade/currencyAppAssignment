var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request=require('request');
var exchange = require("exchange-rates"),
fx = require("money");
var jwt = require('jsonwebtoken');
const config = require('../models/token');
var userQueries=require('../models/ExchangeQueryModel');
mongoose.connect("mongodb://localhost:27017/currencyExchange");
//mongoose.connect('mongodb://localhost:27017/products');


/* GET home page. */

router.get('/rates/:value/:from/:To/:date', function(req, res, next) {
  
  
  // money.js is all set up:
  var fromcurr=req.params['from'];
   var tocurr=req.params['To'];
   var date=req.params['date'];
   var value=req.params['value'];

    var token = req.headers.token;
          console.log(token)
        var decoded = jwt.verify(token,config.secret);
        console.log(">>>",decoded);
  
  recievedDateTimestamp=new Date(date).getTime();
  currentDateTimestamp=new Date().getTime();
  console.log(recievedDateTimestamp);
   console.log(currentDateTimestamp);
   //var d = new Date(date); 
   var recivedDate=prepareDate(new Date(date));
   var curent_date=prepareDate(new Date());
  
      function prepareDate(dateToPrepare){
     var d=dateToPrepare;
     var curr_date = d.getDate();
        if(curr_date < 10) {
               curr_date = '0' + curr_date;
            }   
     var curr_month = d.getMonth() + 1; //Months are zero based
            if(curr_month < 10) {
                       curr_month = '0' + curr_month;
                        } 
    
    var curr_year = d.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
     //document.write(curr_year + "-" + curr_month + "-" + curr_date);
   }
    //console.log(recievedDateTimestamp<currentDateTimestamp);
    if(recievedDateTimestamp<currentDateTimestamp)
      {

        console.log("in if");

           var url= `https://openexchangerates.org/api/historical/${recivedDate}.json?app_id=99be3f54fd4149b2af12431b5f1bb5a4`;
            request({
                     url:url,
                     json:true},
                     (err,response,body)=>{
                              if(err)
                               res.send(err);
                              else{
                                       // console.log(body["rates"]);
                                      exchange.load(function() {
                                      // Apply exchange rates and base rate to `fx` object:
                                    fx.base = body["base"];
                                      fx.rates =body["rates"];  // always include the base rate (1:1)
                                      var val=fx(value).from(fromcurr).to(tocurr); // 1.586 or etc.

                                      //code to save currencyExchange Details in userQueries collection
                                      var queries=new userQueries();
                                      queries.exchange_value=value;
                                      queries.from_currency=fromcurr;
                                      queries.to_currency=tocurr;
                                      queries.converted_value=val;
                                      queries.exchange_rate_date=recivedDate;
                                      queries.query_date=new Date();
                                      queries.user_id=decoded.id;
                                      console.log(">>>",new Date(recivedDate));
                                      queries.save((err,data)=>{
                                        if(err)
                                          res.send(err);
                                        console.log("successfully stored",data);
                                      }) ;
                                      
                                      let content = {
                                                status : 200,
                                                value:val 
                                            }
                                                                    
                                     
                                      res.send(content);
                                        });
                                    
                                  }
                             
                              });

        

       } 
      else{
              var url= "https://openexchangerates.org/api/latest.json?app_id=99be3f54fd4149b2af12431b5f1bb5a4";
       request({
                url:url,
                json:true},(err,response,body)=>{
                 if(err)
                    res.send(err);
                  else{
                        // console.log(body["rates"]);
                        //console.log(body["base"]);
                        exchange.load(function() {
                        // Apply exchange rates and base rate to `fx` object:
                      fx.base = body["base"];
                        fx.rates =body["rates"];  // always include the base rate (1:1)
                        var val=fx(value).from(fromcurr).to(tocurr); // 1.586 or etc.
                         var queries=new userQueries();
                                      queries.exchange_value=value;
                                      queries.from_currency=fromcurr;
                                      queries.to_currency=tocurr;
                                      queries.converted_value=val;
                                      queries.exchange_rate_date=curent_date;
                                      queries.query_date=new Date();
                                      queries.save((err,data)=>{
                                        if(err)
                                          res.send(err);
                                        console.log("successfully stored",data);
                                      }) 
                        res.json({val});
                          });
                        
                        }
                      });
      }

 

 });

 router.get('/getCurrency',(req,res,next)=>{
//res.send('in get currency');
// userQueries.find(function(err,data){
//   res.json(data);
// })
//  userQueries.find({}, { _id: 0 , exchange_value: 1, from_currency: 1,to_currency:1,converted_value:1 },function(err, result){
//    if(err)
//     res.send(err);
//    res.send(result);

//  })
 var token = req.headers.token;
          console.log(token)
        var decoded = jwt.verify(token,config.secret);
        console.log(">>>",decoded);
userQueries.find({user_id:decoded.id},{ _id: 0 , exchange_value: 1, from_currency: 1,to_currency:1,converted_value:1,query_date:1 }).sort({"query_date": -1}).limit(10).exec((err, products) => {
  res.send(products);
})

 });


//  router.get('/history', function(req, res, next) {

//  var url= "https://openexchangerates.org/api/historical/2013-02-16.json?app_id=99be3f54fd4149b2af12431b5f1bb5a4";
//  request({
//     url:url,
//     json:true},(err,response,body)=>{
//       if(err)
//         res.send(err);
//       else
//         res.json(body);
//     });

//  });
  
// https://openexchangerates.org/api/convert/19999.95/GBP/EUR?app_id=YOUR_APP_ID

//  router.route('/products').post(function (req, res,next) {
//    console.log(JSON.stringify(req.body));
//     var p = new product();
//     p.title = req.body.title;
//     p.price = req.body.price;
//     p.instock = req.body.instock;
//     p.photo = req.body.photo;
//     p.save(function (err) {
//         if (err) {
//             res.send(err);
//         }
         
//         res.send({ message: 'Product Created !' })
//     })
// });

//   router.route('/getproducts').get(function (req, res,next) {
//     product.find(function (err, products) {
//         if (err) {
//             res.send(err);
//         }
//         res.send(products);
//     });
// });
// router.route('/getProductById/:product_id').get(function(req,res,next){
// product.findById(req.params.product_id,function(err,product){
//   if(err)
//     res.send(err);
//   res.json(product);
// });
// });

// router.route('/updateProduct/:product_id').put(function(req,res,next){
// product.findById(req.params.product_id,function(err,prod){
// if(err)
//   res.send(err);
// prod.title=req.body.title;
// prod.price=req.body.price;
// prod.instock=req.body.instock;
// prod.photo=req.body.photo;
// prod.save(function(err){
//   if(err)
//     res.send(err);
//   res.json({message:"record Updated"});
// });
// });
// });

// router.route('/delete/:product_id').delete(function(req,res,next){
//   product.remove({_id:req.params.product_id},function(err,prod){
//     if(err)
//       res.send(err);

//     res.json({message:"successfully deleted"});
//   });
// });

module.exports = router;