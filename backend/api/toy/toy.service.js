
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

        var toys = await collection.find(criteria).skip(skip).limit(limit).toArray()

        const maxPage = Math.floor(toyLength / limit)
        console.log("🚀 ~ file: toy.service.js ~ line 33 ~ query ~ maxPage", maxPage)

        return { toys, maxPage }
        // users = users.map(user => {
        //     delete user.password
        //     user.isHappy = true
        //     user.createdAt = ObjectId(user._id).getTimestamp()
        //     // Returning fake fresh data
        //     // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        //     return user
        // })
        // return users
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })

        // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

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


