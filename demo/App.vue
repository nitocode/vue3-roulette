<template>
  <div class="container">
    <h1>Vue3 Roulette</h1>
    
    <Roulette
      ref="wheel"
      @click="launchWheel"
      :items="items"
    >
    </Roulette>
  </div>
</template>

<script>
import Roulette from '../src/components/Roulette.vue'

export default {
  name: 'Container',

  components: {
    Roulette,
  },

  data () {
    return {
      items: [
        { id: 1, name: "Banana", htmlContent: "Banana", background: "" },
        { id: 2, name: "Apple", htmlContent: "Apple", background: "" },
        {
          id: 3,
          name: "Orange and Purple",
          htmlContent: "Orange<br>and Purple",
          background: "",
        },
        { id: 4, name: "Cherry", htmlContent: "Cherry", background: "" },
        {
          id: 5,
          name: "Strawberry",
          htmlContent: "Strawberry",
          background: "",
        },
        { id: 6, name: "Grape", htmlContent: "Grape", background: "" },
      ]
    }
  },

  methods: {
    launchWheel() {
      this.$refs.wheel.launchWheel();
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

html, body {
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>