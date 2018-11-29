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
    <div id="app">
    <GChart
      type="GeoChart"
      :settings="{ packages: ['geochart'], mapsApiKey:'AIzaSyA63PM8wLyUAsL6AT3MVuxUszbVQ_KBJUE'}"
      :data="mapData"
      :options="mapOptions"
    />    
  </div>
  
  </div>
</template>

<script>

import axios from 'axios';
require('vue2-animate/dist/vue2-animate.min.css');
import { GChart } from "vue-google-charts";

export default {
  name: 'Map',
  components: {
    GChart
  },
  data () {
    return {
      companion:[],
      woof:'dfdf',
      mapData: [
        ['City',   'Average Temperature', 'Average Daily Precipitation'],
        ['Seattle, WA',      50,    .5],
        ['Honolulu, HI',     80,    .5],
        ['San Jose, Costa Rica',    90,    .5],
        ['Venice',     60,    .5],
        ['Cozumel',   80,    .5],
        ['Cabo San Lucas',     70,    .5],
        ['Aukland',   50,    .5],
        ['New York',  50,    .5],
        ['Spokane', 40,    .5],
        ['Tokyo',     50,    .5],
        ['Madrid',  60,    .5]
      ],
      mapOptions:{displayMode:'markers',colorAxis: {colors: ['#4374e0','#e7711c']}}
    }
  },
  methods: {
},
created () {
    this.companion = this.$ls.get('selectedDog');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
