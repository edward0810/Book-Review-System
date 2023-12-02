const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/all', async (req, res) => {
    var authors=await knex('author').select().where({}).then(author => {return author});
    return res.status(200).json({
        "message":"Select author Successfully!",
        "author_list":authors
     });
});

router.get('/findAid/:aid', async (req, res) => {
    const aid = req.params.aid;
    var author=await knex('author').select().where({"aid":aid}).then(author => {return author[0]});
    var book_list=await knex('book').select().where({"aid":aid}).then(books => {return books});
    var now_author={
        ...author,
        "book_list":book_list
    }
    if(author){
        return res.status(200).json({
            "message":"Select author Successfully!",
            "now_author":now_author
         });
    }else{
        return res.status(400).json({
            "message":"Select author Error!",
        });
    }
  
});


router.post('/', async (req, res) => {
    let {firstName} =req.body; 
    let {familyName} =req.body; 
    let {birth} =req.body; 
    var date=new Date(birth);
    await knex('author').insert({
        "aid":uuid.v4(),
        "firstName":firstName,
        "familyName":familyName,
        "birth":date
    }).then(result=>{
       return res.status(200).json({
            "message":"Added author successfully",
        })
    }).catch(reason => {
        console.log(reason);
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.put('/', async (req, res) => {
    let {aid} =req.body;
    let {firstName} =req.body; 
    let {familyName} =req.body; 
    let {birth} =req.body; 
    await knex('author').where({'aid':aid}).update({
        "firstName":firstName,
        "familyName":familyName,
        "birth":birth
    }).then(result=>{
       return res.status(200).json({
            "message":"Update author successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Update Error."});
    });
});


router.delete('/', async (req, res) => {
    let {aid} =req.body;
    await knex('book').delete().where({"aid":aid});
    var result=await knex('author').delete().where({
        "aid":aid
    }).then(result=>{
       return res.status(200).json({
            "message":"Delete author Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Delete error"});
    });
});


module.exports = router