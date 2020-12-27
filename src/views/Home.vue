<template>
  <div id="home">
    <app-card
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :tasks="card.tasks"
      :cardId="card.id"
      @on-task-click="onTaskClick"
      @on-new-card-title="onNewCardTitle"
    />
    <task-modal v-if="currentTask" :task="currentTask" :cardId="cardId" @on-cancel="onTaskModalCancel"></task-modal>
  </div>
</template>

<script lang="ts">
import AppCard from '@/components/AppCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import { CARDS, UPDATE_CARD_TITLE } from '@/constants'
import { Card, Task } from '@/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { AppCard, TaskModal }
})
export default class extends Vue {
  private currentTask: Task | null = null
  private cardId: string | null = null

  get cards(): Array<Card> {
    return this.$store.getters[CARDS]
  }

  private onTaskClick(currentTask: Task, cardId: string): void {
    this.currentTask = currentTask
    this.cardId = cardId
  }

  private onTaskModalCancel(): void {
    this.currentTask = this.cardId = null
  }

  private onNewCardTitle(cardId: string, cardTitle: string): void {
    this.$store.dispatch(UPDATE_CARD_TITLE, { cardId, cardTitle })
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100%;
  background-color: rgb(10, 10, 30);
  padding: 50px;
  display: flex;
  flex-flow: row wrap;
}
</style>
