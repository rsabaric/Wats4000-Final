<template>
    <div>
    <p>
      <router-link v-bind:to="{ name: 'Dogs' }">Step 1: Pick a Canine Companion</router-link>
    </p>
    <p>
      <router-link v-bind:to="{ name: 'CitySearch' }">Step 2: Your Info</router-link>
    </p>
    <p>
      <router-link v-bind:to="{ name: 'Map' }">Step 3: Your Results</router-link>
    </p>
    <p>
      <router-link v-bind:to="{ name: 'End' }">Step 4: Finished!</router-link>
    </p>
      <iframe src="https://giphy.com/embed/14wXMGbHjXK2k0" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/boy-adventure-14wXMGbHjXK2k0">via GIPHY</a></p>
    </div>
</template>

<script>
export default {
  name: 'End',
  data () {
    return {

    }
  },
  props: {
  }
}
</script>

<style scoped>

</style>