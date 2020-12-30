<template>
  <li
    class="card-item"
    title="Hold and move to drag. Click to open."
    draggable="true"
    @dragstart.self.stop="onDragStart"
    @dragend.self.stop="onDragEnd"
    @dragover.prevent.stop
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent.stop="onDrop"
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
import { DRAGGING_ELEMENT, INSERT_CARD, INSERT_TASK, INSERT_TASK_SAME, REMOVE_TASK, SET_DRAGGING } from '@/constants'
import { Card, Dragging, Task } from '@/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) readonly task!: Task
  @Prop({ required: true }) readonly cardId!: string

  private get dragging(): Dragging {
    return this.$store.getters[DRAGGING_ELEMENT]
  }

  private onTaskDelete(): void {
    this.$store.dispatch(REMOVE_TASK, {
      cardId: this.cardId,
      taskId: this.task.id
    })
  }

  private onDragStart({ target, dataTransfer }: any): void {
    this.$store.dispatch(SET_DRAGGING, { type: 'task' })
    const timeoutId = setTimeout(() => {
      target.classList.add('invisible')
      clearTimeout(timeoutId)
    }, 0)

    dataTransfer.effectAllowed = 'move'
    dataTransfer.dropEffect = 'move'

    dataTransfer.setData('payload', JSON.stringify({ cardId: this.cardId, newTask: this.task }))
  }

  private onDragEnd({ target }: any): void {
    this.$store.dispatch(SET_DRAGGING, { type: null })
    target.classList.remove('invisible')
  }

  private onDragEnter(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.add('card-item-hovered')
    }
  }

  private onDragLeave(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.remove('card-item-hovered')
    }
  }

  private onDrop(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.remove('card-item-hovered')
      if (event && event.dataTransfer) {
        const { cardId, newTask }: { cardId: string; newTask: Task } = JSON.parse(event.dataTransfer.getData('payload'))

        if (!newTask) {
          return event.preventDefault()
        }

        if (cardId === this.cardId) {
          this.$store.dispatch(INSERT_TASK_SAME, { cardId, task: newTask, targetTask: this.task })
        } else {
          this.$store.dispatch(INSERT_TASK, {
            cardId: this.cardId,
            taskId: this.task.id,
            newTask
          })
          this.$store.dispatch(REMOVE_TASK, { cardId, taskId: newTask.id })
        }
      }
    } else if (this.dragging.type === 'card') {
      const { card }: { card: Card } = JSON.parse(event.dataTransfer.getData('payload'))

      if (card.id !== this.cardId) {
        this.$store.dispatch(INSERT_CARD, { card, targetCard: this.cardId })
      }
    }
  }
}
</script>

<style scoped>
.card-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.card-item::before {
  content: '';
  display: none;
  position: absolute;
  width: 100%;
  height: 3.5rem;
  top: 0;
  left: 0;
  border: 3px dashed transparent;
  border-radius: 1rem;
  transition: border 0.133s;
}

.card-item-hovered.card-item {
  padding-top: 5rem;
}

.card-item-hovered.card-item::before {
  display: block;
  border: 3px dashed #ccc;
}

.card-item:last-child {
  margin-bottom: 0;
}

.card-item:hover:not(.card-item-hovered) {
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
  opacity: 0;
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
  opacity: 1;
  transition-property: color, opacity;
  transition-duration: 0.2s;
}

.card-item:hover .item-icon:hover {
  color: rgb(175, 0, 0);
  transform: scale(1.4);
}

.invisible {
  opacity: 0.3;
}
</style>
