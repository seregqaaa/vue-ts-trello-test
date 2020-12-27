<template>
  <div id="home">
    <div class="home-body">
      <transition-group name="fade" mode="out-in" tag="div">
        <app-card
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :tasks="card.tasks"
          :cardId="card.id"
          @on-task-click="onTaskClick"
          @on-new-card-title="onNewCardTitle"
        />
      </transition-group>
      <app-new-card />
    </div>
    <transition name="fade">
      <task-modal v-if="currentTask" :task="currentTask" :cardId="cardId" @on-cancel="onTaskModalCancel"></task-modal>
    </transition>
  </div>
</template>

<script lang="ts">
import AppCard from '@/components/AppCard.vue'
import AppNewCard from '@/components/AppNewCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import { CARDS, UPDATE_CARD_TITLE } from '@/constants'
import { Card, Task } from '@/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { AppCard, TaskModal, AppNewCard }
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
  min-height: 100vh;
  width: 100%;
  background-color: rgb(10, 10, 30);
  padding: 30px 50px;
}

.home-body {
  display: inline-block;
  min-height: 100%;
  width: 100%;
}

.home-body div {
  display: flex;
  flex-flow: row wrap;
}

/*transition*/
.fade-enter-active {
  animation: fade-in 0.2s;
}
.fade-leave-active {
  animation: fade-in 0.2s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
