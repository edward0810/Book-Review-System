const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/all', async (req, res) => {
    var genres=await knex('genre').select().where({}).then(genre => {return genre});
    return res.status(200).json({
        "message":"Select genre Successfully!",
        "genre_list":genres
     });
});

router.get('/findGid/:gid', async (req, res) => {
    const gid = req.params.gid;
    var genre=await knex('genre').select().where({"gid":gid}).then(genre => {return genre[0]});
    var book_list=await knex('book').select().where({"gid":gid}).then(books => {return books});
    var now_author={};
    var now_book_list=[];
    for(var i=0;i<book_list.length;i++){
        var now_book={};
        var author=await knex('author').select().where({"aid":book_list[i].aid}).then(author => {return author[0]});
        now_book={
            ...book_list[i],
            "author":author
        };
        now_book_list.push(now_book);
    }
    var now_genre={
        ...genre,
        "book_list":now_book_list
    }
    if(genre){
        return res.status(200).json({
            "message":"Select genre Successfully!",
            "now_genre":now_genre
         });
    }else{
        return res.status(400).json({
            "message":"Select genre Error!",
         });
    }
  
});


router.post('/', async (req, res) => {
    let {name} =req.body; 
    await knex('genre').insert({
        "gid":uuid.v4(),
        "name":name
    }).then(result=>{
       return res.status(200).json({
            "message":"Added genre successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.put('/', async (req, res) => {
    let {gid} =req.body;
    let {name} =req.body; 
    await knex('genre').where({'gid':gid}).update({
        "name":name
    }).then(result=>{
       return res.status(200).json({
            "message":"Update genre successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Update Error."});
    });
});


router.delete('/', async (req, res) => {
    let {gid} =req.body;
    await knex('book').delete().where({"gid":gid});
    var result=await knex('genre').delete().where({
        "gid":gid
    }).then(result=>{
       return res.status(200).json({
            "message":"Delete genre Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Delete error"});
    });
});


module.exports = router