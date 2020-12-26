<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <ul class="card-list">
      <li v-for="task in tasks" :key="task.id" class="card-item">
        <span class="item-title">{{ task.title }}</span>
        <span class="item-description"></span>
      </li>
    </ul>
    <input v-model="newTaskTitle" @keypress.enter="onTaskEnter" type="text" placeholder="+ Create new task" />
  </div>
</template>

<script lang="ts">
import { ADD_TASK } from '@/constants'
import { Task } from '@/types'
import { uuid } from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() private title!: string
  @Prop() private tasks!: Array<Task>
  @Prop() private cardId!: string

  private newTaskTitle = ''

  onTaskEnter(): void {
    const newTask: Task = {
      title: this.newTaskTitle,
      id: uuid()
    }
    this.$store.dispatch(ADD_TASK, { newTask, cardId: this.cardId })
    this.newTaskTitle = ''
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  padding: 30px;
  margin: 15px;
  background-color: #eee;
  width: 350px;
  border-radius: 25px;
  transition: height 0.2s ease;
}

.card-title {
  font-size: 2.4rem;
  padding-bottom: 2rem;
  text-align: center;
}

.card-item {
  padding: 0.5rem 1rem;
  margin-bottom: 1.4rem;
  transition: all 0.2s ease;
}

.card-item:last-child {
  margin-bottom: 0;
}

.card-item:hover {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.05);
}

.item-title {
  display: block;
  padding-bottom: 0.2rem;
  font-size: 1.8rem;
  user-select: none;
}

.item-description {
  font-size: 1.2rem;
  user-select: none;
}

input {
  margin-top: 1.8rem;
  font-size: 1.4rem;
  border: 0;
  background-color: transparent;
  width: 100%;
}
</style>
