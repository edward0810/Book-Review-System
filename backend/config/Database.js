const knex = require('knex')({
    client: 'mysql', 
    connection: {
      host : '127.0.0.1', 
      user : 'root', 
      password : '123',
      database : 'bookManager' 
    }
});



module.exports =knex;
