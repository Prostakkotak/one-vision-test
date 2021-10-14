import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stocks: '',
        modalData: '',
        modalOpenState: false,
        mapMode: false,
        mousePos: {
            'x': 0,
            'y': 0
        },
        boundaries: '',
        colors: [
            "#3CBF73",
            "#0099FF",
            "#786BFF",
            "#C76BFF",
            "#FE2B5C",
            "#50C0FF",
            "#FFDD2D",
            "#275BE2",
            "#6B9DFF",
        ],
        mapSettings: [{
                elementType: "geometry",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#263c3f"
                }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#6b9a76"
                }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#38414e"
                }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#212a37"
                }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9ca5b3"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#746855"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#1f2835"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#f3d19c"
                }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2f3948"
                }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#17263c"
                }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#515c6d"
                }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#17263c"
                }],
            },
        ]
    },
    getters: {
        stocks: (state) => state.stocks,
        modalOpenState: (state) => state.modalOpenState,
        modalData: (state) => state.modalData,
        competitors: (state) => state.competitors,
        boundaries: (state) => state.boundaries,
        colors: (state) => state.colors,
        mapSettings: (state) => state.mapSettings,
        modalZipCode: (state) => state.modalZipCode,
        mapMode: (state) => state.mapMode,
        mousePos: (state) => state.mousePos
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
        },
        setBoundaries(state, obj) {
            state.boundaries = obj
        },
        setModalZipCode(state, zipcode) {
            state.modalZipCode = zipcode
        },
        setMapMode(state, mode) {
            state.mapMode = mode
        },
        setMousePos(state, obj) {
            state.mousePos = obj
        }
    },
    actions: {
        openModal(context, obj) {
            context.commit('setModalOpenState', obj.modalOpenState)
            context.commit('setModalData', obj.modalData)
            context.commit('setMapMode', obj.mapMode)
        }
    }
});

export default store;