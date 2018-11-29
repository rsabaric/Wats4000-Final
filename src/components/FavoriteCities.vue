<template>
    <ul class="favorite-cities">
        <li><h2>Home City</h2></li>
        <li v-if="!homeCity">No Home City Set</li>
        <li>{{homeCity.name}}</li>
        <li><h2>Favorite Cities</h2></li>
        <li v-if="favoriteCities.length < 1">No favorites cities to display.</li>
        <li v-for="city in favoriteCities">
          <router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: city.id } }">{{ city.name }}</router-link> <button v-on:click="removeCity(city)" class="remove">Remove</button><button v-on:click="addHome(city); $emit('added-Home')" class="home">Set as Home</button>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'FavoriteCities',
  data () {
    return {}
  },
  props: {
    favoriteCities: Array,
    homeCity: Object
  },
  methods: {
    removeCity: function (city) {
      let cityIndex=this.favoriteCities.indexOf(city);
      this.favoriteCities.splice(cityIndex, 1);
      this.$ls.set('favoriteCities', this.favoriteCities);
    },
    addHome: function (city) {
    this.homeCity = city;
    this.$ls.set('homeCity', this.homeCity);
    console.log('ddd');
    }
  }
}
</script>

<style scoped>
.favorite-cities {
  list-style-type: none;
  padding: 10px;
  background: #ccc;
  width: 25%;
  float: right;
}
.remove {
  font-size: 0.8rem;
  color: white;
  background: #AA0000;
  padding: 2px;
  cursor: pointer;
}
.home {
  font-size: 0.8rem;
  color: rgb(8, 3, 66);
  background: rgb(89, 165, 201);
  padding: 2px;
  cursor: pointer;
}
</style>