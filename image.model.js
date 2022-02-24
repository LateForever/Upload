const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    pageNumber: Number,
    bookName: String,
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = ImageModel = mongoose.model('imageModel', ImageSchema);