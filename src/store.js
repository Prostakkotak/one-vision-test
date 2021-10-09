import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stocks: '',
        competitors: '',
        modalOpenState: false,
    },
    getters: {
        stocks: (state) => {
            return state.stocks
        },
        competitors: (state) => {
            return state.competitors
        },
        modalOpenState: (state) => {
            return state.modalOpenState
        }
    },
    mutations: {
        setStocks(state, data) {
            state.stocks = data
        },
        setCompetitors(state, list) {
            state.competitors = list
        },
        setModalOpenState(state, bool) {
            state.modalOpenState = bool
        }
    },
    actions: {}
});

export default store;