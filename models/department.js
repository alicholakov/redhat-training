const mongoose = require('mongoose')
const { DepartmentConst, UserConst } = require('./const')

const Schema = mongoose.Schema

const DerpartmentSchema = Schema({
    name: { 
        type: String, 
        required: true,
        minlength: DepartmentConst.MIN_NAME_LENGHT,
        maxlength: DepartmentConst.MAX_NAME_LENGHT
     },
     head : {
        type: Schema.Types.ObjectId,
        ref: UserConst.MODEL
     }
})

module.exports = mongoose.model(DepartmentConst.MODEL, DerpartmentSchema)