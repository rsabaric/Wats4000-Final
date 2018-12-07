<template>
  <div>
   <ul class="nav">
   <li>
    <router-link to=/ active class="navitem" exact>Step 1: Pick a Canine Companion</router-link>
   </li>
   <li>
    <router-link to=/CitySearch active class="navitem" exact>Step 2: Your Info</router-link>
   </li>
   <li class = "navItemInactive">
    Step 3: Your Results
   </li>
   <li class = "navItemInactive">
    Step 4: Finished!
   </li>
   </ul>
    <img v-bind:src="companion[0].link" class="thumbnail">Woof Woof!  I'll be your travelling companion!</img>
      <div class="home">
    <div v-show="showForm" class="form-container">
      <h1>Enter your information</h1>
      <p v-show="showError" class="error"> Please complete the form  </p>
      <form>
        <p>
          <button v-on:click="AutoInfo">Nah, just fill it in for me please!</button>
        </p>
        <p><label>Your Name:
          <input type="text" id="username" v-model="username" placeholder="Enter username here.">
        </label></p>
        <p><label>Your Email:
          <input type="email" id="email" v-model="email" placeholder="yours@example.com">
        </label></p>
        <p><label>What is your travel budget?:
          <input type="radio" id="$100" value="100"  v-model="budget">
          <label for="$100">$1-$100</label>
          <input type="radio" id="$1000" value="1000"  v-model="budget">
          <label for="$1000">$101-$1000</label>
          <input type="radio" id="$10000" value="10000"  v-model="budget">
          <label for="$10000">$1001-$10000</label>
        </label></p>
        <p><label>When do you want to travel?
          <input type="date" v-model="traveldate">
        </label></p>
        <message-container v-bind:messages="messages"></message-container>
        <p>Enter city name: <input type="text" v-on:change="getCities" v-model="query" placeholder="Enter Your City"> <button v-on:click="getCities">Go</button><span v-if="showLoading"> (press again if long loading)</span></p>
        </form>
    <p v-if="results && results.count>1 && results.list.length==1">There is more than one {{query}} <button v-on:click="getCities">See More {{query}}'s</button></p>
    <p v-if="results && results.count>1 && results.list.length>1">There is more than one {{query}}, choose from the map below by selecting the marker:</p>
    <p v-if="results && results.list.length>1 && selectedCity"> you have selected {{query}} #{{selectedCityIndex+1}}</p>
    <GmapMap v-if="results && results.list.length > 0"
  :center="{lat:40, lng:-100}"
  :zoom="3"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker v-for="(marker, index) in results.list"
    :key="index"
    :position="{lat: marker.coord.lat, lng:marker.coord.lon}"
    :clickable="true"
    :draggable="true"
    :label="(index+1).toString()"
    @click="clicked({lat: marker.coord.lat, lng:marker.coord.lon}, index)"
  />
</GmapMap>
    <ul class="cities" v-if="results && selectedCity && results.list.length  > 0">
      <li>
        <h2>{{ selectedCity.name }}, {{ selectedCity.sys.country }}</h2>
        <weather-summary v-bind:weatherData="selectedCity.weather"></weather-summary>
        <weather-data v-bind:weatherData="selectedCity.main"></weather-data>
      </li>
    </ul>
    <load-spinner v-if="showLoading"></load-spinner>
        <p class="privacy"><label>I am ready to see my destinations!
        </label><button v-on:click="$router.push('Map')">Let's Go!</button></p>
    </div>
  </div>


  </div>
</template>

<script>
import {API} from '@/common/api';
import WeatherSummary from '@/components/WeatherSummary';
import WeatherData from '@/components/WeatherData';
import CubeSpinner from '@/components/CubeSpinner';
import MessageContainer from '@/components/MessageContainer';


export default {
  name: 'CitySearch',
  components: {
    'weather-summary': WeatherSummary,
    'weather-data': WeatherData,
    'load-spinner': CubeSpinner,
    'message-container': MessageContainer
  },
  data () {
    return {
      results: null,
      query: '',
      showLoading: false,
      messages: [],
      favorites: [],
      home:'',
      username: '',
      email: '',
      showForm: true,
      showError: false,
      checked: false,
      companion:[],
      budget:0,
      traveldate:0,
      coordinates: {},
      selectedCityIndex:0,
      selectedCity: null
    }
  },
  created () {
    if (this.$ls.get('selectedDog')) {
      this.companion = this.$ls.get('selectedDog');
    }

  },
  methods: {
    AutoInfo: function () {
      this.username=this.companion[0].dog;
      this.email=`${this.companion[0].dog}@dog.com`;
      this.budget=100;
      this.traveldate="2019-01-01";
    },
    saveCity: function (city) {
      this.favorites.push(city);
      this.$ls.set('favoriteCities', this.favorites);

    },
    addHome: function (city) {
    this.home = city;
    this.$ls.set('homeCity', this.home);
    console.log('added home');
    },
    newHome: function (city) {
    this.home = this.$ls.get('homeCity');
    console.log('new home added');
    },
    getCities: function () {
      this.results = null;
      this.showLoading = true;

      let cacheLabel = `citySearch_${this.query}`;
      let cacheExpiry = 15*60*1000;
      if(!this.$ls.get(cacheLabel)){
        console.log(`no cache detected for ${cacheLabel}`);
        API.get('find', {
          params: {
              q: this.query
          }
        })
        .then(response => {
          this.results = response.data;
          this.showLoading = false;
          this.$ls.set(cacheLabel, this.results, cacheExpiry);
          this.coordinates={lat: this.results.list[0].coord.lat, lng:this.results.list[0].coord.lon};
          if(this.results.list.length=1) {
          this.selectedCity=this.results.list[0];
        }
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
    },
    validateForm: function () {
      if((this.username !='') && (this.email !='') && (this.traveldate!=0) && (this.selectedCity)){
        console.log('form is valid');
        //this.showForm = false;;
        //console.log(this.username);
      } else {
        console.log('form is not valid');
        this.showError = true;
      }
    },
    clicked: function (locate, cityiden) {
      this.selectedCityIndex=cityiden;
      this.selectedCity = this.results.list[cityiden];
      console.log(this.selectedCity);
    }
  }
}
</script>

<style scoped>
.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.home{
  width: 800px;
  min-height: 100px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  margin: 5px;
}
.error {
  border: 1px solid #aa0000;
  padding: 1rem;
  color: #aa0000;
}
.privacy {
  border: 1px solid black;
  padding: .5rem;
  display: inline-block;
}
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
</style>


