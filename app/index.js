'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

/******************************
 * HOMEPAGE WITH THE COLORS   *
 ******************************/

app.get('/', function(req, res){
  res.render('home');
});

/******************************
 * CHECKERS                   *
 ******************************/

app.get('/checkers', function(req, res){
  res.render('checkers');
});

/******************************
 * ADD FOUR NUMBERS           *
 ******************************/

app.get('/add/:a/:b/:c/:d', function(req, res){
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.c *= 1;
  req.params.d *= 1;

  //console.log(req.params, req.query);

  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params); 
});

/******************************
 * SUM-LIST                   *
 ******************************/

app.get('/sumlist/:nums', function(req, res){
  
  var nums = req.params.nums.split(',');

  nums = nums.map(function(x){
    return x*1;
  });
  
  //console.log(nums);

  var sum = 0;
  
  for(var i=0; i<nums.length; i++){
    sum += nums[i];
  }
  
  //console.log(sum);

  res.render('sumlist', {nums:nums, sum:sum,
  even:req.query.even, odd:req.query.odd});
  
});


/******************************
 * ROLL DICE                  *
 ******************************/

app.get('/rolldice/:num', function(req, res){
  
  var num = req.params.num *= 1;
  var load = [];
  for(var i = 0; i < num; i++){
  
     load.push(Math.floor(Math.random() * 6) + 1);
  }
  var sum = 0;
  for(var j = 0; j < load.length; j++){
    
    sum += load[j];
  }

  

  res.render('rolldice', {load:load, sum:sum});

});








var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});

