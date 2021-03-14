import toyService from '@/services/toy.service.js'
import reviewService from '../../services/review.service'

export default {
    strict: true,
    state: {
        toys: [],
        toyFilter: { q: '', type: [], inStock: null, page:{size:5,idx:0}, isAsc: true, sortBy: 'name' },
        types: [],
        maxPage: 0
    },
    getters: {
        toys(state) {
            return state.toys
        },
        toyFilter(state) {
            return state.toyFilter
        },
        pageIdx(state) {
            return state.toyFilter.pageIdx
        },
        maxPage(state) {
            return state.maxPage
        },
        toyTypes(state) {
            return state.types
        }
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(savedToy => savedToy._id === toy._id)
            state.toys.splice(idx, 1, toy)
        },
        addToy(state, { toy }) {
            state.toys.unshift(toy)
        },
        removeToy(state, { id }) {
            const idx = state.toys.findIndex(savedToy => savedToy._id === id)
            state.toys.splice(idx, 1)
        },
        setFilter(state, { filter }) {
            state.toyFilter = {...state.toyFilter,...filter}
        },
        setMaxPage(state, { val }) {
            state.maxPage = val
        },
        setTypes(state, { types }) {
            state.types = types
        }
    },
    actions: {
        loadToys({ commit,state }) {
            toyService.query()
                .then(({ toys, maxPage }) => {
                    console.log('loading toys!')
                    commit({ type: 'setToys', toys: toys })
                    commit({ type: 'setMaxPage', val: maxPage })
                    if(maxPage < state.toyFilter.page.idx) {
                        const filter = JSON.parse(JSON.stringify(state.toyFilter))
                        filter.page.idx = state.maxPage
                        toyService.setFilter(filter)
                        commit({type:'setFilter',filter})
                    }
                })
        },
        saveToy(context, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy';
            return toyService.save(toy)
                .then(savedToy => {
                    context.commit({ type, toy: savedToy })
                    return savedToy
                })
                .catch(err => {
                    console.log('Store: Cannot save product', err);
                    throw new Error('Cannot save product');
                })
        },
        removeToy(context, payload) {
            return toyService.remove(payload.id)
                .then((ans) => {
                    context.commit(payload)
                    context.dispatch({ type: 'loadToys' })
                })
                .catch(err => {
                    console.log('Store: Cannot remove product', err);
                    throw new Error('Cannot remove product');
                })
        },
        setFilter(context, payload) {
            const filter =  toyService.setFilter(payload.filter)
            console.log("🚀 ~ file: toyStore.js ~ line 93 ~ setFilter ~ filter", filter)
            context.commit({ type: 'setFilter', filter })
            context.dispatch({ type: 'loadToys' })
                // .then(filter => {
                // console.log("🚀 ~ file: toyStore.js ~ line 89 ~ setFilter ~ filter", filter)
                // })
        },
        loadToyTypes(context) {
            return toyService.queryAll()
                .then(({ toys }) => {
                    const types = toyService.getAllTypes(toys)
                    context.commit({ type: 'setTypes', types })
                })
        },
        async submitReview(context, { review }) {
            console.log("🚀 ~ file: toyStore.js ~ line 101 ~ submitReview ~ review", review)
            try {
                const reviewToSave = await reviewService.add(review)
                console.log("🚀 ~ file: toyStore.js ~ line 102 ~ submitReview ~ reviewToSave", reviewToSave)
                return reviewToSave
            } catch (err) {
                throw err
            }
            // const savedReview = await $store.dispatch({ type: 'saveToy', toy })
        },
        async deleteReview(context, { id }) {
            try {
                const removed = await reviewService.remove(id)
                return removed
            } catch (err) {
                throw err
            }
        },
        async updateReview(context, { review }) {
            try {
                const updatedReview = await reviewService.update(review)
                return updatedReview
            } catch (err) {
                throw err
            }
        }
    },
}