const bodyParser = require("body-parser")
const express = require("express")
const Joi = require("joi")
const app = express()

// Middlewares
app.use(express.json())
app.use(bodyParser.json())

/* HOMEPAGE */
app.get('/',(req,res) =>{
    res.send("Welcome to the homepage")
})

/* MEMORY BASED DATABASE */
const userList = [
    {id:0, userName:"Claro"},
    {id:1, userName:"Miguel"}
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
app.get('/api/user',(req,res) => {
    res.send(userList)
})

/* API POST REQUEST */
app.post('/api/user',(req,res) =>{
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


// DELETE REQUEST
app.delete('api/userdelete/:id', (req,res) => {
    const user = userList.find(c => c.id === parseInt(req.params.id))
    if (!user) res.status(404).send("The user with the given ID was not found")
    const index = userList.indexOf(user)
    userList.splice(index, 1)
    res.send(userList)
})



/* PORT CONFIG */
const port = process.env.PORT || 1111
app.listen(port, () => console.log(`Listening on port ${port}...`))