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
  UPDATE_CARD_TITLE,
  UPDATE_TASK,
  REMOVE_CARD,
  INSERT_TASK,
  INSERT_TASK_SAME,
  DRAGGING_ELEMENT,
  SET_DRAGGING,
  INSERT_CARD,
  TASKS
} from '@/constants'
import { Card, Dragging, NumberObj, State, StringObj, Task } from '@/types'
import { findById, findIndexById, saveStatePlugin } from '@/utils'
import Vue from 'vue'
import Vuex, { Commit } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    ...(JSON.parse(localStorage.getItem('state')!) || initialState),
    dragging: {
      type: null,
      taskId: null,
      cardId: null
    }
  },
  mutations: {
    [ADD_TASK](state: State, { newTask, cardIndex }: { newTask: Task; cardIndex: number }): void {
      state.cards[cardIndex].tasks.push(newTask)
    },
    [ADD_CARD](state: State, newCard: Card) {
      state.cards.push(newCard)
    },
    [REMOVE_TASK](state: State, { cardIndex, taskIndex }: NumberObj): void {
      state.cards[cardIndex].tasks.splice(taskIndex, 1)
    },
    [REMOVE_CARD](state: State, cardIndex: number) {
      state.cards.splice(cardIndex, 1)
    },
    [UPDATE_TASK](state: State, { updatedTask, cardIndex }: { updatedTask: Task; cardIndex: number }): void {
      state.cards[cardIndex].tasks = state.cards[cardIndex].tasks.map(
        (task: Task): Task => (task.id === updatedTask.id ? updatedTask : task)
      )
    },
    [UPDATE_CARD_TITLE](state: State, { cardIndex, cardTitle }: { cardIndex: number; cardTitle: string }): void {
      state.cards[cardIndex].title = cardTitle
    },
    [INSERT_TASK](
      state: State,
      { cardIndex, taskIndex, newTask }: { cardIndex: number; taskIndex: number; newTask: Task }
    ): void {
      state.cards[cardIndex].tasks.splice(taskIndex, 0, newTask)
    },
    [INSERT_TASK_SAME](
      state: State,
      {
        cardIndex,
        taskIndex,
        targetTaskIndex,
        task
      }: { cardIndex: number; taskIndex: number; targetTaskIndex: number; task: Task }
    ) {
      state.cards[cardIndex].tasks.splice(taskIndex, 1)
      state.cards[cardIndex].tasks.splice(targetTaskIndex, 0, task)
    },
    [INSERT_CARD](state: State, payload: { cardIndex: number; targetCardIndex: number; card: Card }): void {
      state.cards.splice(payload.cardIndex, 1)
      state.cards.splice(payload.targetCardIndex, 0, payload.card)
    },
    [SET_DRAGGING](state: State, payload: Dragging) {
      state.dragging = payload
    }
  },
  actions: {
    [ADD_TASK](ctx, { newTask, cardId }: { newTask: Task; cardId: string }): void {
      ctx.commit(ADD_TASK, { cardIndex: ctx.getters[CARD_INDEX](cardId), newTask })
    },
    [ADD_CARD]({ commit }: { commit: Commit }, payload): void {
      commit(ADD_CARD, payload)
    },
    [REMOVE_TASK](ctx, { cardId, taskId }: StringObj): void {
      ctx.commit(REMOVE_TASK, {
        cardIndex: ctx.getters[CARD_INDEX](cardId),
        taskIndex: ctx.getters[TASK_INDEX](cardId, taskId)
      })
    },
    [REMOVE_CARD](ctx, cardId: string): void {
      ctx.commit(REMOVE_CARD, ctx.getters[CARD_INDEX](cardId))
    },
    [UPDATE_TASK](ctx, { updatedTask, cardId }: { updatedTask: Task; cardId: string }): void {
      ctx.commit(UPDATE_TASK, { updatedTask, cardIndex: ctx.getters[CARD_INDEX](cardId) })
    },
    [UPDATE_CARD_TITLE](ctx, { cardId, cardTitle }: StringObj): void {
      ctx.commit(UPDATE_CARD_TITLE, { cardIndex: ctx.getters[CARD_INDEX](cardId), cardTitle })
    },
    [INSERT_TASK](ctx, payload: { newTask: Task; cardId: string; taskId: string }) {
      ctx.commit(INSERT_TASK, {
        cardIndex: ctx.getters[CARD_INDEX](payload.cardId),
        taskIndex: ctx.getters[TASK_INDEX](payload.cardId, payload.taskId),
        newTask: payload.newTask
      })
    },
    [INSERT_TASK_SAME](ctx, { cardId, task, targetTask }: { task: Task; cardId: string; targetTask: Task }) {
      ctx.commit(INSERT_TASK_SAME, {
        cardIndex: ctx.getters[CARD_INDEX](cardId),
        taskIndex: ctx.getters[TASK_INDEX](cardId, task.id),
        targetTaskIndex: ctx.getters[TASK_INDEX](cardId, targetTask.id),
        task
      })
    },
    [INSERT_CARD](ctx, { card, targetCard }: { card: Card; targetCard: Card | string }): void {
      ctx.commit(INSERT_CARD, {
        cardIndex: ctx.getters[CARD_INDEX](card.id),
        targetCardIndex: ctx.getters[CARD_INDEX](typeof targetCard === 'string' ? targetCard : targetCard.id),
        card
      })
    },
    [SET_DRAGGING]({ commit }: { commit: Commit }, payload: Dragging): void {
      commit(SET_DRAGGING, payload)
    }
  },
  getters: {
    [CARDS]: (state: State): Array<Card> => state.cards,
    [CARD]: (state: State) => (id: string): Card => findById(state.cards, id),
    [TASKS]: (state: State, getters: any) => (id: string): Array<Task> => state.cards[getters[CARD_INDEX](id)].tasks,
    [TASK]: (_: State, getters: any) => (cardId: string, taskId: string): Task =>
      findById(getters[CARD](cardId).tasks, taskId),
    [CARD_INDEX]: (state: State) => (id: string): number => findIndexById(state.cards, id),
    [TASK_INDEX]: (_: State, getters: any) => (cardId: string, taskId: string): number =>
      findIndexById(getters[CARD](cardId).tasks, taskId),
    [DRAGGING_ELEMENT]: (state: State): Dragging => state.dragging
  }
})
