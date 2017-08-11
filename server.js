var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var app = express();

var secret = require('./config/secret');


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.engine('ejs',engine);
app.set('view engine', 'ejs');
var userRoutes = require('./routes/user');
app.use(userRoutes);
app.listen(process.env.PORT||3000,function(err){
  if(err) throw err;
  console.log("server is running at port " + secret.port);
});
