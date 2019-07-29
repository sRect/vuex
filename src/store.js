import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './myVuex'
console.log(Vuex)
Vue.use(Vuex, 123)

export default new Vuex.Store({
  state: {
    age: 18
  },
  getters: {
    myAge(state) {
      return state.age + 1;
    }
  },
  mutations: {

  },
  actions: {

  }
})
