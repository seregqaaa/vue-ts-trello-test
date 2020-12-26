import { COUNTER, DECREMENT, INCREMENT } from '@/constants'
import { saveStatePlugin } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    counter: localStorage.getItem('state') ? parseInt(JSON.parse(localStorage.getItem('state')!).counter) : 0
  },
  mutations: {
    [INCREMENT](state): void {
      state.counter++
    },
    [DECREMENT](state): void {
      state.counter--
    }
  },
  actions: {
    [INCREMENT]({ commit }): void {
      commit(INCREMENT)
    },
    [DECREMENT]({ commit }): void {
      commit(DECREMENT)
    }
  },
  getters: {
    [COUNTER]: ({ counter }): number => counter
  }
})
