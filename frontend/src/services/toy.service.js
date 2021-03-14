import storageService from './async-storage.service.js'
import axios from 'axios'

import { httpService } from './http.service.js'

const KEY = 'toyDB'
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/toy/' : 'http://localhost:3030/api/toy/'

var gFilterBy = { q: '', type: null, inStock: 'null', page:{size:5,idx:0}, isAsc: 'true', sortBy: 'name' }

//_createToys()

export default {
    query,
    queryAll,
    getById,
    save,
    remove,
    getEmptyToy,
    getAllTypes,
    setFilter,
    getFilter
}

function getFilter() {
    return gFilterBy
}

function setFilter(filter) {
    // console.log("🚀 ~ file: toy.service.js ~ line 30 ~ setFilter ~ BASE_URL + 'filter'", BASE_URL + 'filter')
    // return axios.put(BASE_URL + 'filter', filter)
    //     .then(({ data }) => { console.log('filter set to',data,'in service');gFilterBy = data; return data })
    gFilterBy = {...gFilterBy,...filter}
    return gFilterBy
}


async function query() {
    // return axios.get(BASE_URL, { params: gFilterBy })
    //     .then(({ data }) => {
    //         return data
    //     })
    try {
        const ans = await httpService.get('toy', { params: gFilterBy })
        return ans
    } catch (err) {
        throw err
    }
}

async function queryAll() {
    // return axios.get(BASE_URL)
    //     .then(({ data }) => data)
    try {
        const ans = await httpService.get('toy')
        console.log('query all ans', ans)
        return ans
    } catch (err) {
        throw err
    }
}

async function getById(id) {
    // return queryAll()
    //     .then(toys => toys.find(toy => toy._id === id))
    try {
        const ans = await httpService.get(`toy/${id}`)
        console.log('query single toy', id, 'ans is', ans)
        return ans
    } catch (err) {
        throw err
    }
}

function save(toy) {
    //const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    const savedToy = (toy._id) ? _update(toy) : _add(toy)
    return savedToy;
}

function _add(toy) {
    // return axios.post(BASE_URL, toy)
    //     .then(({ data }) => data)
    try {
        const ans = httpService.post(`toy`, toy)
        console.log('adding toy', toy._id, 'ans is', ans)
        return ans
    } catch (err) {
        throw err
    }
}

function _update(toy) {
    // return axios.put(BASE_URL + toy._id, toy)
    //     .then(({ data }) => data)
    try {
        const ans = httpService.put(`toy/${toy._id}`, toy)
        console.log('updating toy', toy._id, 'ans is', ans)
        return ans
    } catch (err) {
        throw err
    }
}

async function remove(id) {
    //return storageService.remove(KEY, id)
    //    .then(toy => toy)
    // return axios.delete(BASE_URL + id)
    //     .then(({ data }) => data)
    try {
        const ans = await httpService.delete(`toy/${id}`)
        console.log('removing toy', id, 'ans is', ans)
        return ans
    } catch (err) {
        throw err
    }
}


function _createToys() {
    var toys = JSON.parse(sessionStorage.getItem(KEY))
    if (!toys) {
        toys = [
            {
                "_id": _makeId(),
                "name": "Talking doll",
                "price": 123,
                "type": "funny",
                "createdAt": 111222333,
                "inStock": true
            },
            {
                "_id": _makeId(),
                "name": "Flipping Dog",
                "price": 221,
                "type": "funny",
                "createdAt": 111222333,
                "inStock": true
            },
            {
                "_id": _makeId(),
                "name": "Barking Stick",
                "price": 531,
                "type": "funny",
                "createdAt": 111222333,
                "inStock": true
            },
            {
                "_id": _makeId(),
                "name": "Slumping Frog",
                "price": 158,
                "type": "Wacky",
                "createdAt": 111222333,
                "inStock": true
            },
            {
                "_id": _makeId(),
                "name": "Slippery Ball",
                "price": 725,
                "type": "Wacky",
                "createdAt": 111222333,
                "inStock": true
            },
            {
                "_id": _makeId(),
                "name": "Chewable Trampoline",
                "price": 268,
                "type": "Wacky",
                "createdAt": 111222333,
                "inStock": true
            },
        ]
        sessionStorage.setItem(KEY, JSON.stringify(data.toys))
    }
}

function getEmptyToy() {
    return {
        "name": "",
        "price": 0,
        "type": null,
        "createdAt": Date.now(),
        "inStock": false
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getAllTypes(toys) {
    console.log("🚀 ~ file: toy.service.js ~ line 194 ~ getAllTypes ~ toys", toys)
    const types = []
    toys.forEach(toy => {
        if (!types.some(savedType => savedType.txt === toy.type.txt) && toy.type.txt) types.push(toy.type)
    })
    return types
}