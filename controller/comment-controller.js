var router = require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('../helpers/data');
var filters = require('../helpers/filters');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
//var Post = require('../models/Post');
var Comment = require('../models/avis');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imgs');
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    var ext = mime.extension(file.mimetype);
    if(extensions.indexOf(ext) != -1) {
      cb(null, true);
    }else {
      cb(new Error('Fichier incorrect'));
    }
  }
}).single('picture');

var parser = bodyParser.urlencoded({extended: false});
//recupere l'id d'un post
router.get('/:id', function(req, res) {
  var idPost = req.params.id;

  Post.findById(idPost).populate('comments').exec(function(err, post) {
    res.render('detail.html', { post: post });
  });

});
//permet d'enregistrer un commentaire
router.post('/:id', parser, function(req, res) {
  var idPost = req.params.id;
  var pseudo = req.body.pseudo;
  var comment = req.body.message};

  var c = Comment({
    post: idPost,
    pseudo: pseudo,
    comment: comment
  }).save(function(err, comment) {
    Post.findById(idPost, function(err, post) {
      post.comments.push(comment.id);
      post.save(function(err, postSaved) {
        res.redirect('/post/'+idPost);
      });
    });
  });
});