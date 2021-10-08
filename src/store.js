import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stocks: ''
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