<template>
  <div>
    <h1>Counter: {{ counter }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import { COUNTER, DECREMENT, INCREMENT } from '@/constants'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  get counter(): number {
    return this.$store.getters[COUNTER]
  }

  increment(): void {
    this.$store.dispatch(INCREMENT)
  }

  decrement(): void {
    this.$store.dispatch(DECREMENT)
  }
}
</script>
