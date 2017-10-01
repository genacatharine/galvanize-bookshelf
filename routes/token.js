const jwt = require('jsonwebtoken')
const express = require('express')
var knex = require('../knex')
const router = express.Router();
const humps= require('humps')
const camelNew=humps.camelizeKeys('users')


/* GET users listing. */
router.get('/token', function(req, res, next) {

  // let token;
  // console.log(req.cookies.token)
  if (!req.cookies.token) {
    res.send(false)
  }


  res.end();
  // res.send(`${user.name} you've been here ${user.visits} times`);
});
router.post('/token', function(req, res, next) {
  knex('users')
    .where('email', req.body.email)
    .then((users) => {
      let user = users[0];
      delete user.hashed_password;
      delete user.created_at;
      delete user.updated_at;
      let camelUser = humps.camelizeKeys(user);
      console.log(camelUser);
      let cookie = jwt.sign(camelUser, process.env.JWT_KEY);
      console.log(cookie);
      res.cookie('token', cookie, {httpOnly: true});
      res.send(camelUser);
    })


})

router.get('/token', function(req, res, next){
  if (req.cookies.token) {
    res.send(true)
  }

})

module.exports = router;
