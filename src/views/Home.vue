<template>
  <div id="home">
    <app-card></app-card>
  </div>
</template>

<script lang="ts">
import AppCard from '@/components/AppCard.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { AppCard }
})
export default class extends Vue {}
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100%;
  background-color: rgb(11, 10, 31);
  padding: 50px;
}
</style>
