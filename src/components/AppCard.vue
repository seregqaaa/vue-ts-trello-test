<template>
  <div class="card-wrapper">
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
      <ul class="card-list">
        <card-task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :cardId="cardId"
          @click="$emit('on-task-click', task, cardId)"
        />
      </ul>
      <input v-model="newTaskTitle" @keypress.enter="onTaskEnter" type="text" placeholder="+ Create new task" />
    </div>
  </div>
</template>

<script lang="ts">
import CardTask from '@/components/CardTask.vue'
import { ADD_TASK } from '@/constants'

import { Task } from '@/types'
import { uuid } from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: { CardTask }
})
export default class extends Vue {
  @Prop() private title!: string
  @Prop() private tasks!: Array<Task>
  @Prop() private cardId!: string

  private newTaskTitle = ''

  private onTaskEnter(): void {
    const newTask: Task = {
      id: uuid(),
      title: this.newTaskTitle
    }
    this.$store.dispatch(ADD_TASK, { newTask, cardId: this.cardId })
    this.newTaskTitle = ''
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-flow: column nowrap;
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

input {
  margin-top: 1.8rem;
  font-size: 1.4rem;
  border: 0;
  background-color: transparent;
  width: 100%;
}
</style>
