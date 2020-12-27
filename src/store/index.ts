import { ADD_TASK, ADD_CARD, CARDS, REMOVE_TASK, initialState } from '@/constants'
import { Card, State, Task } from '@/types'
import { findById, saveStatePlugin } from '@/utils'
import Vue from 'vue'
import Vuex, { Commit } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: JSON.parse(localStorage.getItem('state')!) || initialState,
  mutations: {
    [ADD_TASK](state: State, { newTask, cardId }: { newTask: Task; cardId: string }): void {
      const currentCardIndex: number = findById(state.cards, cardId)
      if (currentCardIndex !== -1) {
        state.cards[currentCardIndex].tasks.push(newTask)
      }
    },
    [ADD_CARD](state: State, newCard: Card) {
      state.cards.push(newCard)
    },
    [REMOVE_TASK](state: State, { cardId, taskId }: { cardId: string; taskId: string }) {
      const currentCardIndex: number = findById(state.cards, cardId)
      if (currentCardIndex !== -1) {
        const currentTaskIndex: number = findById(state.cards[currentCardIndex].tasks, taskId)
        if (currentTaskIndex !== -1) {
          state.cards[currentCardIndex].tasks.splice(currentTaskIndex, 1)
        }
      }
    }
  },
  actions: {
    [ADD_TASK]({ commit }: { commit: Commit }, payload): void {
      commit(ADD_TASK, payload)
    },
    [ADD_CARD]({ commit }: { commit: Commit }, payload): void {
      commit(ADD_CARD, payload)
    },
    [REMOVE_TASK]({ commit }: { commit: Commit }, payload): void {
      commit(REMOVE_TASK, payload)
    }
  },
  getters: {
    [CARDS]: (state): Array<Card> => state.cards
  }
})
