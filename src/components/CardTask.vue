<template>
  <li
    class="card-item"
    draggable="true"
    @dragstart.stop.self="onDragStart"
    @dragend.stop.self="onDragEnd"
    @click="$emit('click')"
  >
    <div class="item-body">
      <span class="item-title">{{ task.title }}</span>
      <span class="item-description">{{
        task.description
          ? task.description.length > 40
            ? `${task.description.slice(0, 40)}...`
            : task.description
          : ''
      }}</span>
    </div>
    <span class="item-icon" @click.stop="onTaskDelete">×</span>
  </li>
</template>

<script lang="ts">
import { REMOVE_TASK } from '@/constants'
import { Task } from '@/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() task!: Task
  @Prop() cardId!: string

  private onTaskDelete(): void {
    this.$store.dispatch(REMOVE_TASK, {
      cardId: this.cardId,
      taskId: this.task.id
    })
  }

  private onDragStart({ target, dataTransfer }: any): void {
    const timeoutId = setTimeout(() => {
      target.classList.toggle('invisible')
      clearTimeout(timeoutId)
    }, 0)

    dataTransfer.effectAllowed = 'move'
    dataTransfer.dropEffect = 'move'

    dataTransfer.setData('payload', JSON.stringify({ cardId: this.cardId, newTask: this.task }))
  }

  private onDragEnd({ target }: any): void {
    target.classList.toggle('invisible')
  }
}
</script>

<style scoped>
.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.card-item:last-child {
  margin-bottom: 0;
}

.card-item:hover {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.05);
}

.item-body {
  display: flex;
  flex-flow: column nowrap;
}

.item-title {
  padding-bottom: 0.2rem;
  font-size: 1.8rem;
  user-select: none;
}

.item-icon {
  display: none;
}

.item-description {
  font-size: 1.2rem;
  user-select: none;
  font-style: italic;
  color: rgba(0, 0, 0, 0.7);
}

.card-item:hover > .item-icon {
  display: inherit;
  user-select: none;
  font-size: 2rem;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  transform: scale(1.3);
  transition: color 0.1s ease;
}

.card-item:hover .item-icon:hover {
  color: rgb(175, 0, 0);
  transform: scale(1.4);
}

.invisible {
  visibility: hidden;
}
</style>
