const { Router } = require('express')
const { adminAccess } = require('../auth')

const { StatusCodes } = require('http-status-codes')
const Response = require('../models/response')

const Department = require('../models/department')
const router = Router()

router.get('/', (req, res) => {

    Department.find((err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }

        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    })
})

router.get('/:id', (req, res) => {

    Department.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }

        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    }).populate('head')
})

router.post('/', adminAccess, (req, res) => {

    Department.create({
        name: req.body.name,
        head: req.body.head
    }, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }
        res.status(StatusCodes.CREATED)
            .json(Response.withData(data))
    })
})

router.patch('/:id', adminAccess, (req, res) => {

    Department.findByIdAndUpdate(
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
                .json(Response.withData(data))
        }) 
})

router.delete('/:id', adminAccess, (req, res) => {

    Department.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(Response.withError(err.message))
        }
        res.status(StatusCodes.OK)
            .json(Response.withData(data))
    })
})

module.exports = router