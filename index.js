const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", (req, res) => {
    res.send("Image Uploaded");
});

app.listen(8080, () => {
    console.log('server running');
});