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

export type State = {
  cards: Array<Card>
}
