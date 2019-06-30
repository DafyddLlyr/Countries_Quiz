<template lang="html">
  <div id="nav-bar">
    <h3>Hello, {{user.name}}!</h3>
    <button v-on:click="handleShowTopics" type="button" name="button">Select Quiz</button>
    <br>
    <button v-on:click="handleShowGlobe" type="button" name="button">Globe</button>
    <br>
    <label for="country">Pick a country to explore:</label>
    <select v-model="countryChoice" name="country" @change="handleCountryChoice">
      <option value="" disabled>Please select a country:</option>
      <option v-for="(country, index) in countryData" :country="country" :key="index" :value="country">{{country.name}}</option>
    </select>
    <br>
    <button v-on:click="handleLogOut" type="button" name="button">Log out</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'nav-bar',
  data(){
    return {
      'countryData': [],
      'countryChoice': {}
    }
  },
  props: ['user'],
  mounted(){
    this.fetchCountryData()
  },
  methods: {
    handleLogOut(){
      eventBus.$emit('log-out')
    },
    handleShowTopics(){
      eventBus.$emit('show-topics')
    },
    handleCountryChoice(){
      eventBus.$emit('country-choice', this.countryChoice)
    },
    handleShowGlobe(){
      eventBus.$emit('globe-selected')
    },
    fetchCountryData(){
      fetch('https://restcountries.eu/rest/v2/all')
      .then( res => res.json())
      .then( result => this.countryData = result)
    },
  }
}

</script>

<style lang="css" scoped>

#nav-bar {
  background: blue;
  color: white;
  grid-area: nav-bar;
  height: 90vh;
}

</style>
