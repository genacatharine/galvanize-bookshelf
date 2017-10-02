'use strict';
const boom = require('boom')
const jwt = require('jsonwebtoken')
const express = require('express');
const knex = require('../knex')
const JWT_KEY = process.env.JWT_KEY
// eslint-disable-next-line new-cap
const router = express.Router();

const {camelizeKeys, decamelizeKeys} = require('humps');

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    req.claim = payload

    next()
  })
}

router.get('/favorites', authorize, function(req, res, next) {
  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .where('favorites.user_id', req.claim.userId)
    .then((rows) => {
      const favs = camelizeKeys(rows)

      res.send(favs)
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/favorites/check', authorize, function(req, res, next){
  knex('favorites')
  .then((rows)=>{
    // if(row) {
    res.status(200)
    res.send(true)
  
    // res.send(false)
})

  .catch((err)=>{
    next(err)
  })

  })
module.exports = router;
