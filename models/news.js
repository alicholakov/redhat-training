const mongoose = require('mongoose')
const { NewsConst } = require('./const')

const Schema = mongoose.Schema

const NewsSchema = Schema({
    title: { 
        type: String, 
        required: true,
        minlength: NewsConst.MIN_TITLE_LENGHT,
        maxlength: NewsConst.MAX_TITLE_LENGHT
     },
     content: {
        type: String, 
        required: true,
        minlength: NewsConst.MIN_CONTENT_LENGHT,
        maxlength: NewsConst.MAX_CONTENT_LENGHT
     },
     image: {
        type: String,
        required: true,
        minlength: NewsConst.MIN_IMAGE_LENGHT,
        maxlength: NewsConst.MAX_IMAGE_LENGHT
     }
})

NewsSchema.index({ title: 'text' })

module.exports = mongoose.model(NewsConst.MODEL, NewsSchema)