const express = require('express')
const cors= require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')

//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app= express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


//routes
app.get('/', (req,res) => {
    res.send("<h1>hello from server</h1>")
})


//Port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

