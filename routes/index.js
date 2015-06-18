var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function(io){
  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    name = name.replace(/%20/," ");
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, name: name} );
  });

  router.get('/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    name = name.replace(/%20/," ");
    var id = parseInt(req.params.id);
    var list = tweetBank.find( {id: id} );
    console.log(list);
    res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, showForm: true, name: name} );
  });

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit("new_tweet", tweetBank.find({name:name, text:text})[0]);
    res.redirect('/');
  });

  return router;
};