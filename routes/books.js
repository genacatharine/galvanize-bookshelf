'use strict';

const express = require('express');
const knex = require('../knex')
const humps= require('humps')
const camelNew=humps.camelizeKeys('books')
const bcrypt = require('bcrypt');


// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/books', function(req, res, next){
  knex(camelNew)
  .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
  .orderBy('title')
  .then((books) => {
    res.send(books);
  })
  .catch((err) => {
    next(err);

})
})

//
router.get('/books/:id', function(req, res, next){
  knex(camelNew)
  .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
  .where('id', req.params.id)
  .first()
  .then((books) => {
    if (books.length<1) {
      return next();
    }

    res.send(books);
  })
  .catch((err) => {
    next(err);
})
})
// //
router.post('/books', function(req, res, next){
  knex(camelNew)
.insert({
  author: req.body.author,
  cover_url: req.body.coverUrl,
  description: req.body.description,
  genre: req.body.genre,
  title: req.body.title
}, '*')
// .first()
.then((books) => {
  let newBook = {
    id: books[0].id,
    author: books[0].author,
    coverUrl: books[0].cover_url,
    description: books[0].description,
    genre: books[0].genre,
    title: books[0].title
  }
  res.send(newBook);

})
.catch((err) => {
  next(err);
});
});
//
// //
router.patch('/books/:id', function(req, res, next){
  const id= req.params.id
  const {
    author,
    coverUrl,
    description,
    genre,
    title
  } = req.body
let newObj= {}
if (title){
  newObj.title =title
}
if(author){
  newObj.author=author
}
if (genre){
  newObj.genre=genre
}
if (description){
  newObj.description=description
}
if(coverUrl){
  newObj.cover_url = coverUrl
}

  knex(camelNew)
  .where('id', id)


  .then((books)=>{
  knex(camelNew)
  .update(newObj)
  .where('id', id)
  .returning('*')


  .then((books) => {
    let book=   {
      id: books[0].id,
      author: books[0].author,
      coverUrl: books[0].cover_url,
      description: books[0].description,
      genre: books[0].genre,
      title: books[0].title
    }
    res.json(book)
  })
  .catch((err)=> {
    next(err)
  })

})
})

router.delete('/books/:id', (req, res, next) => {
  let books;

  knex('books')
    .where('id', req.params.id)
    .first() //makes it an object
    .then((row) => {
      if (!row) {
        return next();
      }

      books = row;

      return knex('books')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      let camelNew = humps.camelizeKeys(books)
      delete camelNew.id;
      res.send(camelNew);
    })
    .catch((err) => {
      next(boom.create(400, 'Something went wrong!'));
    });
});

module.exports = router;
