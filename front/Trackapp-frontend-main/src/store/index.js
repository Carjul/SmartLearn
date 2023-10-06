import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'




Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rutas: [],
        asignaturasDocente: [],
        tareaEstudiante: [],
        userData: []

    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        },
        setAsignaturasDocente(state, asignaturasDocente) {
            state.asignaturasDocente = asignaturasDocente;
        },
        setTareaEstudiante(state, tareaEstudiante) {
            state.tareaEstudiante = tareaEstudiante;
        },


        setRutas(state, rutas) {
            for (var data of rutas) {
                state.rutas.push(data);
            }
        },

        setSalida(state) {
            state.menu = null
        }


    },

    getters: {
        getMenu(state) {
            return state.menu;
        },
        getRuta(state) {
            return state.rutas;
        },
        getAsignaturas(state) {
            return state.asignaturasDocente;
        }

    },
    actions: {

    },
    modules: {},
    plugins: [createPersistedState()]
})