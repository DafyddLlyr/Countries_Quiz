<template>
  <div id="app">
    <landing-page v-if="!user"/>

    <div id="profile-container" v-if="user">
      <profile-header/>
      <nav-bar :user='user'/>
    </div>


  </div>
</template>

<script>
import {eventBus} from './main.js'

import LandingPage from './components/LandingPage.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  data(){
    return {
      'user': null
    }
  },
  components: {
    'landing-page': LandingPage,
    'profile-header': ProfileHeader,
    'nav-bar': NavBar
  },
  mounted(){
    eventBus.$on('selected-user', (user) => {
      this.user = user
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#profile-container {
  display: grid;
  grid-template-rows: 10vh;
  grid-template-columns: 20vw auto;
  grid-template-areas:
    'header header'
    'nav-bar main'
}
</style>
