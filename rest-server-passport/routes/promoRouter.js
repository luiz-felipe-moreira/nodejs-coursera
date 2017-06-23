var express = require('express');
var bodyParser = require('body-parser');

var Promotions = require('../models/promotions');

var promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get(function (req, res, next) {
        res.end('Will send all the promotionsRouter to you!');
    })

    .post(function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err) throw err;
            console.log('Promotion created!');
            var id = promotion._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        })
    })

    .delete(function (req, res, next) {
        res.end('Deleting all promotionsRouter');
    });

promotionsRouter.route('/:promotionId')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get(function (req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
    })

    .put(function (req, res, next) {
        res.write('Updating the promotion: ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting promotion: ' + req.params.promotionId);
    });

module.exports = promotionsRouter;