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
      :events="chartEvents"
      v-on:select="console.log('click')"
    />
    <button v-on:click="refresh">Get Current Temperatures</button>    
  </div>
  
  </div>
</template>

<script>

import axios from 'axios';
require('vue2-animate/dist/vue2-animate.min.css');
import { GChart } from "vue-google-charts";
import {API} from '@/common/api';

export default {
  name: 'Map',
  components: {
    GChart
  },
  data () {
    return {
      results: null,
      query: '5809844,5856195,3621849,3173529,3531673,3985710,2193733,5128581,5811696,1850147,3117735',
      showLoading: false,
      messages: [],
      companion:[],
      woof:'dfdf',
      mapData: [
        ['City',   'Average Temperature', 'Wind Speed'],
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
      mapOptions:{displayMode:'markers',colorAxis: {colors: ['#4374e0','#e7711c']}},
      chartEvents: {
        'select': () => {
          console.log('click')
        }
      }
      
    }
  },
  methods: {
      refresh: function () {
        //Trying to loop through mapData w/ current temps from results.  Not working, maybe i off by 1 or wrong number type for GeoChart?
        //let i = 0;
        //for (i=0; i<this.mapData[1].length;i++){
        //  this.mapData[i+1][1]=this.results.list[i].main.temp
          //console.log(this.mapData[i+1][i+1])
          //console.log(this.results.list[i].main.temp);
        //}
        this.mapData= [
        ['City',   'Current Temperature', 'Wind Speed'],
        ['Seattle, WA',      this.results.list[0].main.temp,    this.results.list[0].wind.speed],
        ['Honolulu, HI',     this.results.list[1].main.temp,    this.results.list[1].wind.speed],
        ['San Jose, Costa Rica',    this.results.list[2].main.temp,    this.results.list[2].wind.speed],
        ['Venice',     this.results.list[3].main.temp,    this.results.list[3].wind.speed],
        ['Cozumel',   this.results.list[4].main.temp,    this.results.list[4].wind.speed],
        ['Cabo San Lucas',     this.results.list[5].main.temp,    this.results.list[5].wind.speed],
        ['Aukland',   this.results.list[6].main.temp,    this.results.list[6].wind.speed],
        ['New York',  this.results.list[7].main.temp,    this.results.list[7].wind.speed],
        ['Spokane', this.results.list[8].main.temp,    this.results.list[8].wind.speed],
        ['Tokyo',     this.results.list[9].main.temp,    this.results.list[9].wind.speed],
        ['Madrid',  this.results.list[10].main.temp,    this.results.list[10].wind.speed]
      ]
        }
},
created () {
      this.companion = this.$ls.get('selectedDog');
      this.results = null;
      this.showLoading = true;
      let cacheLabel = `citySearch_${this.query}`;
      let cacheExpiry = 15*60*1000;
      if(!this.$ls.get(cacheLabel)){
        console.log(`no cache detected for ${cacheLabel}`);
        API.get('group', {
          params: {
              id: this.query
          }
        })
        .then(response => {
          this.results = response.data;
          this.showLoading = false;
          this.$ls.set(cacheLabel, this.results, cacheExpiry);
        })
        .catch(error => {
          this.messages.push({
            type: 'error',
            text: error.message
          });
          this.showLoading = false;
        });
      } else {
         console.log(`valid cache detected for ${cacheLabel}`);
         this.results = this.$ls.get(cacheLabel);
         this.showLoading = false;       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
