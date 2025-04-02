const express = require('express');
const app = express();


app.use('/test', (req , res)=>{
    res.send("hello test command")
})
app.use('/', (req , res)=>{
    res.send("hello dashboard")
})

app.listen(7777 , () =>{
    console.log('server is listining on port 7777')
})