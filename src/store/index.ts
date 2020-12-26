import { ADD_TASK, ADD_CARD, CARDS, initialState } from '@/constants'
import { Card, State, Task } from '@/types'
import { saveStatePlugin, uuid } from '@/utils'
import Vue from 'vue'
import Vuex, { Commit } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: JSON.parse(localStorage.getItem('state')!) || initialState,
  mutations: {
    [ADD_TASK](state: State, { newTask, cardId }: { newTask: Task; cardId: string }): void {
      const currentCardIndex: number | undefined = state.cards.findIndex((card: Card): boolean => card.id === cardId)
      if (currentCardIndex !== undefined) {
        state.cards[currentCardIndex].tasks.push(newTask)
      }
    },
    [ADD_CARD](state: State, newCard: Card) {
      state.cards.push(newCard)
    }
  },
  actions: {
    [ADD_TASK]({ commit }: { commit: Commit }, payload): void {
      commit(ADD_TASK, payload)
    },
    [ADD_CARD]({ commit }: { commit: Commit }, payload) {
      commit(ADD_CARD, payload)
    }
  },
  getters: {
    [CARDS]: (state): Array<Card> => state.cards
  }
})
