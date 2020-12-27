<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h1 class="modal-title">{{ task.title }}</h1>
      <div class="modal-body">
        <p>Description:</p>
        <textarea class="modal-area" :value="task.description"></textarea>
      </div>
      <div class="modal-buttons">
        <button class="btn btn-accept">Accept</button>
        <button class="btn btn-cancel" @click="onCancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '@/types'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() task!: Task
}
</script>

<style scoped></style>
