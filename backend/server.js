require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path")
const {logger,LogEvent}=require("./middlewares/logger")
const errs =require("./middlewares/errorlog")
const cookieParser = require('cookie-parser')
const connects=require("./modules/dbconncer")
const mongoose=require('mongoose')

app.use(express.json())



connects()

app.use(logger)
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use("/", require("./route/root"))
app.use("/api",require('./route/Users'))
app.use('/api',require('./route/foods'))



app.use(errs)

// console.log(process.env.DATABASE_URI)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(5000, () => console.log(`Server running on port 5000`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    LogEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
