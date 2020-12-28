<template>
  <div @dragover.prevent @dragenter.prevent @drop.stop="onDrop" class="card-wrapper">
    <div class="card">
      <div class="title-wrapper">
        <h3 v-if="!isTitleEditing" @click="onTitleFocus" class="card-title">{{ title }}</h3>
        <input
          v-else
          @keypress.enter.stop="onNewCardTitle"
          @blur="onNewCardTitle"
          ref="cardTitleInput"
          v-model="cardTitle"
          type="text"
          class="card-title"
        />
      </div>
      <ul class="card-list">
        <card-task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :cardId="cardId"
          @click="$emit('on-task-click', task, cardId)"
        />
      </ul>
      <input
        v-model="newTaskTitle"
        @keypress.enter.stop="onTaskEnter"
        type="text"
        class="new-task"
        placeholder="+ Create new task"
      />
      <button class="card-remove" @click="onCardRemove">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import CardTask from '@/components/CardTask.vue'
import { ADD_TASK, REMOVE_CARD, REMOVE_TASK } from '@/constants'

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
  private isTitleEditing = false
  private cardTitle = this.title

  private onTaskEnter(): void {
    const newTask: Task = {
      id: uuid(),
      title: this.newTaskTitle
    }
    this.$store.dispatch(ADD_TASK, { newTask, cardId: this.cardId })
    this.newTaskTitle = ''
  }

  private onTitleFocus() {
    this.isTitleEditing = true
    const timeoutID = setTimeout(() => {
      this.$refs.cardTitleInput.focus()
      clearTimeout(timeoutID)
    }, 0)
  }

  private onNewCardTitle(): void {
    this.isTitleEditing = false
    this.$emit('on-new-card-title', this.cardId, this.cardTitle)
  }

  private onCardRemove(): void {
    this.$store.dispatch(REMOVE_CARD, this.cardId)
  }

  private onDrop(event: DragEvent | null): void {
    if (event && event.dataTransfer) {
      const { cardId, newTask }: { cardId: string; newTask: Task } = JSON.parse(event.dataTransfer.getData('payload'))

      if (cardId === this.cardId) {
        return event.preventDefault()
      } else {
        this.$store.dispatch(ADD_TASK, { cardId: this.cardId, newTask })
        this.$store.dispatch(REMOVE_TASK, { cardId, taskId: newTask.id })
      }
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: 30px;
  background-color: #eee;
  border-radius: 25px;
  transition: all 0.2s ease;
}

.title-wrapper > input {
  display: flex;
  justify-content: center;
  max-width: 100%;
}

.card-title {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  text-align: center;
}

.card-remove {
  display: none;
}

.card:hover .card-remove {
  display: flex;
  position: absolute;
  font-size: 1.4rem;
  font-weight: 700;
  bottom: 2rem;
  right: 2rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}

.card:hover .card-remove:hover {
  opacity: 0.9;
  color: rgb(175, 0, 0);
}

h3.card-title:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.new-task {
  margin-top: 1.8rem;
  font-size: 1.4rem;
  border: 0;
  background-color: transparent;
  width: 80%;
}
</style>
