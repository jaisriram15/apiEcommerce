const express = require ('express')
const app =  express()
const dotenv = require ('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb = require('./db/connectdb')

// API ko react pe call karne ki kaam karta hai
const cors = require('cors')
app.use(cors())

// fileupload karne ke liye use kare
const fileUpload = require("express-fileupload");
app.use(fileUpload({useTempFiles:true}));

//for getting data from api through postman as json format
app.use(express.json())

//To connect db, function has been called below
connectDb()

// Load route
app.use ('/api',web)
//localhost:4000/api ---> this is path for route server






// Server create
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost: ${process.env.PORT}`);
})