const jwt = require('jsonwebtoken')
const express = require('express')
var knex = require('../knex')
const router = express.Router();
const humps = require('humps')
const JWT_KEY = process.env.JWT_KEY
const camelNew = humps.camelizeKeys('users')
const bcrypt = require('bcrypt')


/* GET users listing. */
router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
});

/* POST */
router.post('/token', function(req, res, next) {
  knex('users')
    .where('email', req.body.email)
    .first()
    .returning('*')
    //returning email, firstname, lastname, pass, id , createdat,updatedat
    .then((users) => {
      if (!users) { //if not a user send error
        res.setHeader('Content-Type', 'text/plain')
        res.status(400)
        res.send('Bad email or password')
      } else { //compare password to hashed password if it's a match set up a key and send new object
        bcrypt.compare(req.body.password, users.hashed_password, function(err, match) {
          if (match) {
            let token = jwt.sign({
              userId: users.id
            }, process.env.JWT_KEY);

            let newObj = {
              id: users.id,
              email: users.email,
              firstName: users.first_name,
              lastName: users.last_name
            }
            //set a cookie
            res.cookie('token', token, {
              httpOnly: true
            })
            res.status(200) //if a match send 200 status code and object
            res.setHeader('Content-Type', 'application/json')
            res.send(newObj)
          } else { //if they don't match send error
            res.setHeader('Content-Type', 'text/plain')
            res.status(400)
            res.send('Bad email or password')
          }

        })
      }
    });




})
/* DELETE */
router.delete('/token', function(req, res, next) {
  // console.log(cookie)
  // if (req.cookies.token)
  res.clearCookie('token')
  // .then((result) => {
  // console.log('token')
  // res.send('token')
  res.sendStatus(200)
})

module.exports = router;
