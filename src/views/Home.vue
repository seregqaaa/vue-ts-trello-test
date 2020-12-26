<template>
  <div id="home">
    <app-card v-for="card in cards" :key="card.id" :title="card.title" :tasks="card.tasks" :cardId="card.id" />
  </div>
</template>

<script lang="ts">
import AppCard from '@/components/AppCard.vue'
import { CARDS } from '@/constants'
import { Card } from '@/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { AppCard }
})
export default class extends Vue {
  get cards(): Array<Card> {
    return this.$store.getters[CARDS]
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100%;
  background-color: rgb(10, 10, 30);
  padding: 50px;
}
</style>
