<template>
  <div class="container">
    <h1>Vue3 Roulette</h1>
    

    <router-link to="/"><button class="btn btn-primary">Home</button></router-link>

    <router-link to="/docs"><button class="btn btn-primary">Docs</button></router-link>


    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Container'
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