const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/all', async (req, res) => {
    var books=await knex('book').select().where({}).then(book => {return book});
    var book_list=[];
    for(var i=0;i<books.length;i++){
        var author=await knex('author').select().where({"aid":books[i].aid}).then(author => {return author[0]});
        var genre=await knex('genre').select().where({"gid":books[i].gid}).then(genre => {return genre[0]});
        book_list.push({
            ...books[i],
            "author":author,
            "genre":genre
        })
    }
    return res.status(200).json({
        "message":"Select Book Successfully!",
        "book_list":book_list
     });
});

router.get('/findBid/:bid', async (req, res) => {
    const bid = req.params.bid;
    var book=await knex('book').select().where({"bid":bid}).then(book => {return book[0]});
    
    if(book){
        var author=await knex('author').select().where({"aid":book.aid}).then(author => {return author[0]});
        var genre=await knex('genre').select().where({"gid":book.gid}).then(genre => {return genre[0]});
        var review=await knex('review').select().where({"bid":book.bid}).then(review => {return review});
        var now_review=[];
        for(var j=0;j<review.length;j++){
           var user=await knex('users').select().where({"uid":review[j].uid}).then(user => {return user[0]});
           now_review.push({
            ...review[j],
            "user":user
           });
        }
        var now_book={
            ...book,
            "author":author,
            "genre":genre,
            "review":now_review
        }
        return res.status(200).json({
            "message":"Select Book Successfully!",
            "now_book":now_book
         });
    }else{
        return res.status(400).json({
            "message":"Select Book Error!",
        });
    }

});


router.post('/', async (req, res) => {
    let {title} =req.body;
    let {summary} =req.body; 
    let {gid} =req.body; 
    let {aid} =req.body; 
    await knex('book').insert({
        "bid":uuid.v4(),
        "title":title,
        "summary":summary,
        "aid":aid,
        "gid":gid
    }).then(result=>{
       return res.status(200).json({
            "message":"Added Book successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.put('/', async (req, res) => {
    let {bid} =req.body;
    let {title} =req.body;
    let {summary} =req.body; 
    let {gid} =req.body; 
    let {aid} =req.body; 
    await knex('book').where({'bid':bid}).update({
        "title":title,
        "summary":summary,
        "aid":aid,
        "gid":gid
    }).then(result=>{
       return res.status(200).json({
            "message":"Update Book successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Update Error."});
    });
});


router.delete('/', async (req, res) => {
    let {bid} =req.body;
    var result=await knex('book').delete().where({
        "bid":bid
    }).then(result=>{
       return res.status(200).json({
            "message":"Delete Book Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Delete error"});
    });
});


module.exports = router