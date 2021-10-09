import Vue from 'vue';
import Vuex from 'vuex';
import data from './json.txt'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stocks: '',
        testData: data,
    },
    getters: {
        stocks: (state) => {
            return state.stocks
        }
    },
    mutations: {
        setStocks(state, data) {
            /* let json = JSON.parse(data.data) */
            state.stocks = data
        },
    },
    actions: {}
});

export default store;