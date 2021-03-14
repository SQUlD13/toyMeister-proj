import userService from '@/services/user.service.js'

export default {
    state: {
        user: userService.getLoggedInUser()
    },
    getters: {
        user(state) {
            return state.user
        },
        lastUserAction(state) {
            return state.user.activities[state.user.activities.length - 1]
        },
        loggedIn(state) {
            return state.user && state.user._id ? true : false;
        },
        isAdmin(state) {
            return state.user && state.user.isAdmin;
        }
    },
    mutations: {
        saveUser(state, { user }) {
            const saved = userService.save(user)
            state.user = saved
        },
        setUser(state, { user }) {
            console.log("🚀 ~ file: userStore.js ~ line 21 ~ setUser ~ user", user)
            state.user = user
        }
    },
    actions: {
        loadUser(context) {
            context.commit({ type: 'setLoading', isLoading: true })
            const user = userService.getLoggedInUser()
            return context.commit({ type: 'setUser', user })
        },
        async saveUser(context, { user }) {
            try {
                const user = await userService.save(user)
                context.commit({ type: 'setUser', user })
            } catch (err) {
                throw (err)
            }
        },
        async login(context, { credentials }) {
            try {
                const ans = await userService.logIn(credentials)
                context.commit({ type: 'setUser', user: ans })
            } catch (err) {
                throw (err)
            }
        },
        async logout(context) {
            try {
                const ans = await userService.logOut();
                console.log(ans)
                context.commit({ type: 'setUser', user: {} })
            } catch (err) {
                throw err;
            }
        },
        async signup(context, { credentials }) {
            try {
                const user = await userService.register({ username: this.username, password: this.password })
                context.dispatch({ type: 'login', credentials })
            } catch (err) {
                throw err
            }
        },
        async getUser(context, { id }) {
            try {
                const user = await userService.getById(id)
                return user
            } catch (err) {
                throw err
            }
        }
    }
}