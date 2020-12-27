<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h1 class="modal-title">Title</h1>
      <div class="modal-body">
        <p>Description</p>
        <textarea class="modal-area"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>

<style scoped></style>
