<template>
  <div id="app">
    <h1>The Woofing Wanderer</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding: 0rem 0rem;
    background-image: url(assets/watersky.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  
}
</style>
