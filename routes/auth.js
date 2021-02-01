const { Router } = require('express')
const { generateToken } = require('../auth')

const Response = require('../models/response')
const { StatusCodes } = require('http-status-codes')

const { UserConst } = require('../models/const')
const User = require('../models/user')

const passwordConfig = require('../config/password')
const md5 = require('md5')

const router = Router()

router.post('/signup', (req, res) => {

    if (!passwordConfig.validate(req.body.password)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(new Response({}, UserConst.PASSWORD_NOT_VALID_MESSAGE))
    }

    User.create({
        email: req.body.email,
        password: md5(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        role: req.body.role,
        department: req.body.department
    }, (err, user) => {

        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        res.status(StatusCodes.CREATED)
            .json(new Response(generateToken(user)))
    })
})

router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        if (!user || user.password !== md5(req.body.password)) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, 'Invalid credentional!'))
        }
    
        res.status(StatusCodes.OK)
            .json(new Response(generateToken(user)))
    })    
})

module.exports = router