<template>
  <div class="new-card-wrapper" @click="onClick">
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
.new-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  background-color: transparent;
  border: 5px dashed rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  width: 350px;
  height: 140px;
}

.create {
  width: 16rem;
  border: 0;
  border-radius: 25px;
  font-size: 16rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  cursor: pointer;
  user-select: none;
}
</style>
