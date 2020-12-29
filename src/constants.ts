import { uuid } from '@/utils'

export const initialState = {
  cards: [
    {
      title: 'Hello World',
      id: uuid(),
      tasks: [
        {
          title: 'First task',
          description: 'First task description',
          id: uuid()
        }
      ]
    }
  ]
}

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const REMOVE_CARD = 'REMOVE_CARD'
export const ADD_CARD = 'ADD_CARD'
export const CARDS = 'CARDS'
export const TASK = 'TASK'
export const CARD = 'CARD'
export const CARD_INDEX = 'CARD_INDEX'
export const TASK_INDEX = 'TASK_INDEX'
export const UPDATE_TASK = 'UPDATE_TASK'
export const UPDATE_CARD_TITLE = 'UPDATE_CARD_TITLE'
export const INSERT_TASK = 'INSERT_TASK'
export const INSERT_TASK_SAME = 'INSERT_TASK_SAME'
export const DRAGGING_ELEMENT = 'DRAGGING_ELEMENT'
export const SET_DRAGGING = 'SET_DRAGGING'
