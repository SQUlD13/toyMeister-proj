
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log("🚀 ~ file: toy.service.js ~ line 16 ~ query ~ filterBy", filterBy)
    const criteria = _buildCriteria(filterBy)
    try {
        console.log('Criteria backend service : ', criteria)
        const collection = await dbService.getCollection('toy')


        var skip = (filterBy.page) ? filterBy.page.idx * filterBy.page.size : 0
        const limit = (filterBy.page) ? filterBy.page.size : 0
        // console.log("🚀 ~ file: toy.service.js ~ line 23 ~ query ~ skip", skip)
        // console.log("🚀 ~ file: toy.service.js ~ line 24 ~ query ~ limit", limit)

        const toyLength = await collection.count(criteria)
        // console.log("🚀 ~ file: toy.service.js ~ line 30 ~ query ~ toyLength", toyLength)
        if (skip > toyLength) { skip = 0 }


        const order = (filterBy.isAsc) ? 1 : -1
        sort = (filterBy.sortBy === 'price') ? { 'price': order } : { 'type.txt': order }

        var toys = await collection.find(criteria).sort(sort).skip(skip).limit(limit).toArray()

        const maxPage = Math.floor(toyLength / limit)
        console.log("🚀 ~ file: toy.service.js ~ line 33 ~ query ~ maxPage", maxPage)

        return { toys, maxPage }
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}
// async function getByUsername(username) {
//     try {
//         const collection = await dbService.getCollection('user')
//         const user = await collection.findOne({ username })
//         return user
//     } catch (err) {
//         logger.error(`while finding user ${username}`, err)
//         throw err
//     }
// }

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = { ...toy, _id: ObjectId(toy._id) }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = { ...toy }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    console.log("🚀 ~ file: toy.service.js ~ line 102 ~ _buildCriteria ~ filterBy", filterBy)
    if (filterBy.q) { // Text filtering
        const txtCriteria = { $regex: filterBy.q, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.type && filterBy.type.length) {
        const typeCryteria = { $in: filterBy.type }
        criteria['type.txt'] = typeCryteria
    }
    if (filterBy.inStock && filterBy.inStock !== 'null') {
        const stock = JSON.parse(filterBy.inStock)
        criteria.inStock = stock
    }
    return criteria
}


