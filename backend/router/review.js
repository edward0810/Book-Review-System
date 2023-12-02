const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');


router.post('/', async (req, res) => {
    let {text} =req.body;
    let {uid} =req.body; 
    let {bid} =req.body; 
    await knex('review').insert({
        "rid":uuid.v4(),
        "uid":uid,
        "bid":bid,
        "text":text,
        "date":new Date()
    }).then(result=>{
       return res.status(200).json({
            "message":"Review success.",
        })
    }).catch(reason => {
        console.log(reason);
        return res.status(402).json({ "error": true,message:"Review Error."});
    });
});







module.exports = router