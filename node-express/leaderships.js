var express = require('express');
var bodyParser = require('body-parser');

var leaderships = express.Router();

leaderships.use(bodyParser.json());

leaderships.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the leaderships to you!');
})

.post(function(req, res, next){
    res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
        res.end('Deleting all leaderships');
});

leaderships.route('/:leadershipId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leadership: ' + req.params.leadershipId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the leadership: ' + req.params.leadershipId + '\n');
    res.end('Will update the leadership: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leadership: ' + req.params.leadershipId);
});

module.exports = leaderships;