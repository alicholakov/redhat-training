require('dotenv').config()
require('./config/db')()

const app = require('./config/express')

const departmentRouter = require('./routes/department')
const userRouter = require('./routes/user')
const newsRouter = require('./routes/news')
const eventRouter = require('./routes/event')
const authRouter = require('./routes/auth')

app.use('/api/departments', departmentRouter)
app.use('/api/users', userRouter)
app.use('/api/news', newsRouter)
app.use('/api/events', eventRouter)
app.use('/api/auth', authRouter)

app.listen(
    process.env.PORT, 
    console.log(`Server starting and listening on port ${process.env.PORT}!`));