'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:a/:b/:c/:d', function(req, res){
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.c *= 1;
  req.params.d *= 1;

  console.log(req.params, req.query);

  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params); 
});

app.get('/sumlist/:nums', function(req, res){
  
  var nums = req.params.nums.split(',');

  nums = nums.map(function(x){
    return x*1;
  });
  
  console.log(nums);

  var sum = 0;
  
  for(var i=0; i<nums.length; i++){
    sum += nums[i];
  }
  
  console.log(sum);

  res.render('sumlist', {nums:nums, sum:sum,
  even:req.query.even, odd:req.query.odd});
  
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);

});
