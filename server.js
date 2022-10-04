const express = require("express")
const Joi = require("joi")
const app = express()

// Enable the use of JSON files
app.use(express.json())

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
    const schema = {
        // User name is required with minimum of 4 char
        userName : Joi.string().min(4).required()
    }
    const data = Buffer.from(apiRequest)
    return Joi.valid(data,schema)
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
        res.status(400).send(error)
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

/* PORT CONFIG */
const port = process.env.PORT || 1111
app.listen(port, () => console.log(`Listening on port ${port}...`))