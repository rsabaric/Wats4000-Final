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
    <img v-bind:src="companion[0].link" class="thumbnail">Woof Woof!  I'll be your travelling companion!</img>
    <favorite-cities v-bind:favoriteCities="favorites" v-bind:homeCity="home" v-on:added-Home="newHome"></favorite-cities>
      <div class="home">
    <div v-show="showForm" class="form-container">
      <h1>Enter your information</h1>
      <p v-show="showError" class="error"> Please complete the form  </p>
      <form v-on:submit.prevent="validateForm">
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
        <p><label>When do you want to travel?:
          <input type="date" v-model="traveldate">
        </label></p>
        <p class="privacy"><label>I am ready to see my destinations!
        </label><button class="button"><input type="submit" value="Let's Go"></button></p>
      </form>
    </div>
  </div>
    
    <ul class="cities" v-if="home">
      <li class="home">
        <h2>Home:</h2>
        <h2>{{ home.name }}, {{ home.sys.country }}</h2>
        <p><router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: home.id } }">View Current Weather</router-link></p>
      </li>
    </ul>
    <h2>City Search</h2>
    <message-container v-bind:messages="messages"></message-container>
    <form v-on:submit.prevent="getCities">
        <p>Enter city name: <input type="text" v-model="query" placeholder="Paris, TX"> <button type="submit">Go</button></p>
    </form>
    <load-spinner v-if="showLoading"></load-spinner>
    <ul class="cities" v-if="results && results.list.length > 0">
      <li v-for="city in results.list">
        <h2>{{ city.name }}, {{ city.sys.country }}</h2>
        <p><router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: city.id } }">View Current Weather</router-link></p>

        <weather-summary v-bind:weatherData="city.weather"></weather-summary>

        <weather-data v-bind:weatherData="city.main"></weather-data>
        <p><button class="save" v-on:click="saveCity(city)">Save City to Favorites</button></p>
        <p><button class="save" v-on:click="addHome(city); saveCity(city)">Set City as Home</button></p>
      </li>
    </ul>

  </div>
</template>

<script>
import {API} from '@/common/api';
import WeatherSummary from '@/components/WeatherSummary';
import WeatherData from '@/components/WeatherData';
import CubeSpinner from '@/components/CubeSpinner';
import MessageContainer from '@/components/MessageContainer';
import FavoriteCities from '@/components/FavoriteCities';


export default {
  name: 'CitySearch',
  components: {
    'weather-summary': WeatherSummary,
    'weather-data': WeatherData,
    'load-spinner': CubeSpinner,
    'message-container': MessageContainer,
    'favorite-cities' : FavoriteCities
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
      traveldate:0
    }
  },
  created () {
    if (this.$ls.get('favoriteCities')) {
      this.favorites = this.$ls.get('favoriteCities');
      this.home = this.$ls.get('homeCity');
    }
    if (this.$ls.get('selectedDog')) {
      this.companion = this.$ls.get('selectedDog');
    }
  },
  methods: {
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
      if((this.username !='') && (this.email !='') && (this.checked==="yes") && (this.traveldate!=0)){
        console.log('form is valid');
        this.showForm = false;;
        console.log(this.username);
      } else {
        console.log('form is not valid');
        this.showError = true;
      }
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

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 500px;
  min-height: 500px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  margin: 5px;
}
a {
  color: #42b983;
}
.home{
  display: inline-block;
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

</style>


