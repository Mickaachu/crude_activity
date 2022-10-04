const bodyParser = require("body-parser")
const express = require("express")
const Joi = require("joi")
const app = express()

/* Middlewares */
app.use(express.json()) // Enable the use of JSON Files
app.use(bodyParser.json()) // Enables the body parser

/* HOMEPAGE */
app.get('/',(req,res) =>{
    res.send("Welcome to the homepage")
})

/* MEMORY BASED DATABASE */
const userList = [
    {id:0, userName:"Claro"}
]

/* INPUT VALIDATOR */
function validate(apiRequest) {
    const schema = Joi.object({
        // User name is required with minimum of 4 char
        userName : Joi.string().min(4).required()
    })
    return schema.validate(apiRequest)
}

/* API GET REQUEST */
app.get('/api/userList',(req,res) => {
    res.send(userList)
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
    const newUser = {
        id: userList.length + 1,
        userName: req.body.userName
    }
    userList.push(newUser)
    // Show list of users
    res.send(userList)
})

/* API PUT REQUEST */
app.put('/api/editUser/:id',(req,res) => {
    // Find if the user is existing
    const userExist = userList.find(user => user.id === parseInt(req.params.id))
    // If the user does not exist return 400 Bad Request
    if (!userExist){
        res.status(400).send("User does not exist")
    }
    // else update user data
    const {error} = validate(req.body)
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }
    userExist.userName = req.body.userName
    // Show the updated list
    res.send(userList)
})

// API DELETE REQUEST
app.delete('/api/deleteUser/:id',(req,res) => {
    const userExist = userList.find(user => user.id === parseInt(req.params.id))
   
    if (!userExist) res.status(400).send("User does not exist");
    
    // else delete user data
    const index = userList.indexOf(userExist)
    userList.splice(index,1)
    // Show the updated list
    res.send(userList)
})

/* PORT CONFIG */
const port = process.env.PORT || 1111
app.listen(port, () => console.log(`Listening on port ${port}...`))