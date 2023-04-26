const express = require('express');
const userRouter=require("./route/userRouter")
const app = express();


app.use(express.json())

app.use('/api/shootfolio', userRouter);

app.all("*",(req,res,next)=>{
res.status(404).json({
    status:"fail",
    message:`Can't find ${req.originalUrl} on this server!`,
})
})
module.exports = app;