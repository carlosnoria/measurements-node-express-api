const pg = require('pg');
const config = require('../config')

const pool = new pg.Pool(config.db1)
pool.connect((err,client,done) => {
   if(err){
       console.log("not able to get connection "+ err);
   } 
   client.query('CREATE TABLE measurement(id SERIAL PRIMARY KEY, description VARCHAR(40) not null, temperature NUMERIC(10, 2) not null, humidity NUMERIC(10, 2) not null, height NUMERIC(10, 2) not null, pressure NUMERIC(10, 2) not null)', [],function(err,result) {
       done(); // closing the connection;
       if(err){
           console.log(err);
       }
       console.log("Database successfully created.")
   });
});

pool.end()