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
  id: string | undefined
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
