const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log("🚀 ~ file: review.service.js ~ line 6 ~ query ~ filterBy", filterBy)
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'aboutToyId',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        console.log("🚀 ~ file: review.service.js ~ line 39 ~ query ~ reviews", reviews)
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutToy = { _id: review.aboutToy._id, fullname: review.aboutToy.fullname }
            delete review.byUserId
            delete review.aboutToyId
            return review
        })

        return reviews
    } catch (err) {
        console.log(err)
        logger.error('cannot find reviews', err)
        throw err
    }

}
async function getById(id) {
    try {
        const collection = await dbService.getCollection('review')
        const review = await collection.findOne({ '_id': ObjectId(id) })
        return review
    } catch (err) {
        logger.error(`while finding review ${id}`, err)
        throw err
    }
}
async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(reviewId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}
async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}
async function update(review) {
    console.log("🚀 ~ file: review.service.js ~ line 89 ~ update ~ review", review)
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt,
            _id: ObjectId(review._id)
        }
        const collection = await dbService.getCollection('review')
        await collection.updateOne({ "_id": ObjectId(review._id) }, { $set: { ...reviewToAdd } })
        console.log("🚀 ~ file: review.service.js ~ line 100 ~ update ~ reviewToAdd", reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


