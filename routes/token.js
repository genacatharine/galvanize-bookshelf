const jwt = require('jsonwebtoken')
const express = require('express')
var knex = require('../knex')
const router = express.Router();
const humps = require('humps')
const JWT_KEY = process.env.JWT_KEY
const camelNew = humps.camelizeKeys('users')


/* GET users listing. */
router.get('/token', (req, res) => {
jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err){
      // })
      // }
      // '/token', function(req, res, next) {
      // if (!req.cookies.token) {
      res.send(false)
  }
  else {
    res.send(true)
  }
})
});

/* POST */
router.post('/token', function(req, res, next) {
  knex('users')
    .where('email', req.body.email)
    .then((users) => {
      let user = users[0];
      delete user.hashed_password;
      delete user.created_at;
      delete user.updated_at;
      let camelUser = humps.camelizeKeys(user);
      // console.log(camelUser);
      let cookie = jwt.sign(camelUser, process.env.JWT_KEY);
      // console.log(cookie);
      res.cookie('token', cookie, {
        httpOnly: true
      });
      res.send(camelUser);
    })


})
/* DELETE */
router.delete('/token', function(req, res, next) {
  // console.log(cookie)
  if (req.cookies.token)
    res.clearCookie('token')
    .then((result) => {
      // console.log('token')
      res.send('token')
      res.sendStatus(200)
    })
})

module.exports = router;
