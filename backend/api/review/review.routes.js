const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addReview, getReviews, deleteReview, updateReview, getReview } = require('./review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
router.get('/', log, getReviews)
router.post('/', requireAuth, addReview)
router.get('/toy/:id', getReviews)
router.put('/:id', updateReview)
router.delete('/:id', requireAuth, deleteReview)
router.get('/:id', getReview)

module.exports = router