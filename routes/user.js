var router = require('express').Router();
var passport = require('passport');
/**************************************/
// var he = require('he-sdk-nodejs');
// var settings = {
//     'client_secret': '4c75190518a990bc876ce8c4403ce171dd7e549d' ,
//     'async': 0 ,
//     'lang': 'C' ,
//     'time_limit': 5,
//     'memory_limit': 262144
// };
//
// router.post('/compile', function(req, res) {
//
//     settings.lang = 'C';
//   //  console.log("Here is the code:"+ req.body.code);
//     var source=req.body.code;
//     he.compile(settings , source , function(err , result){
//         //finalresponse += result;
//         //if(isJson(finalresponse))
//         //    res.send(finalresponse);
//         if(err)console.log(err);
//       //  console.log(result);;
//         res.send(result);
//     });
// });
//
// router.post('/run', function(req, res) {
//     settings.lang = 'C';
//     //var finalresponse = "";
//     var source=req.body.code;
//
//     he.run(settings, source , function(err, result){
//         //finalresponse += result;
//         //if(isJson(finalresponse))
//         //    res.send(finalresponse);
//         console.log(result);
//         res.send(result);
//     });
// });
/**************************************/
var hackerEarth = require("hackerearth-node");
var hackerEarth = new hackerEarth("4c75190518a990bc876ce8c4403ce171dd7e549d",'');

var config={};
config.time_limit=5;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to hackerEarth api
config.input="1";  //input against which you have to test your source code
config.language="C"; //optional choose any one of them or none

router.post("/compile",function(req,res){

  config.source=req.body.code;
  config.language=req.body.language;
      console.log("Code is : "+ config.source);
   hackerEarth.compile(config,function(err,response){

       if(err) {
           console.log("There is error");
   console.log(err);
       } else {
           res.send(response);
       }
 });
});
router.post("/run",function(req,res){
  config.source=req.body.code;
  config.language=req.body.language;
  hackerEarth.run(config,function(err,response){
         if(err) {
          console.log("This is error"+ err);
         } else {
           //deal with response
           res.send(response);
         }
   });

});





/********************************************/

router.get('/login',function(req,res)
{
//  if(req.user) return res.redirect('/');
  res.render('accounts/login', {message:req.flash('loginMessage')});
});



router.post('/login', passport.authenticate('local-login',{
  successRedirect: '/aceEditor',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/profile',function(req,res,next)
{
  User.findOne({_id: req.user._id}, function(err,user)
{
  if(err) return next(err);
    res.render('accounts/profile', {user: user});
});
});
router.get('/',function(req,res)
{
   res.render('main/aceEditor');
});

router.get('/signup',function(req,res,next)
{
  res.render('accounts/signup', {
  errors: req.flash('errors')
 });
});

router.post('/signup',function(req,res,next)
{
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

User.findOne({email : req.body.email}, function(err, existingUser)
{
  if(existingUser)
  {
      req.flash('errors','Account with that email already exists');
    return res.redirect('/signup');
  }
  else {

      user.save(function(err, user){
        if(err) next(err);

          req.logIn(user,function(err){
            if(err) next(err);
            res.redirect('/aceEditor');
          });
       });
     }
  });
});
router.get('/logout',function(req,res,next)
{
req.logout();
res.redirect('/');
});






module.exports = router;
