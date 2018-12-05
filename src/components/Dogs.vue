<template>
  <div>
   <ul class="nav">
   <li>
    <router-link to=/ active class="navitem" exact>Step 1: Pick a Canine Companion</router-link>
   </li>
   <li class = "navItemInactive">
    Step 2: Your Info
   </li>
   <li class = "navItemInactive">
    Step 3: Your Results
   </li>
   <li class = "navItemInactive">
    Step 4: Finished!
   </li>
   </ul>
   <h2>Thanks for visiting the Woofing Wanderer!</h2>
   <h3>We provide travel guidance for you and your pup, so you and your canine companion can have an adventure to remember together.</h3>
   <h4>Please select your canine companion from the following list.  Your companion will guide you through this application.</h4>
        <label for="petChooser">Pick a dog breed for your companion:</label>
    <select v-model="dogSelection" v-on:change="results=null">
      <option disabled value="">Please select one</option>
      <option v-for="(value, key) in posts.message" v-bind:value="key">{{ key }}</option>
    </select>
    <form v-if="dogSelection" v-on:submit.prevent="getDog">
      <p><button type="submit">Browse the {{dogSelection }}s</button></p>
    </form>
    <ul v-if="errors.length>0" class="errors">
      <li v-for="error in errors">
      {{ error.message }}
      </li>
    </ul>
    <ul v-if="results" class="photobox">
      <p v-if="dogUrls">keep clicking for more {{dogSelection}} photos</p>
      <transition-group name="fade" tag="div" appear>
      <img v-bind:src="dogPic" class="dogImg" v-on:click="getDog" v-bind:key="dogPic">
      </transition-group>
        <ul class = "likebar">          
          <button v-on:click="selectDog">Select Dog <i class="fas fa-bone fa-spin"></i></button>
        </ul>
    </ul>
    <div v-if="likelist.length>0" class = "liked">
      <p style="text-align:center;">My Favorite Dogs:</p>
      <transition-group name="slideRight" tag="div" appear>
      <ul v-for="item in likelist" class="likeHistory" v-bind:key="likelist.indexOf(item)">
        <li class="likeHistoryelement">
          <a v-bind:href="item.link" target="_blank"> <img v-bind:src="item.link" class="thumbnail">{{item.dog}} </a>
          <span v-if="item.comment">"{{item.comment}}"</span><button v-on:click="removeWord(item)" class="remove-word">[remove dog] </button>
        </li>
      </ul>
        </transition-group>
    </div>
    <div v-if="companion.length>0" class = "liked">
      <p style="text-align:center;">My Canine Companion:</p>
      <transition-group name="slideRight" tag="div" appear>
      <ul v-for="item in companion" class="likeHistory" v-bind:key="companion.indexOf(item)">
        <li class="likeHistoryelement">
          <a v-bind:href="item.link" target="_blank"> <img v-bind:src="item.link" class="thumbnail">{{item.dog}} </a>
          <span v-if="item.comment">"{{item.comment}}"</span>
        </li>
      </ul>
        </transition-group>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import CubeSpinner from '@/components/CubeSpinner';
import BoneSpinner from '@/components/DogBoneSpin';
import BoneRotater from '@/components/DogBoneRotate';
require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'Dogs',
  components: {
  bonerotate: BoneRotater,
  bonespin: BoneSpinner
  },
  data () {
    return {
      results: null,
      errors: [],
      phrase: '',
      rhyme: '',
      posts: null,
      dogSelection: null,
      dogUrls:'',
      dogPic:'',
      photoIndex: 0,
      likelist:[],
      dogComment:'',
      showSpin:false,
      companion:[]
    }
  },
  created () {
      this.companion = this.$ls.get('selectedDog');
  },
methods: {

  getDog: function(){
    axios.get('https://dog.ceo/api/breed/'+this.dogSelection+'/images')
    .then(response => {
      this.results = response.data;
      this.dogUrls = response.data.message;
      this.photoIndex = Math.floor(Math.random()*this.dogUrls.length);
      this.dogPic = this.dogUrls[this.photoIndex];


    })
    .catch(error => {
      this.errors.push(error);
    });
  },
    removeWord: function (word) {
    this.likelist.splice(this.likelist.indexOf(word), 1);
    console.log(word);
      let message = {
        type: 'success',
        text: `${word} removed from the word list.`
      };

  },
    selectDog: function () {
    this.companion=([{dog: this.dogSelection,link:this.dogPic, comment:this.dogComment}]); 
    this.$ls.set('selectedDog', this.companion);
    this.dogComment='';
    this.$router.push('CitySearch');

  }
},
created () {
    axios.get(`https://dog.ceo/api/breeds/list/all`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}

ul.results {
  list-style-type: none;
  padding: 0;
}

.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}

a {
  color: #42b983;
}
.photobox{
  height: auto;
  max-width:80%;
  border: 1px solid black;
  margin: 12px;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
  padding-right: 15px;
}
.dogImg {
    max-width: 75%;
    cursor: pointer;
    display: inline-block;
    padding: 1rem;
    height: auto;
}
.likeHistory {
  display: block;
}
.likeHistoryelement{
  display: inline-block;
}
.liked {
  height: auto;
  max-width: 80%;
  border: 1px solid black;
  margin: 10px;
  display:table;
  padding:10px;
}
.likebar {
  padding: 10px;
  position: absolute;
  bottom: 15px;
  display: contents;
  max-width: 75%;
  padding: 15px;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: 0;
}
button.add-word {
  background: #e8e8e8;
  color: #333;
  font-size: 0.8rem;
}
button.add-word:hover {
  background: #fde300;
}
button.remove-word {
  font-size: 1.0rem;
  padding: 2px;
  display: inline-block;
  color: #333;
  background: none;
}
button.remove-word:hover {
  background: #aa0000;
  color: #fde300;
}
.thumbnail {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 50px;
}
.bonespin{
  margin: 150px;
}
.badbonespinners{
  padding: 20px;
  margin: 20px;
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
