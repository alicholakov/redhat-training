const { Router } = require('express')
const { StatusCodes } = require('http-status-codes')
const { adminAccess, authAccess } = require('../auth')

const Response = require('../models/response')
const User = require('../models/user')

const router = Router()

router.get('/', (req, res) => {

    User.find({}, '_id firstName lastName phone', (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }

        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    })
})

router.get('/:id', (req, res) => {

    User.findById(req.params.id, '_id email firstName lastName phone department', (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }

        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    }).populate('department')
})

router.get('/search/:name', (req, res) => {

    User.find({ $text: { $search: req.params.name }}, '_id email firstName lastName phone', (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }
        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    })
})

router.patch('/:id', adminAccess, (req, res) => {

    User.findByIdAndUpdate(
        req.params.id, 
        req.body, { 
            runValidators: true,
            new: true
        }, (err, data) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .json(Response.withError(err.message))
            }
            res.status(StatusCodes.OK)
                .json(Respons.withData(data))
        }) 
})

router.delete('/:id', adminAccess, (req, res) => {

    User.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }
        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    })
})

module.exports = router