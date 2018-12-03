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
   <!--
   <p>
    <router-link v-bind:to="{ name: 'End' }">Step 4: Finished!</router-link>
   </p>
   -->
     <img v-bind:src="companion[0].link" class="thumbnail"></img>
     <p> Select a destination from one of the markers on the map below.</p>
     <p> The map shows the current weather and historical weather information.  Use the buttons below the map to change the view.</p>
    <div id="app">
    <GChart
      type="GeoChart"
      :settings="{ packages: ['geochart'], mapsApiKey:'AIzaSyA63PM8wLyUAsL6AT3MVuxUszbVQ_KBJUE'}"
      :data="mapData"
      :options="mapOptions"
      :events="chartEvents"
      ref="gChart"
    />
    <button v-on:click="refresh">Get Current Temperatures</button>
    <label>
    <button v-on:click="seeHistory">See Historical Weather for Selected Date:</button>
    <input type="date" v-model="historyDate">
    </label>
    <div v-if="selectionTemp">
    <p>Your Current Selection: {{selectionCity}}</p>
    <p v-if="selectionTemp<40">Brrrr, it's only It's {{selectionTemp}} degrees in {{selectionCity}}, you better pack that parka!</p>
    <p v-else-if="selectionTemp<60">It's {{selectionTemp}} degrees in {{selectionCity}}, you might want to pack a sweater!</p>
    <p v-else-if="selectionTemp<80">It's {{selectionTemp}} degrees in {{selectionCity}}, that sounds nice! Pack for pleasant weather.</p>
    <p v-else-if="selectionTemp<100">It's {{selectionTemp}} degrees in {{selectionCity}}, pack some shorts and flip-flops!</p>
    <p v-else>Yikes, it's {{selectionTemp}} degrees in {{selectionCity}}, pack some shorts and drink plenty of water!</p> 
    <button v-on:click="final">Alright, take me to {{selectionCity}}</button>
    </div>
  </div>
  
  </div>
</template>

<script>

import axios from 'axios';
require('vue2-animate/dist/vue2-animate.min.css');
import { GChart } from "vue-google-charts";
import {API} from '@/common/api';
import {Seattle} from '@/assets/Seattle';
import {Aukland} from '@/assets/Aukland';
import {Cabo} from '@/assets/Cabo';
import {CostaRica} from '@/assets/CostaRica';
import {Cozumel} from '@/assets/Cozumel';
import {Honolulu} from '@/assets/Honolulu';
import {Madrid} from '@/assets/Madrid';
import {NewYork} from '@/assets/NewYork';
import {Tokyo} from '@/assets/Tokyo';
import {Venice} from '@/assets/Venice';
import {Spokane} from '@/assets/Spokane';


