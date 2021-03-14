// import { utilService } from '../services/util.service.js'
import axios from 'axios'

import { httpService } from './http.service.js'

const KEY = 'userDB'
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/user/' : 'http://localhost:3030/api/toy/'

export default {
    query,
    getById,
    register,
    logIn,
    logOut,
    deleteUser,
    getLoggedInUser
}

async function getById(id) {
    // return axios.get(BASE_URL + `/${id}`)
    //     .then(({ data }) => data)
    const ans = await httpService.get(`user/${id}`)
    return ans
}

async function query() {
    const ans = await httpService.get('user')
    console.log('query ans', ans)
    return ans
}

async function register(user) {
    if (!user) throw new Error('Please enter valid credentials to register')
    const ans = await httpService.post('user/signup', user)
    console.log('registration ans', ans)
    return ans
}

async function logIn(credentials) {
    if (!credentials) throw new Error('Please enter valid credentials to log-in')
    const ans = await httpService.post('user/login', credentials)
    window.sessionStorage.setItem('toyMeister_user', JSON.stringify(ans))
    console.log('login ans', ans)
    return ans
}

async function logOut() {
    window.sessionStorage.clear('user')
    const ans = await httpService.post('user/logout')
    console.log('logout ans', ans)
    return ans
}

function deleteUser(id) {
    return axios.delete(BASE_URL + `/${id}`)
        .then(({ data }) => {
            gUser = ''
            return data
        })
}
function getLoggedInUser() {
    return JSON.parse(window.sessionStorage.getItem('toyMeister_user')) || ''
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
