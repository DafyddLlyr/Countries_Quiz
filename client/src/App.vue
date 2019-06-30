<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width,initial-scale=1.0">
   <link rel="icon" href="<%= BASE_URL %>favicon.ico">
   <title>client</title>
 </head>
 <body>
   <noscript>
     <strong>We're sorry but client doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
   </noscript>
   <div id="app"></div>
   <!-- built files will be auto injected -->
 </body>
</html>
That's actually index! ^^^^^
App -
<template>
 <div id="app">
   <landing-page v-if="!user"/>

   <div id="profile-container" v-if="user">
     <profile-header/>
     <nav-bar :user='user'/>
     <map-overlay :user='user'/>
   </div>


 </div>
</template>

<script>
import {eventBus} from './main.js'

import LandingPage from './components/LandingPage.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import NavBar from './components/NavBar.vue'
import MapOverlay from './components/MapOverlay.vue'

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
   'nav-bar': NavBar,
   'map-overlay': MapOverlay
 },
 mounted(){
   eventBus.$on('selected-user', (user) => {
     this.user = user
   })
   eventBus.$on('log-out', () => this.user = null)
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
   'nav-bar map-overlay'

}
</style>
