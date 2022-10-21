require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
const bodyParser=require("body-parser");
const cors=require("cors");
const TodoRouter=require("./routes/todo");
const mongoose = require("mongoose");
app.use(cors({
     //* means allow from all origin(localhost) 
    origin:"*"
}))

// MIDDLEWARES 
app.use(express.json());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true})); 

// DB -----------------------------------------
mongoose.connect(process.env.MONGO__URL)
.then( () =>{
console.log("connected to mongodb");
})   
.catch( (error) => {
    console.log(error.message); 
})
// API  
app.get("/",(req,res) =>{
    res.send("welcome to node.js")
})
app.use("/api/",TodoRouter);

// server --------------------
app.listen(port,() =>{
    console.log(`connected at port ${port} `)
})