const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,

    signUp,
    logIn,
    logOut
}

//Sign-up
async function signUp(req, res) {
    const user = req.body
    try {
        const savedUser = await userService.add(user)
        //res.cookie('user', JSON.stringify(savedUser))
        req.session.loginAt = Date.now()
        req.session.user = savedUser
        const returnVal = { ...savedUser }
        delete returnVal.password
        res.json(returnVal)
    }
    catch (err) {
        res.send(err.message)
    }
}
//Log-in
async function logIn(req, res) {
    const credentials = req.body
    try {
        const user = await userService.checkCredentials(credentials)
        if (!user) res.status(404).send('No fitting user found')
        req.session.loginAt = Date.now()
        req.session.user = user
        const returnUser = { ...user }
        delete returnUser.password
        res.json(returnUser)
    }
    catch (err) {
        res.status(404).send(err.message)
    }
}
//Log-out
async function logOut(req, res) {
    req.session.destroy()
    res.send('Successfully logged-out')
}