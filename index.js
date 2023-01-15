
const express = require('express')
require("dotenv").config()

const cors = require('cors')
const { connection } = require('./config/db.config')
const { todoRouter } = require('./routes/todo.router')
const { userRouter } = require('./routes/user.router')
const { Auth } = require('./middleware/userAuth.middleware')
const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))


app.get('/', (req, res) => { 
    res.send('Welcome to Todo full stack prac')
})
app.use("/users", userRouter)
app.use(Auth)
app.use("/todos",todoRouter)

app.listen(process.env.PORT, async() => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) { 
        console.log(err)
    }
    console.log(`http://localhost:${process.env.PORT}`);
})

