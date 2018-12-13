<template>
  <div>
   <ul class="nav">
   <li>
    <router-link to=/ active class="navitem" exact>Step 1: Pick a Canine Companion</router-link>
   </li>
   <li>
    <router-link to=/CitySearch active class="navitem" exact>Step 2: Your Info</router-link>
   </li>
   <li>
    <router-link to=/Map active class="navitem" exact>Step 3: Your Results</router-link>
   </li>
   <li class = "navItemInactive">
    Step 4: Finished!
   </li>
   </ul>
     <img v-bind:src="companion[0].link" class="thumbnail"></img>
     <p>Woof Woof!  This page provides a map to help you choose a destination.</p>
     <p>We have the current weather for several popular cities, as well as historical averages for each month.</p>
     <div v-show="showMap">
        <p>Use the button and slider below to change the info on the map, then choose a destination by clicking a city.</p>
        <button v-on:click="refresh">Get Current Temperatures</button>
        <label for="monthRange">Select Month for Historical Weather:</label>
        <input type="range" v-on:change="seeHistory" v-model="historyMonth" min="0" max="11" value="6" class="slider" id="monthRange">
        <label for="monthRange">{{intMonth[historyMonth]}}</label>
     </div>
      <div class= "googlechart" v-show="showMap">
        <GChart
          type="GeoChart"
          :settings="{ packages: ['geochart'], mapsApiKey:'AIzaSyA63PM8wLyUAsL6AT3MVuxUszbVQ_KBJUE'}"
          :data="mapData"
          :options="mapOptions"
          :events="chartEvents"
          ref="gChart"
        />
      </div>
      <div v-if="!showMap" class = "cityInfo">
        <p>Your Current Selection: {{selectionCity}}</p>
          <GChart
          :settings="{packages: ['line']}" 
          :data="lineData"
          :options="lineOptions"
          :createChart="(el, google) => new google.charts.Line(el)"
          @ready="onChartReady"
          />
        <p>Your selected travel date is {{travelDate}}</p>
        <p v-if="selectionTemp<40">Brrrr, the average high temperature is only {{selectionTemp}} degrees in {{selectionCity}} during {{travelMonthStr}}, you better pack that parka!</p>
        <p v-else-if="selectionTemp<60">The average high temperature is {{selectionTemp}} degrees in {{selectionCity}} during {{travelMonthStr}}, you might want to pack a sweater!</p>
        <p v-else-if="selectionTemp<80">The average high temperature is {{selectionTemp}} degrees in {{selectionCity}} during {{travelMonthStr}}, that sounds nice! Pack for pleasant weather.</p>
        <p v-else-if="selectionTemp<100">The average high temperature is {{selectionTemp}} degrees in {{selectionCity}} during {{travelMonthStr}}, pack some shorts and flip-flops!</p>
        <p v-else>Yikes, The average high temperature is {{selectionTemp}} degrees in {{selectionCity}} during {{travelMonthStr}}, pack some shorts and drink plenty of water!</p>
        <p v-if="budget==='100'">${{budget}} is not very much money to get to {{selectionCity}} from {{cityName}}.  Sign up for the PuppyCard Elite Credit Card now!</p>
        <p v-else-if="budget==='1000'">${{budget}} might be enough to get to {{selectionCity}} from {{cityName}}.  If you can sniff out a bit more $$ you might be a little more comfortable!</p>
        <p v-else-if="budget==='10000'">${{budget}} is definately enough to get to {{selectionCity}} from {{cityName}}.  You and your pup can travel in style!</p>
        <button v-on:click="final" class = "boneButton">Alright, take me to {{selectionCity}} <i class="fas fa-bone fa-spin"></i></button>
        <button v-on:click="showMap=true">Let's See the Map Again</button>
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
import {SanJose} from '@/assets/SanJose';
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
      cityName: null,
      budget: null,
      travelDate: null,
      travelMonth: null,
      travelMonthStr: null,
      cityHistoryData: {'Aukland':Aukland, 'Cabo San Lucas':Cabo, 'Cozumel':Cozumel, 'Honolulu':Honolulu, 'Madrid':Madrid, 'New York':NewYork, 'San Jose':SanJose, 'Seattle':Seattle, 'Spokane':Spokane, 'Tokyo':Tokyo, 'Venice': Venice},
      selectionCityFile: 'Seattle',
      chartsLib: null,
      showMap: true,
      historyMonth: 0,
      intMonth: {0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 6:'July', 7:'August', 8:'September', 9:'October', 10:'November', 11:'December'},
      historyDate: null,
      results: null,
      query: '5809844,5856195,3621849,3173529,3531673,3985710,2193733,5128581,5811696,1850147,3117735',
      showLoading: false,
      messages: [],
      companion:[],
      woof:'dfdf',
      lineData: [],
       mapData:[
        ['City',   'Max Temperature', 'Precipitation'],
        ['Seattle, WA',      Seattle[0]['Average High Temp.'],    Seattle[0]['Precipitation']],
        ['Honolulu, HI',     Honolulu[0]['Average High Temp.'],    Honolulu[0]['Precipitation']],
        ['San Jose, Costa Rica',    SanJose[0]['Average High Temp.'],    SanJose[0]['Precipitation']],
        ['Venice, Italy',     Venice[0]['Average High Temp.'],    Venice[0]['Precipitation']],
        ['Cozumel, Mexico',   Cozumel[0]['Average High Temp.'],    Cozumel[0]['Precipitation']],
        ['Cabo San Lucas, Mexico',     Cabo[0]['Average High Temp.'],    Cabo[0]['Precipitation']],
        ['Aukland, New Zealand',   Aukland[0]['Average High Temp.'],    Aukland[0]['Precipitation']],
        ['New York, NY',  NewYork[0]['Average High Temp.'],    NewYork[0]['Precipitation']],
        ['Spokane, WA', Spokane[0]['Average High Temp.'],    Spokane[0]['Precipitation']],
        ['Tokyo, Japan',     Tokyo[0]['Average High Temp.'],    Tokyo[0]['Precipitation']],
        ['Madrid, Spain',  Madrid[0]['Average High Temp.'],    Madrid[0]['Precipitation']]
      ],
      selectionCity:'',
      selectionTemp:0,
      dogMessage: '',
      mapOptions:{displayMode:'markers',colorAxis: {colors: ['#4374e0','#e7711c']}, backgroundColor: '#81d4fa',datalessRegionColor: '#ccffe6'},
      chartEvents: {
        'select': () => {
          const chartMap = this.$refs.gChart.chartObject;
          const selection = chartMap.getSelection();
          this.selectionCity = this.mapData[(selection[0].row+1)][0];
          this.showMap = false;
          this.selectionCityFile=this.selectionCity.split(",")[0];
          this.lineData= [
            ['Month',   'Max Temperature', 'Precipitation'],
            ['January',      this.cityHistoryData[this.selectionCityFile][0]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][0]['Precipitation']],
            ['February',     this.cityHistoryData[this.selectionCityFile][1]['Average High Temp.'],    this.cityHistoryData[this.selectionCityFile][1]['Precipitation']],
            ['March',    this.cityHistoryData[this.selectionCityFile][2]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][2]['Precipitation']],
            ['April',    this.cityHistoryData[this.selectionCityFile][3]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][3]['Precipitation']],
            ['May',   this.cityHistoryData[this.selectionCityFile][4]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][4]['Precipitation']],
            ['June',     this.cityHistoryData[this.selectionCityFile][5]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][5]['Precipitation']],
            ['July',   this.cityHistoryData[this.selectionCityFile][6]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][6]['Precipitation']],
            ['August',   this.cityHistoryData[this.selectionCityFile][7]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][7]['Precipitation']],
            ['September',  this.cityHistoryData[this.selectionCityFile][8]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][8]['Precipitation']],
            ['October',      this.cityHistoryData[this.selectionCityFile][9]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][9]['Precipitation']],
            ['November',   this.cityHistoryData[this.selectionCityFile][10]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][10]['Precipitation']],
            ['December',   this.cityHistoryData[this.selectionCityFile][11]['Average High Temp.'],     this.cityHistoryData[this.selectionCityFile][11]['Precipitation']]
            ];
            this.selectionTemp = this.cityHistoryData[this.selectionCityFile][this.travelMonth]['Average High Temp.'];
            this.travelMonthStr = this.intMonth[this.travelMonth]
        }
      }
      
    }
  },
  computed: {
    lineOptions ()  {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Line.convertOptions({
        chart: {
          title: 'Historical Weather Averages'
        },
        series: {
          0: {axis: 'Temp'},
          1: {axis: 'Precip'}
          },
          axes: {
          y: {
            Temp: {label: 'High Temp (F)'},
            Precip: {label: 'Precip (IN.)'}
          }  
          }

      })
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    },
      final: function () {
      this.$router.push('End');
      },
      refresh: function () {
        //Tried to loop through mapData w/ current temps from results.  Not working so i added them all:(
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
        var month = this.historyMonth;
        this.mapData= [
        ['City',   'Max Temperature', 'Precipitation'],
        ['Seattle, WA',      Seattle[month]['Average High Temp.'],    Seattle[month]['Precipitation']],
        ['Honolulu, HI',     Honolulu[month]['Average High Temp.'],    Honolulu[month]['Precipitation']],
        ['San Jose, Costa Rica',    SanJose[month]['Average High Temp.'],    SanJose[month]['Precipitation']],
        ['Venice, Italy',     Venice[month]['Average High Temp.'],    Venice[month]['Precipitation']],
        ['Cozumel, Mexico',   Cozumel[month]['Average High Temp.'],    Cozumel[month]['Precipitation']],
        ['Cabo San Lucas, Mexico',     Cabo[month]['Average High Temp.'],    Cabo[month]['Precipitation']],
        ['Aukland, New Zealand',   Aukland[month]['Average High Temp.'],    Aukland[month]['Precipitation']],
        ['New York, NY',  NewYork[month]['Average High Temp.'],    NewYork[month]['Precipitation']],
        ['Spokane, WA', Spokane[month]['Average High Temp.'],    Spokane[month]['Precipitation']],
        ['Tokyo, Japan',     Tokyo[month]['Average High Temp.'],    Tokyo[month]['Precipitation']],
        ['Madrid, Spain',  Madrid[month]['Average High Temp.'],    Madrid[month]['Precipitation']]
      ];

      }
},
created () {
      this.cityName = this.$ls.get('cityName');
      this.travelDate = this.$ls.get('travelDate');
      this.travelMonth = this.travelDate.split("-")[1];
      this.travelMonth = parseInt(this.travelMonth)-1;
      this.budget = this.$ls.get('travelBudget');
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
        this.lineData= [
        ['Month',   'Max Temperature', 'Precipitation'],
        [0,      Seattle[0]['Average High Temp.'],     Seattle[0]['Precipitation']],
        [1,     Seattle[1]['Average High Temp.'],    Seattle[1]['Precipitation']],
        [2,    Seattle[2]['Average High Temp.'],     Seattle[2]['Precipitation']],
        [3,    Seattle[3]['Average High Temp.'],     Seattle[3]['Precipitation']],
        [4,   Seattle[4]['Average High Temp.'],     Seattle[4]['Precipitation']],
        [5,     Seattle[5]['Average High Temp.'],     Seattle[5]['Precipitation']],
        [6,   Seattle[6]['Average High Temp.'],     Seattle[6]['Precipitation']],
        [7,   Seattle[7]['Average High Temp.'],     Seattle[7]['Precipitation']],
        [8,  Seattle[8]['Average High Temp.'],     Seattle[8]['Precipitation']],
        [9,      Seattle[9]['Average High Temp.'],     Seattle[9]['Precipitation']],
        [10,   Seattle[10]['Average High Temp.'],     Seattle[10]['Precipitation']],
        [11,   Seattle[11]['Average High Temp.'],     Seattle[11]['Precipitation']]
      ];
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
.nav {
  background-color:grey;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
}
li {
  display:inline;
  padding: 10px;
}
.router-link-exact-active {
  background-color: #00cc99;
}
.navitem {
  font-family:Helvetica, sans-serif;
  text-decoration: none;
  padding: 14px 16px;
  display: block;
  color: white;
  text-align: center;
  float: left;     
}
.navItemInactive {
  font-family:Helvetica, sans-serif;
  text-decoration: none;
  padding: 14px 16px;
  display: block;
  color: rgba(48, 48, 48, 0.986);
  text-align: center;
  float: left;     
}

.googlechart {
  max-width: 50%;
  margin-top: 15px;
  border:solid black;
  border-width: 2px;
  padding: 20px;
}
.cityInfo{
  border: solid black;
  border-width: 2px;
  padding: 20px;
  margin-top: 15px;
}
.slider {
    -webkit-appearance: none;
    width: 75px;
    height: 15px;
    border-radius: 5px;
    background: #ee785b;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ccffe6;
    cursor: pointer;
    border: solid black;
    border-width: 1px
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}
.boneButton{
  background: rgb(0, 115, 153);
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: 0;
}
</style>
