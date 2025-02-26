require('dotenv').config({ path: './env/.env' });
const client = require("./client.cjs");
const express = require('express');
const app = express();
const port = process.env.PORT; 
const baseUrl = 'http://localhost:';
const router = require('./routers.cjs'); // Import your routes

app.use(express.json()); // Parse JSON bodies
app.use(router); // Use the router for all defined routes

client.connect();

app.get('/', (req, res) => {
  res.send('WELCOME TO BITiTEM');
});

app.listen(port, () => {
  console.log(`Server running at: ${baseUrl}${port}`);
});
