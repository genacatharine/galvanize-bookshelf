'use strict';
const boom = require('boom')
const jwt = require('jsonwebtoken')
const express = require('express');
const knex = require('../knex')
const JWT_KEY = process.env.JWT_KEY
// eslint-disable-next-line new-cap
const router = express.Router();

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    req.claim = payload
    // console.log(req.claim);

    next()
  })
}

router.get('/favorites', authorize, function(req, res, next) {
  // console.log('token', req.claim);
  knex('favorites')
    .innerJoin('books', 'favorites.book_id', '=', 'books.id')
    .where('favorites.user_id', req.claim.usersID)
    .then((rows) => {
      // console.log('rows', rows);
      const favs = camelizeKeys(rows)

      res.send(favs)
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/favorites/check', authorize, function(req, res, next) {

  knex('favorites')
    .innerJoin('books', 'favorites.book_id', 'books.id')
    // console.log(req.query)
    .where('book_id', req.query.bookId)

    .then((rows) => {
      // console.log(req.query.bookId)

      if (rows.length<0) {
        console.log(rows)
        res.status(200)
        res.send(false)
      } else {
        res.status(200)
        res.send(true)

      }
    })

  // .catch((err) => {
  //   next(err)
  // })

})
router.post('/favorites', authorize, function(req, res, next) {
  knex('favorites')
    .insert(
      req.body
    )
    .then((result) => {
        res.status(200)
        res.send(result)
      }

    )
})
router.delete('/favorites', authorize, function(req, res, next) {
  knex('favorites')
    .del()
    .where('book_id', req.query.bookId)
    .then((result) => {
  res.status(200)
  res.send(result)
    })

})
module.exports = router;
