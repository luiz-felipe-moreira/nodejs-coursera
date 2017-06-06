var express = require('express');
var morgan = require('morgan');

var dishes = require('./dishes.js');
var promotions = require('./promotions.js');
var leaderships = require('./leaderships.js');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes',dishes);
app.use('/promotions', promotions);
app.use('/leaderships', leaderships);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});