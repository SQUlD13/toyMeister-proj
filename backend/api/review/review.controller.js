const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
    const params = req.params
    const _id = params.id
    console.log("🚀 ~ file: review.controller.js ~ line 9 ~ getReviews ~ _id", _id)
    try {
        const reviews = await reviewService.query({})
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function getReview(req, res) {
    const params = req.params
    console.log("🚀 ~ file: review.controller.js ~ line 21 ~ getReview ~ params", params)
    const _id = params.id
    try {
        const review = await reviewService.getById(_id)
        console.log("🚀 ~ file: review.controller.js ~ line 25 ~ getReview ~ review", review)
        try {
            const user = await userService.getById(review.byUserId)
            console.log("🚀 ~ file: review.controller.js ~ line 26 ~ getReview ~ user", user)
            review.byUser = user
        } catch (err) {
            console.log(err)
            throw new Error('Cannot get user from review')
        }
        console.log("🚀 ~ file: review.controller.js ~ line 28 ~ getReview ~ review", review)
        res.send(review)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


async function addReview(req, res) {
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await reviewService.add(review)
        review.byUser = req.session.user
        review.aboutToy = await toyService.getById(review.aboutToyId)
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

async function updateReview(req, res) {
    try {
        var review = req.body
        console.log("🚀 ~ file: review.controller.js ~ line 60 ~ updateReview ~ review", review)
        review = await reviewService.update(review)
        console.log("🚀 ~ file: review.controller.js ~ line 62 ~ updateReview ~ review", review)
        res.send(review)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    getReview,
    deleteReview,
    addReview,
    updateReview,
}