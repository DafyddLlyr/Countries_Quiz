<template lang="html">
  <div id="nav-bar">
    <div id="nav-bar-info">
      <h3>Hello, {{user.name}}!</h3>
      <button v-on:click="handleShowTopics" type="button" name="button">Select Quiz</button>
      <br>
      <button v-on:click="handleShowGlobe" type="button" name="button">Globe</button>
      <br>
      <label for="country"><h3>Pick a country to explore:</h3></label>
      <select v-model="countryChoice" name="country" @change="handleCountryChoice" id="select">
        <option value="" disabled>Please select a country:</option>
        <option v-for="(country, index) in countryData" :country="country" :key="index" :value="country">{{country.name}}</option>
      </select>
      <br>
    </div>
      <div id="country-info" v-if="countryChoice" v-model="countryChoice">
        <table>
          <tr>
            <th>{{countryChoice.name}}</th>
            <th><img :src="countryChoice.flag" :alt="countryChoice.name" width=100></th>
          </tr>
          <tr>
            <td>Continent: </td>
            <td>{{countryChoice.region}}</td>
          </tr>
          <tr>
            <td>Capital: </td>
            <td>{{countryChoice.capital}}</td>
          </tr>
          <tr>
            <td>Currency: </td>
            <td>{{countryChoice.currencies[0].name}}</td>
          </tr>
          <tr>
            <td>Population: </td>
            <td>{{countryChoice.population.toLocaleString()}}</td>
          </tr>
        </table>
      </div>
    <br>
    <button id="log-out" v-on:click="handleLogOut" type="button" name="button">Log out</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'nav-bar',
  data(){
    return {
      'countryData': [],
      'countryChoice': null
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#select {
  width: 15vw;
  font-size: inherit;
}

#nav-bar-info {
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#country-info {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

table {
  text-align: center;
  background: grey;
}

th {
  text-align: center;
  border-style: solid;
  border-width: thin;
  border-color: #c0c0c0;
}

td {
  text-align: center;
  border-style: solid;
  border-width: thin;
  border-color: #c0c0c0;
}

#log-out {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
}

</style>
