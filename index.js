const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()

const ImageModel = require('./image.model');

app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.DB, {
    useNewUrlParser: true
})
.then(() => console.log('db is connected'))
.catch((err) => console.log(err, 'db error'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

app.set("view engine", "ejs");

app.get("/upload",  (req, res) => {
    res.json({ message: 'hello' })
});

app.post("/upload",  (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            console.log(err, 'error')
        }
        else {
            const newImage = new ImageModel({
                pageNumber: req.body.pageNumber,
                bookName: req.body.bookName,
                image: {
                    data: req.file.filename,
                    contentType: 'image/jpg'
                }
            })

            newImage
                .save()
                .then(() => {
                    res.send('success')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
    // req.file.bookName = req.body.bookName
    // req.file.pageNumber = req.body.pageNumber
    // console.log(req.body, req.file)
    // res.send("Image Uploaded");
});

app.listen(8000, () => {
    console.log('server running');
});