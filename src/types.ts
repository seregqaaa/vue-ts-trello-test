export type Task = {
  title: string
  description?: string
  id: string
}

export type Card = {
  title: string
  tasks: Array<Task>
  id: string
}

export type Dragging = {
  type: 'card' | 'task' | null
  cardId: string | null
  taskId: string | null
}

export type State = {
  cards: Array<Card>
  dragging: Dragging
}

export type StringObj = {
  [type: string]: string
}

export type NumberObj = {
  [type: string]: number
}
