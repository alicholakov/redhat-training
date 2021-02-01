const mongoose = require('mongoose')
const { EventConst, UserConst } = require('./const')

const Schema = mongoose.Schema

const EventSchema = Schema({
    name: { 
        type: String, 
        required: true,
        minlength: EventConst.MIN_NAME_LENGHT,
        maxlength: EventConst.MAX_NAME_LENGHT
     },
     description: {
        type: String, 
        required: true,
        minlength: EventConst.MIN_DESCRIPTION_LENGHT,
        maxlength: EventConst.MAX_DESCRIPTION_LENGHT
     },
     image: {
        type: String, 
        required: true,
        minlength: EventConst.MIN_IMAGE_LENGHT,
        maxlength: EventConst.MAX_IMAGE_LENGHT
     },
     users : [{
        type: Schema.Types.ObjectId,
        ref: UserConst.MODEL
     }]
})

EventSchema.index({ name: 'text' })

module.exports = mongoose.model(EventConst.MODEL, EventSchema)