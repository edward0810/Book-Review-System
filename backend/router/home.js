const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/', async (req, res) => {
    var book_number=0;
    var author_number=0;
    var genre_number=0;
    await knex('book').select().where({}).then(book => {book_number=book.length;});
    await knex('author').select().where({}).then(author => {author_number=author.length;});
    await knex('genre').select().where({}).then(genre => {genre_number=genre.length;});
    return res.status(200).json({
        "author_number":author_number,
        "book_number":book_number,
        "genre_number":genre_number
    });
});

module.exports = router