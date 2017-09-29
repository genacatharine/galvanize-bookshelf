// 'use strict';
// const jwt= require('jsonwebtoken')
// const express = require('express');
// // eslint-disable-next-line new-cap
// const router = express.Router();
//
// // YOUR CODE HERE
//
// module.exports = router;
//
// //
// router.get('/token', function(req, res, next) {
//   //verify that token matches cookie
//       jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
//         if (err) {
//         return res.send(false)
//         }
//         else{
//         res.send(true)
// }
//
// })
// })
// router.post('/token', function(req, res, next){
//
// //set a cookie
// insert({
//   id: 2,
//   first_name: req.body.firstName,
//   last_name: req.body.lastName,
//   email: req.body.email,
//   hashed_password: result //password that just got hashed
// }, '*')
// // .first()
// .then((camelNew) => {
//   let newUser = {
//     id: camelNew[0].id,
//     firstName: camelNew[0].first_name,
//     lastName: camelNew[0].last_name,
//     email: camelNew[0].email,
//     password: camelNew[0].password
//   }
//   res.send(newUser);
//   // res.sendStatus(200);
//    res.cookie("token", token)
//
// })
