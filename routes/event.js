const { Router } = require('express')

const { StatusCodes } = require('http-status-codes')
const Response = require('../models/response')
const { adminAccess, authAccess } = require('../auth')

const Event = require('../models/event')
const router = Router()

router.get('/', (req, res) => {

    Event.find({}, '_id name image', (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        res.status(StatusCodes.OK)
            .json(new Response(data))
    })
})

router.get('/:id', (req, res) => {

    Event.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        res.status(StatusCodes.OK)
            .json(new Response(data))
    }).populate('users', '_id firstName lastName phone email')
})

router.post('/', adminAccess, (req, res) => {

    Event.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }
        res.status(StatusCodes.CREATED)
            .json(new Response(data))
    })
})

router.patch('/:id', adminAccess, (req, res) => {
    delete req.body.users

    Event.findByIdAndUpdate(
        req.params.id, 
        req.body, { 
            runValidators: true,
            new: true
        }, (err, data) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .json(new Response({}, err.message))
            }
            res.status(StatusCodes.OK)
                .json(new Response(data))
        }) 
})

router.put('/:id/addUser', authAccess, (req, res) => {
    
    Event.findByIdAndUpdate(
        req.params.id, 
        { $addToSet: { users: req.userId }}, { 
            runValidators: true,
            new: true
        }, (err, data) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .json(new Response({}, err.message))
            }
            res.status(StatusCodes.OK)
                .json(new Response(data))
        }) 
})

router.put('/:id/removeUser', authAccess, (req, res) => {
    
    Event.findByIdAndUpdate(
        req.params.id, 
        { $pull: { users: req.userId }}, { 
            runValidators: true,
            new: true
        }, (err, data) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .json(new Response({}, err.message))
            }
            res.status(StatusCodes.OK)
                .json(new Response(data))
        }) 
})

router.delete('/:id', adminAccess, (req, res) => {

    Event.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }
        res.status(StatusCodes.OK)
            .json(new Response(data))
    })
})

module.exports = router