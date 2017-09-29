'use strict';

var knex = require('../knex')
// const humps = require('humps')
const bcrypt = require('bcrypt')
// let camelNew = humps.camelizeKeys('users')
const express = require('express')


// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', function(req, res, next) {

  const {firstName, lastName, email, password}= req.body
  bcrypt.hash(password, 10)
  .then((hash_pass)=>{
    return knex('users') //
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        hashed_password: hash_pass  //password that just got hashed
      },'*')
        })
      .then((users) => {
        let newUser = {
          id: users[0].id,
          firstName: users[0].first_name,
          lastName: users[0].last_name,
          email: users[0].email,

        }
        res.send(newUser);

      })
      .catch((err) => {
        next(err);
    });

})


module.exports = router
