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
export const ADD_CARD = 'ADD_CARD'
export const CARDS = 'CARDS'
