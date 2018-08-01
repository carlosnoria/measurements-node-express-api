'use strict'

const pg = require('pg');
const config = require('../config')

function getMeasurements(req, res){
    let query = "SELECT * FROM measurement ORDER BY id ASC;"
    const pool = new pg.Pool(config.db1)
    pool.connect((err,client,done) => {
       if(err){
           console.log(`Not able to get the connection: ${err}`) 
           res.status(400).send({message:`Not able to get the connection: ${err}`})
           return
       } 
       client.query(query, [], function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err)
               return
           }
           res.status(200).send(result.rows)
           
       })
    })

    pool.end()
}

function getMeasurement(req, res){
    let productId = req.params.productId
    let query = "SELECT * FROM measurement WHERE id = $1;"
    const pool = new pg.Pool(config.db1)
    pool.connect((err,client,done) => {
       if(err){
            console.log(`Not able to get the connection: ${err}`) 
            res.status(400).send({message:`Not able to get the connection: ${err}`})
            return
       } 
       client.query(query, [productId], function(err,result) {
           done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err)
                return
            }
            if(result.rowCount == 0){
                res.status(404).send(result.rows)
                return
            }
           
            res.status(200).send(result.rows)
       })
    })

    pool.end()
}

function updateMeasurement(req, res){
    let mdescription = req.body.mdescription
    let mtemperature = req.body.mtemperature
    let mhumidity = req.body.mhumidity
    let mheight = req.body.mheight
    let mpressure = req.body.mpressure
    let productId = req.params.productId
    let query = "UPDATE measurement SET description = $2, temperature = $3, humidity = $4, height = $5, pressure = $6 WHERE id = $1;"
    let query2 = "SELECT * FROM measurement WHERE id = $1"
    const pool = new pg.Pool(config.db1)
    pool.connect((err,client,done) => {
       if(err){
            console.log(`Not able to get the connection: ${err}`) 
            res.status(400).send({message:`Not able to get the connection: ${err}`})
            return
       } 
       client.query(query, [productId, mdescription, mtemperature, mhumidity, mheight, mpressure], function(err,result) {
            if(err){
                console.log(err);
                res.status(400).send(err)
            }
            if(result.rowCount > 0){
                client.query(query2, [productId], function(err2,result2) {
                    done(); // closing the connection;
                    if(err){
                        console.log(err2);
                        res.status(400).send(err2)
                        return
                    }
                    if(result2.rowCount == 0){
                        res.status(404).send(result2.rows)
                        return
                    }
                   
                    res.status(200).send(result2.rows)
                })
                return
            }else{
                done();
                res.status(400).send({error: "Cannot update the measurement."})
                return
            }
       })
    })

    pool.end()
}

function deleteMeasurement(req, res){
    let productId = req.params.productId
    let query = "DELETE FROM measurement WHERE id = $1;"
    const pool = new pg.Pool(config.db1)
    pool.connect((err,client,done) => {
       if(err){
            console.log(`Not able to get the connection: ${err}`) 
            res.status(400).send({message:`Not able to get the connection: ${err}`})
            return
       } 
       client.query(query, [productId], function(err,result) {
           done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err)
                return
            }
            
            if(result.rowCount > 0){
                res.status(200).send({message: "Successfully deleted."})
                return    
            }else{
                res.status(400).send({error: "Cannot delete the measurement because it is no longer exists."})
                return 
            }
            
       })
    })

    pool.end()
}

function saveMeasurement(req, res){
    let mdescription = req.body.mdescription
    let mtemperature = req.body.mtemperature
    let mhumidity = req.body.mhumidity
    let mheight = req.body.mheight
    let mpressure = req.body.mpressure
    let query = "INSERT INTO measurement (description, temperature, humidity, height, pressure) VALUES($1, $2, $3, $4, $5);"
    let query2 = "SELECT * FROM measurement ORDER BY id DESC LIMIT $1"
    const pool = new pg.Pool(config.db1)
    pool.connect((err,client,done) => {
       if(err){
           console.log(`Not able to get the connection: ${err}`) 
           res.status(400).send({message:`Not able to get the connection: ${err}`})
           return
       } 
       client.query(query, [mdescription, mtemperature, mhumidity, mheight, mpressure], function(err,result) {
            if(err){
                console.log(err);
                res.status(400).send(err)
                return
            }
            
            if(result.rowCount > 0){
                client.query(query2, [result.rowCount], function(err2,result2) {
                    done(); // closing the connection;
                    if(err){
                        console.log(err2);
                        res.status(400).send(err2)
                        return
                    }
                    if(result2.rowCount == 0){
                        res.status(404).send(result2.rows)
                        return
                    }
                   
                    res.status(200).send(result2.rows)
                })
                return
            }else{
                done();
                res.status(400).send({error: "Cannot save the measurement."})
                return
            }
       })
    })

    pool.end()
}

module.exports = {
    getMeasurements,
    getMeasurement,
    updateMeasurement,
    deleteMeasurement,
    saveMeasurement
}