export default {
  name: 'Map',
  components: {
    GChart
  },
  data () {
    return {
      testName: null,
      historyDate: null,
      results: null,
      query: '5809844,5856195,3621849,3173529,3531673,3985710,2193733,5128581,5811696,1850147,3117735',
      showLoading: false,
      messages: [],
      companion:[],
      woof:'dfdf',
      mapData: [],
      selectionCity:'',
      selectionTemp:0,
      dogMessage: '',
      mapOptions:{displayMode:'markers',colorAxis: {colors: ['#4374e0','#e7711c']}},
      chartEvents: {
        'select': () => {
          const chartMap = this.$refs.gChart.chartObject;
          const selection = chartMap.getSelection();
          this.selectionCity = this.mapData[(selection[0].row+1)][0];
          this.selectionTemp = this.mapData[(selection[0].row+1)][1].toString();
        }
      }
      
    }
  },
  methods: {
      final: function () {
      this.$router.push('End');
      },
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
        ['Venice, Italy',     this.results.list[3].main.temp,    this.results.list[3].wind.speed],
        ['Cozumel, Mexico',   this.results.list[4].main.temp,    this.results.list[4].wind.speed],
        ['Cabo San Lucas, Mexico',     this.results.list[5].main.temp,    this.results.list[5].wind.speed],
        ['Aukland, New Zealand',   this.results.list[6].main.temp,    this.results.list[6].wind.speed],
        ['New York, NY',  this.results.list[7].main.temp,    this.results.list[7].wind.speed],
        ['Spokane, WA', this.results.list[8].main.temp,    this.results.list[8].wind.speed],
        ['Tokyo, Japan',     this.results.list[9].main.temp,    this.results.list[9].wind.speed],
        ['Madrid, Spain',  this.results.list[10].main.temp,    this.results.list[10].wind.speed]
      ]
      console.log('refresh');
      },
      seeHistory: function () {
        //Trying to loop through mapData w/ current temps from results.  Not working, maybe i off by 1 or wrong number type for GeoChart?
        //let i = 0;
        //for (i=0; i<this.mapData[1].length;i++){
        //  this.mapData[i+1][1]=this.results.list[i].main.temp
          //console.log(this.mapData[i+1][i+1])
          //console.log(this.results.list[i].main.temp);
        //}
        var travelDate = new Date(this.historyDate);
        var month = travelDate.getMonth();
        this.mapData= [
        ['City',   'Max Temperature', 'Precipitation'],
        ['Seattle, WA',      Seattle[month]['Average High Temp.'],    Seattle[month]['Precipitation']],
        ['Honolulu, HI',     Honolulu[month]['Average High Temp.'],    Honolulu[month]['Precipitation']],
        ['San Jose, Costa Rica',    CostaRica[month]['Average High Temp.'],    CostaRica[month]['Precipitation']],
        ['Venice, Italy',     Venice[month]['Average High Temp.'],    Venice[month]['Precipitation']],
        ['Cozumel, Mexico',   Cozumel[month]['Average High Temp.'],    Cozumel[month]['Precipitation']],
        ['Cabo San Lucas, Mexico',     Cabo[month]['Average High Temp.'],    Cabo[month]['Precipitation']],
        ['Aukland, New Zealand',   Aukland[month]['Average High Temp.'],    Aukland[month]['Precipitation']],
        ['New York, NY',  NewYork[month]['Average High Temp.'],    NewYork[month]['Precipitation']],
        ['Spokane, WA', Spokane[month]['Average High Temp.'],    Spokane[month]['Precipitation']],
        ['Tokyo, Japan',     Tokyo[month]['Average High Temp.'],    Tokyo[month]['Precipitation']],
        ['Madrid, Spain',  Madrid[month]['Average High Temp.'],    Madrid[month]['Precipitation']]
      ];
      console.log('see historic data');
      console.log(Seattle[month]['Average High Temp.']);
      }
},
created () {
      this.testName = Seattle[0]['Average High Temp.'];
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
        this.mapData= [
        ['City',   'Current Temperature', 'Wind Speed'],
        ['Seattle, WA',      this.results.list[0].main.temp,    this.results.list[0].wind.speed],
        ['Honolulu, HI',     this.results.list[1].main.temp,    this.results.list[1].wind.speed],
        ['San Jose, Costa Rica',    this.results.list[2].main.temp,    this.results.list[2].wind.speed],
        ['Venice, Italy',     this.results.list[3].main.temp,    this.results.list[3].wind.speed],
        ['Cozumel, Mexico',   this.results.list[4].main.temp,    this.results.list[4].wind.speed],
        ['Cabo San Lucas, Mexico',     this.results.list[5].main.temp,    this.results.list[5].wind.speed],
        ['Aukland, New Zealand',   this.results.list[6].main.temp,    this.results.list[6].wind.speed],
        ['New York, NY',  this.results.list[7].main.temp,    this.results.list[7].wind.speed],
        ['Spokane, WA', this.results.list[8].main.temp,    this.results.list[8].wind.speed],
        ['Tokyo, Japan',     this.results.list[9].main.temp,    this.results.list[9].wind.speed],
        ['Madrid, Spain',  this.results.list[10].main.temp,    this.results.list[10].wind.speed]
      ]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thumbnail {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
}
</style>
