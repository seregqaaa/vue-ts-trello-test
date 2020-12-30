<template>
  <div
    class="card-wrapper"
    draggable="true"
    @dragstart.self="onDragStart"
    @dragend.self="onDragEnd"
    @dragover.prevent
    @drop="onCardDrop"
  >
    <div class="card">
      <div class="title-wrapper">
        <h3 v-if="!isTitleEditing" @click="onTitleFocus" class="card-title">{{ card.title }}</h3>
        <input
          v-else
          @keypress.enter.stop="onNewCardTitle"
          @blur="onNewCardTitle"
          ref="cardTitleInput"
          v-model="cardTitle"
          type="text"
          class="card-title"
          placeholder="Title of the card can not be empty"
        />
      </div>
      <ul
        @dragover.prevent.stop
        @drop.stop="onTaskDrop"
        @dragenter.prevent="onTaskDragEnter"
        @dragleave.prevent="onTaskDragLeave"
        class="card-list"
      >
        <transition-group name="fade" mode="out-in">
          <card-task
            v-for="task in card.tasks"
            :key="task.id"
            :task="task"
            :cardId="card.id"
            @click="$emit('on-task-click', task, card.id)"
          />
        </transition-group>
      </ul>
      <input
        v-model="newTaskTitle"
        @keypress.enter.stop="onTaskEnter"
        ref="newTaskInput"
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
import { ADD_TASK, DRAGGING_ELEMENT, INSERT_CARD, REMOVE_CARD, REMOVE_TASK, SET_DRAGGING } from '@/constants'

import { Card, Dragging, Task } from '@/types'
import { uuid } from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: { CardTask }
})
export default class extends Vue {
  @Prop({ required: true }) readonly card!: Card

  private get dragging(): Dragging {
    return this.$store.getters[DRAGGING_ELEMENT]
  }

  private newTaskTitle = ''
  private isTitleEditing = false
  private cardTitle = this.card.title

  private onTaskEnter(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: uuid(),
        title: this.newTaskTitle
      }
      this.$store.dispatch(ADD_TASK, { newTask, cardId: this.card.id })
      this.newTaskTitle = ''
    } else {
      // @ts-expect-error
      const prevPlaceholder: string = this.$refs.newTaskInput.placeholder
      // @ts-expect-error
      this.$refs.newTaskInput.placeholder = 'Title of the task can not be empty'

      const timeoutId = setTimeout(() => {
        // @ts-expect-error
        this.$refs.newTaskInput.placeholder = prevPlaceholder
        clearTimeout(timeoutId)
      }, 1500)
    }
  }

  private onTitleFocus() {
    this.isTitleEditing = true
    const timeoutID = setTimeout(() => {
      // @ts-expect-error
      this.$refs.cardTitleInput.focus()
      clearTimeout(timeoutID)
    }, 0)
  }

  private onNewCardTitle(): void {
    if (!this.cardTitle.trim()) {
      this.isTitleEditing = false
      this.cardTitle = this.card.title
    } else {
      this.isTitleEditing = false
      this.$emit('on-new-card-title', this.card.id, this.cardTitle)
    }
  }

  private onCardRemove(): void {
    this.$store.dispatch(REMOVE_CARD, this.card.id)
  }

  private onDragStart(event: DragEvent | any): void {
    this.$store.dispatch(SET_DRAGGING, { type: 'card', cardId: this.card.id, taskId: null })
    const timeoutId = setTimeout(() => {
      event.target.classList.add('invisible')
      clearTimeout(timeoutId)
    }, 0)

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'

    event.dataTransfer.setData('payload', JSON.stringify({ card: this.card }))
  }

  private onDragEnd({ target }: any): void {
    this.$store.dispatch(SET_DRAGGING, { type: null, cardId: null, taskId: null })
    target.classList.remove('invisible')
  }

  private onCardDrop(event: DragEvent | any): void {
    if (this.dragging.type === 'card') {
      const { card }: { card: Card } = JSON.parse(event.dataTransfer.getData('payload'))

      if (card.id !== this.card.id) {
        this.$store.dispatch(INSERT_CARD, { card, targetCard: this.card })
      }
    }
  }

  private onTaskDrop(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.remove('hovered')
      if (event && event.dataTransfer) {
        const { cardId, newTask }: { cardId: string; newTask: Task } = JSON.parse(event.dataTransfer.getData('payload'))

        if (cardId === this.card.id) {
          return event.preventDefault()
        } else {
          this.$store.dispatch(ADD_TASK, { cardId: this.card.id, newTask })
          this.$store.dispatch(REMOVE_TASK, { cardId, taskId: newTask.id })
        }
      }
    } else if (this.dragging.type === 'card') {
      this.onCardDrop(event)
    }
  }

  private onTaskDragEnter(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.add('hovered')
    }
  }

  private onTaskDragLeave(event: DragEvent | any): void {
    if (this.dragging.type === 'task') {
      event.currentTarget.classList.remove('hovered')
    }
  }
}
</script>

<style scoped>
.card {
  width: 350px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: 30px;
  background-color: #eee;
  border-radius: 25px;
  transition: all 0.2s ease;
  margin-right: 20px;
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
  border-radius: 10px;
}

input.card-title {
  border: 1px solid #ccc;
}

.card-title::placeholder {
  font-size: 1.4rem;
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
  border-radius: 5px;
}

.card-list {
  min-height: 20px;
  border: 3px dashed transparent;
  border-radius: 10px;
  padding: 5px 5px 15px 5px;
}

.hovered {
  border: 3px dashed #ccc;
  transition: border 0.133s ease;
}

.new-task {
  margin-top: 1.8rem;
  font-size: 1.4rem;
  border: 0;
  background-color: transparent;
  width: 80%;
}

.invisible {
  opacity: 0.1;
  transition: all 0.2s;
}

@import '../assets/transition.css';
</style>
