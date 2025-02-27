require("dotenv").config({ path: "./env/.env" });
const client = require("./client.cjs");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT;
const baseUrl = "http://localhost:";
const router = require("./routers.cjs"); // Import your routes
const path = require("path");
app.use(express.json()); // Parse JSON bodies
app.use(router); // Use the router for all defined routes

app.use(express.static(path.join(__dirname, "dist")));

client.connect();

app.get("/", (req, res) => {
  res.send("WELCOME TO BITiTEM");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at: ${baseUrl}${port}`);
});
