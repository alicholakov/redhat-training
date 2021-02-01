const { Router } = require('express')

const { StatusCodes } = require('http-status-codes')
const Response = require('../models/response')
const { adminAccess } = require('../auth')

const News = require('../models/news')
const router = Router()

router.get('/', (req, res) => {

    News.find({}, '_id title image', (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        res.status(StatusCodes.OK)
            .json(new Response(data))
    })
})

router.get('/:id', (req, res) => {

    News.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }

        res.status(StatusCodes.OK)
            .json(new Response(data))
    })
})

router.post('/', adminAccess, (req, res) => {

    News.create({
        title: req.body.title,
        content: req.body.content,
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

    News.findByIdAndUpdate(
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

router.delete('/:id', adminAccess, (req, res) => {

    News.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(new Response({}, err.message))
        }
        res.status(StatusCodes.OK)
            .json(new Response(data))
    })
})

module.exports = router