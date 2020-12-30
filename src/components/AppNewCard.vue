<template>
  <div class="new-card-wrapper" @click="onClick" title="Create new card">
    <div class="new-card">
      <button class="create">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ADD_CARD } from '@/constants'
import { uuid } from '@/utils'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  private onClick(): void {
    this.$store.dispatch(ADD_CARD, {
      id: uuid(),
      title: 'Default title',
      tasks: []
    })
  }
}
</script>

<style scoped>
.new-card-wrapper {
  margin: 15px;
  min-width: 300px;
  padding-right: 20px;
  cursor: cell;
}

.new-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 5px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  height: 140px;
}

.create {
  border: 0;
  border-radius: 25px;
  font-size: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  user-select: none;
  cursor: cell;
}
</style>
