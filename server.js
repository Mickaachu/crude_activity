/* MODULES */
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql2 = require('mysql2')
const Joi = require("joi")
const app = express()

/* Middleware */
app.use(cors()) //enable cors
app.use(express.json()) // Enable the use of JSON Files
app.use(bodyParser.json()) // Enables the body parser



/* DATABASE CONNECTION */
// MySQL Database Information
const db = mysql2.createConnection({
    host:'localhost', // Change the value into public IP if necessary
    port:'9999',
    user:'root',
    password: 'louise',
    database:'crud_activity'
})
db.connect() // This will connect the code to the database connection

/* INPUT VALIDATOR */
function validate(apiRequest) {
    const schema = Joi.object({
        // User name is required with minimum of 4 char
        userName : Joi.string().min(4).required()
    })
    return schema.validate(apiRequest)
}

/* HOMEPAGE */
app.get('/',(req,res) =>{
    res.send("Welcome to the homepage")
})

/* API GET REQUEST */
app.get('/api/userList',(req,res) => {
    // db.query({query statement},function = results)
    db.query('SELECT * FROM userlist',(err,results,fields) => {
        if (err) throw err
        res.send(results)
    })
})

/* API POST REQUEST */
app.post('/api/addUser',(req,res) =>{
    // Validate the input
    const {error} = validate(req.body)
    // If the requirements did not meet return 400 Bad Request
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }    
    // Add new user
    db.query(`INSERT INTO userlist (userName) VALUES ("${req.body.userName}")`,(err) => {
        if (err) throw err
        console.log("[ INSERT SUCCESS ]")
    })
    // Show list of users
    db.query('SELECT * FROM userlist',(err,results) => {
        if (err) throw err
        res.send(results)
    })
})

/* API PUT REQUEST */
app.put('/api/editUser/:id',(req,res) => {
    // Find if the user is existing
    db.query(`SELECT * FROM userlist WHERE id=${req.params.id}`,(err,results) => {
        if (err) throw err
        // If the user does not exist return 400 Bad Request
        if (results.length === 0){
            res.status(400).send("User does not exist.")
            return
        }
        // else update user data
        const {error} = validate(req.body)
        if (error){
            res.status(400).send(error.details[0].message)
            return 
        }
        db.query(`UPDATE userlist SET userName="${req.body.userName}" WHERE id=${req.params.id}`,(err)=>{
            if (err) throw err
        })
        // Show the updated list
        db.query('SELECT * FROM userlist',(err,results)=>{
            if (err) throw err
            res.send(results)
        })
    })
})

/* API DELETE REQUEST */
app.delete('/api/deleteUser/:id',(req,res)=>{
    // Find if the user is existing
    db.query(`SELECT * FROM userlist WHERE id=${req.params.id}`,(err,results) => {
        if (err) {throw err}
        if (results.length == 0){
            // If the user does not exist return 400 Bad Request
            res.status(400).send("User does not exist")
            return
        }
        // else delete user data
        db.query(`DELETE FROM userlist WHERE id=${req.params.id}`,(err)=>{
            if (err) throw err
        })
        // Show the updated list
        db.query('SELECT * FROM userlist',(err,results)=>{
            if (err) throw err
            res.send(results)
        })
    })
})

/* PORT CONFIG */
const port = process.env.PORT || 1111
app.listen(port, () => console.log(`Listening on port ${port}...`))
