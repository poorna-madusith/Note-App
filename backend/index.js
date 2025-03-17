require ("dotenv").config();


const config = require("./config.json")
const mongoose = require("mongoose")

mongoose.connect(config.connectionString)

const User = require("./models/user.model")

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const {authenticationToken} = require("./utilities");


app.use(express.json());


app.use(
    cors({
        orgin: "*",
    })
)


app.get("/" , (req,res)=>{
    res.json({data: "hello"})
})


//create account
app.post("/create-account", async (req,res)=>{

    const {fullname, email, password} = req.body;

    if(!fullname){
        return res.status(400).json({error:true , message:"Full Name is required"})
    }

    if(!email){
        return res.status(400).json({error:true, message:"Email is required"})
    }

    if(!password){
        return res.status(400).json({error:true, message:"Password is required"})
    }
})


app.listen(8000);

module.exports = app;