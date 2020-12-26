<template>
  <div class="card">
    <h3 class="card-title">Some name</h3>
    <ul class="card-list">
      <li class="card-item">Task text</li>
    </ul>
    <input type="text" placeholder="+ Create new task" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>

<style scoped>
.card {
  padding: 30px;
  margin: 15px;
  background-color: #eee;
  width: 350px;
  border-radius: 25px;
}

.card-title {
  font-size: 2.4rem;
  padding-bottom: 2rem;
  text-align: center;
}

.card-item {
  font-size: 1.8rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 1.4rem;
  user-select: none;
}

.card-item:last-child {
  margin-bottom: 0;
}

.card-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

input {
  margin-top: 1.8rem;
  font-size: 1.4rem;
  border: 0;
  background-color: transparent;
}
</style>
