import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stocks: '',
        modalData: '',
        modalOpenState: false,
        competitors: '',
    },
    getters: {
        stocks: (state) => {
            return state.stocks
        },
        modalOpenState: (state) => {
            return state.modalOpenState
        },
        modalData: (state) => {
            return state.modalData
        },
        competitors: (state) => {
            return state.competitors
        }
    },
    mutations: {
        setStocks(state, data) {
            state.stocks = data
        },
        setModalOpenState(state, bool) {
            state.modalOpenState = bool
        },
        setModalData(state, obj) {
            state.modalData = obj
        },
        setCompetitors(state, list) {
            state.competitors = list
        }
    },
    actions: {}
});

export default store;