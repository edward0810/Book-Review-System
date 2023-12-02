const express = require('express')
const router = express.Router()
const knex =require('../config/Database');


router.post('/login', async (req, res) => {
    let {username} =req.body;
    let {password} =req.body; 
    if(username&&password){
        var result=await knex('users').select().where({userName:username,password:password}).then(users => {return users[0]});
        if(!result){
            return res.status(401).json({ "error": true,message:"The username is faill."});
        }
        return res.status(200).json({
            "message":"Login Successfully!",
            "user":result
        });
    }else{
        res.status(400).json({ "error": true,"message": "Request body incomplete, both username and password are required."});
    }
});



module.exports = router