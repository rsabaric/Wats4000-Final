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
   <li>
    <router-link to=/End active class="navitem" exact>Step 3: Your Results</router-link>
   </li>
   </ul>
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