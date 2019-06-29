<template>
  <div id="app">

    <landing-page v-if="!user"/>

  </div>
</template>

<script>

import LandingPage from './components/LandingPage.vue'
import {eventBus} from './main.js'

export default {
  name: 'app',
  data(){
    return {
      'user': null
    }
  },
  components: {
    'landing-page': LandingPage
  },
  mounted(){
    eventBus.$on('selected-user', (user) => {
      this.user = user
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
