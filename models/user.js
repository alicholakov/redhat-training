const mongoose = require('mongoose')
const { UserConst, RoleConst, DepartmentConst } = require('./const')

const Schema = mongoose.Schema

const UserSchema = Schema({
    email: { 
        type: String, 
        required: true,
        unique: true,
        minlength: UserConst.MIN_EMAIL_LENGHT,
        maxlength: UserConst.MAX_EMAIL_LENGHT,
        match: [/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/, UserConst.EMAIL_NOT_VALID_MESSAGE],
     },
     password: {
        type: String,
        required: true
    },
     firstName: {
        type: String, 
        required: true,
        minlength: UserConst.MIN_NAME_LENGHT,
        maxlength: UserConst.MAX_NAME_LENGHT
     },
     lastName: {
        type: String, 
        required: true,
        minlength: UserConst.MIN_NAME_LENGHT,
        maxlength: UserConst.MAX_NAME_LENGHT
     },
     phone: {
        type: String,
        required: true,
        minlength: UserConst.MIN_PHONE_LENGHT,
        maxlength: UserConst.MAX_PHONE_LENGHT
     },
     role: {
        type: String,
        enum: [ RoleConst.ADMIN, RoleConst.USER],
        required: true
     },
     department : {
      type: Schema.Types.ObjectId,
      ref: DepartmentConst.MODEL,
      require: true
   }
})

UserSchema.index({ firstName: 'text', lastName: 'text' })
UserSchema.path('role').options.enum

module.exports = mongoose.model(UserConst.MODEL, UserSchema)