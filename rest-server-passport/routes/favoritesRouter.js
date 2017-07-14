var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      })
      .populate('postedBy')
      .populate('dishes')
      .exec(function(err, favorites) {
        if (err) throw err;
        res.json(favorites);
      });
  })

  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      })
      .exec(function(err, favorites) {
        if (err) throw err;

        if (favorites === null) {
          var favoritos = {
            postedBy: '',
            dishes: []
          };
          favoritos.postedBy = req.decoded._doc._id;
          favoritos.dishes.push(req.body._id)

          Favorites.create(favoritos, function(err, favorites) {
            if (err) throw err;
            console.log('Favorites created!');
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });

            res.end(favoritos);
          });

        } else {

          //TODO incluir o valor no array apenas se ainda nao estiver no array
          favorites.dishes.push(req.body._id);

          favorites.save(function(err, favorites) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(favorites);
          });
        }
      })
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.remove({
      postedBy: req.decoded._doc._id
    }, function(err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

favoritesRouter.route('/:dishId')
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    // remove the specified dish from the list of the user's favorite dishes
    console.log('iniciando o processamento da requisição delete');

    Favorites.findOne({
      postedBy: req.decoded._doc._id
    })
    .exec(function(err, favorites) {
      if (err) throw err;
      console.log('Favoritos antes da deleção: ' + favorites);
      favorites.dishes.id(req.params.dishId).remove();
      console.log('Favoritos após a deleção: ' + favorites);
      favorites.save(function(err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = favoritesRouter;
