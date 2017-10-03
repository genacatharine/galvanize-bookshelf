'use strict';
const boom = require('boom')
const jwt = require('jsonwebtoken')
const express = require('express');
const knex = require('../knex')
const JWT_KEY = process.env.JWT_KEY

// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps')


const authorize= (req, res, next)=> {
  jwt.verify(req.cookies.token, JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(400).send('Unauthorized')
    }
    req.claim = decoded
    console.log(req.claim.user_id)
    next()
  })
}

router.get('/favorites', authorize, function(req, res, next) {
  knex('favorites')
    .innerJoin('books', 'favorites.book_id', '=', 'books.id')
    .where('favorites.user_id', req.claim.usersID)

    .then((rows) => {
      const favs = humps.camelizeKeys(rows)

      res.send(favs)
    })
    .catch((err) => {
      next(err)
    })
})
//
router.get('/favorites/check', authorize, function(req, res, next) {
// //
// //   console.log('req bookid', req.query.bookId)
// //
  knex('favorites')
    // .('books', 'favorites.book_id', 'books.id')

    .where('book_id', req.query.bookId)
    .then((rows) => {
      const favs = humps.camelizeKeys(rows)

      if (favs.length<1) {
        // console.log('favs', favs)
        res.status(200)
        res.send(false)
      } else {
        res.status(200)
        res.send(true)

      }


  })
  .catch((err) => {
    next(err)
})
})
//
// router.post('/favorites', authorize, function(req, res, next) {
//   // console.log('req claim ', req.claim);
//   // console.log('reqbody', req.body);
//
//
//   knex('favorites')
//     .insert({
//       book_id: req.body.bookId,
//       user_id: req.claim.usersID
//     })
//     .then((result) => {
//         res.status(200)
//         res.send(result)
//       }
//
//     )
// })
// //
// router.delete('/favorites', authorize, function(req, res, next) {
//   knex('favorites')
//     .del()
//     .where('book_id', req.query.bookId)
//     .then((result) => {
//   res.status(200)
//   res.send(result)
//     })
//
// })
module.exports = router;
