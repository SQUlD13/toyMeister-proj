const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

var gMaxPage = 0

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function getToys(req, res) {
    try {
        const page = (req.query?.page) ? JSON.parse(req.query.page) : null
        const filterBy = {
            q: req.query?.q || '',
            type: req.query?.type || [],
            inStock: req.query?.inStock || 'null',
            page
        }
        //console.log('getting toys with filter', filterBy)
        const ans = await toyService.query(filterBy)


        res.send(ans)
    } catch (err) {
        console.log(err)
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy
}