const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).catch(err => console.log(err))
}