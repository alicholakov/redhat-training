const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(6)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()

module.exports = schema