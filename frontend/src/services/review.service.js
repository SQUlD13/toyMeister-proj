//import axios from 'axios'

import { httpService } from './http.service.js'

export default {
    queryByToyId,
    query,
    remove,
    add,
    update
}

async function queryByToyId(toyId) {
    console.log("🚀 ~ file: review.service.js ~ line 13 ~ query ~ toyId", toyId)
    try {
        const reviews = await httpService.get(`review/toy/${toyId}`)
        return reviews
    } catch (err) {
        throw err
    }
}
async function query(id){
console.log("🚀 ~ file: review.service.js ~ line 24 ~ query ~ id", id)
    try{
        const review = await httpService.get(`review/${id}`)
        return review
    }catch(err){
        throw err
    }
}

async function remove(id) {
    try {
        const review = await httpService.delete(`review/${id}`)
        console.log('removied review', id, 'ans is', review)
        return review
    } catch (err) {
        throw err
    }
}

async function update(review) {
    console.log("🚀 ~ file: review.service.js ~ line 43 ~ update ~ review", review)
    // console.log("🚀 ~ file: review.service.js ~ line 33 ~ update ~ toyId", review.aboutToy._id,' userId',review.byUser._id)
    const id = review._id
    try {
        const ans = await httpService.put(`review/${id}`, review)
        console.log('updated review', review._id, 'ans is', ans)
    } catch (err) {
        throw err
    }
}

async function add(review) {
    try {
        const ans = await httpService.post('review', review)
        console.log('added review', review, 'ans is', ans)
        return ans
    } catch (err) {
        throw err
    }
}
