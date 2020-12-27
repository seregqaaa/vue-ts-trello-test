import {
  ADD_TASK,
  ADD_CARD,
  CARDS,
  REMOVE_TASK,
  TASK_INDEX,
  CARD_INDEX,
  initialState,
  TASK,
  CARD,
  UPDATE_TASK
} from '@/constants'
import { Card, State, Task } from '@/types'
import { findById, findIndexById, saveStatePlugin } from '@/utils'
import Vue from 'vue'
import Vuex, { Commit } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: JSON.parse(localStorage.getItem('state')!) || initialState,
  mutations: {
    [ADD_TASK](state: State, { newTask, cardIndex }: { newTask: Task; cardIndex: number }): void {
      state.cards[cardIndex].tasks.push(newTask)
    },
    [ADD_CARD](state: State, newCard: Card) {
      state.cards.push(newCard)
    },
    [REMOVE_TASK](state: State, { cardIndex, taskIndex }: { cardIndex: number; taskIndex: number }): void {
      state.cards[cardIndex].tasks.splice(taskIndex, 1)
    },
    [UPDATE_TASK](state: State, { updatedTask, cardIndex }: { updatedTask: Task; cardIndex: number }) {
      state.cards[cardIndex].tasks = state.cards[cardIndex].tasks.map(
        (task: Task): Task => (task.id === updatedTask.id ? updatedTask : task)
      )
    }
  },
  actions: {
    [ADD_TASK](ctx, { newTask, cardId }: { newTask: Task; cardId: string }): void {
      ctx.commit(ADD_TASK, { cardIndex: ctx.getters[CARD_INDEX](cardId), newTask })
    },
    [ADD_CARD]({ commit }: { commit: Commit }, payload): void {
      commit(ADD_CARD, payload)
    },
    [REMOVE_TASK](ctx, { cardId, taskId }: { cardId: string; taskId: string }): void {
      ctx.commit(REMOVE_TASK, {
        cardIndex: ctx.getters[CARD_INDEX](cardId),
        taskIndex: ctx.getters[TASK_INDEX](cardId, taskId)
      })
    },
    [UPDATE_TASK](ctx, { updatedTask, cardId }: { updatedTask: Task; cardId: string }): void {
      ctx.commit(UPDATE_TASK, { updatedTask, cardIndex: ctx.getters[CARD_INDEX](cardId) })
    }
  },
  getters: {
    [CARDS]: (state: State): Array<Card> => state.cards,
    [CARD]: (state: State) => (id: string): Card => findById(state.cards, id),
    [TASK]: (_: State, getters: any) => (cardId: string, taskId: string): Task => {
      return findById(getters[CARD](cardId).tasks, taskId)
    },
    [CARD_INDEX]: (state: State) => (id: string): number => findIndexById(state.cards, id),
    [TASK_INDEX]: (_: State, getters: any) => (cardId: string, taskId: string): number =>
      findIndexById(getters[CARD](cardId).tasks, taskId)
  }
})
