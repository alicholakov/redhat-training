const { StatusCodes } = require('http-status-codes')
const Response = require('./models/response')
const jwt = require('jsonwebtoken')
const { AuthConst } = require('./models/const')

const generateToken = (user) => jwt.sign({ 
    userId: user._id,
    email: user.email,
    role: user.role
}, process.env.PRIVATE_KEY, { expiresIn: AuthConst.EXPIRATION_TIME })

const authAccess = (req, res, next) => {
    
    const authHeader = req.get('Authorization')

    if (!authHeader) {     
        return res.status(StatusCodes.UNAUTHORIZED)
            .json(Response.withError(AuthConst.MISSING_AUTORIZATION_HEADER_MESSAGE))
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED)
            .json(Response.withError(AuthConst.INCORECT_AUTORIZATION_HEADER_MESSAGE))
    }    

    jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {

        if (error) {
            return res.status(StatusCodes.UNAUTHORIZED)
                .json(Response.withError(AuthConst.INVALID_TOKEN_MESSAGE))
        }

        req.userId = data.userId

        next()
    })
}

const adminAccess = (req, res, next) => {
    
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED)
            .json(Response.withError(AuthConst.MISSING_AUTORIZATION_HEADER_MESSAGE))
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED)
            .json(Response.withError(AuthConst.INCORECT_AUTORIZATION_HEADER_MESSAGE))
    }    

    jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {

        if (error) {
            return res.status(StatusCodes.UNAUTHORIZED)
                .json(Response.withError(AuthConst.INVALID_TOKEN_MESSAGE))
        }

        if (data.role !== 'Admin') {
            return res.status(StatusCodes.FORBIDDEN)
                .json(Response.withError(AuthConst.REQUIRED_ADMIN_ROLE))
        }

        next()
    })
}

module.exports = {
    generateToken,
    authAccess,
    adminAccess
}