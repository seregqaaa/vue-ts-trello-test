import { Card, Task } from '@/types'

export const saveStatePlugin = (store: any): void => {
  store.subscribe((_: any, state: object): void => localStorage.setItem('state', JSON.stringify(state)))
}

export const uuid: Function = (): string => (Math.random() * 10 ** 10).toString(16)

export const findIndexById: Function = (arr: Array<Card | Task>, id: string): number =>
  arr.findIndex((item: Card | Task): boolean => item.id === id)

export const findById: Function = (arr: Array<Card | Task>, id: string): Card | Task | undefined =>
  arr.find(item => item.id === id)
