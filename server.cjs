require('dotenv').config({ path: './env/.env' });
const client = require("./client.cjs");
const express = require('express');
const app = express();
const port = process.env.PORT; 
const baseUrl = 'http://localhost:';


app.get('/', (req,res)=>{
  res.send('WELCOME TO BITiTEM');
})
app.listen(port,()=>{
  console.log(`Server running at: ${baseUrl}${port}`);

})