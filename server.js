
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');


var currency = require('./routes/currencyService');
var user=require('./routes/userService');
var login=require('./routes/loginService');



app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(cors());
app.use('/currency', currency);
app.use('/user',user);
app.use('/',login);
//app.use('/products', index);
router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request will be done here');
    next(); // make sure we go to the next routes and don't stop here
});
 

app.listen(port);
console.log('REST API is runnning at ' + port);

