import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rutas: [],
        asignaturasDocente: [],
        tareaEstudiante: [],
        claseEstudiante: [],
        userData: [],
        posasig: 0,
        posacti: 0,
        menuVisible: false, // Agrega una propiedad para el menú
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
        setClaseEstudiante(state, claseEstudiante) {
            state.claseEstudiante = claseEstudiante;
        },
        setRutas(state, rutas) {
            for (var data of rutas) {
                state.rutas.push(data);
            }
        },
        setSalida(state) {
            state.menuVisible = false; // Cierra el menú desplegable
        },
        toggleMenu(state) {
            state.menuVisible = !state.menuVisible; // Cambia el estado del menú
        },
    },
    getters: {
        getMenu(state) {
            return state.menuVisible;
        },
        getRuta(state) {
            return state.rutas;
        },
        getAsignaturas(state) {
            return state.asignaturasDocente;
        },
        menuVisible(state) {
            return state.menuVisible; // Agrega un getter para obtener el estado del menú
        },
    },
    actions: {
        // Puedes agregar acciones aquí para realizar tareas asíncronas si es necesario
    },
    modules: {},
    plugins: [createPersistedState()]
})
