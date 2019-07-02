<template lang="html">
  <div id="nav-bar">
    <div id="nav-bar-info">
      <h3>Hello, {{user.name}}!</h3>
      <br>
      <button v-on:click="handleShowTopics" type="button" name="button">Select Quiz</button>
      <br>
      <button v-on:click="handleShowGlobe" type="button" name="button">Globe</button>
      <br>
      <button type="button" name="button" v-on:click="handleUserProfile">Profile</button>
      <br>
      <label for="country"><h3>Pick a country to explore:</h3></label>
      <br>

      <select v-model="countryChoice" @change="handleCountryChoice" id="select">
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
          <th>Continent: </th>
          <td>{{countryChoice.region}}</td>
        </tr>
        <tr>
          <th>Capital: </th>
          <td>{{countryChoice.capital}}</td>
        </tr>
        <tr>
          <th>Currency: </th>
          <td>{{countryChoice.currencies[0].name}}</td>
        </tr>
        <tr>
          <th>Population: </th>
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
      'countryChoice': ''
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
      this.countryChoice = null;
      eventBus.$emit('show-topics')
    },
    handleCountryChoice(){
      eventBus.$emit('country-choice', this.countryChoice)
    },
    handleShowGlobe(){
      this.countryChoice = null;
      eventBus.$emit('globe-selected')
    },
    fetchCountryData(){
      fetch('https://restcountries.eu/rest/v2/all')
      .then( res => res.json())
      .then( result => this.countryData = result)
    },
    handleUserProfile() {
      this.countryChoice = null;
      eventBus.$emit('profile-selected')
    }
  }
}

</script>

<style lang="css" scoped>

#nav-bar {
  font-size: 20px;
  background: #6b93d6;
  color: white;
  grid-area: nav-bar;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#nav-bar-info {
  /* height: 30vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vw
}

#country-info {
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

table {
  text-align: center;
  background: none;
  width: 18vw;
  border-spacing: 0.8vw;
}

th {
  text-align: center;
  width: 9vw;
  /* border-style: solid;
  border-width: thin;
  border-color: #c0c0c0; */
}

td {
  text-align: center;
  width: 9vw;
  /* border-style: solid;
  border-width: thin;
  border-color: #c0c0c0; */
}

button {
  background-color: #9fc164;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  width: 15vw;
  border: solid 2px #9fc164;
  cursor: pointer;
  height: 2vw;
  color: white;
  font-weight: bolder;
}

select {
  height: 2vw;
  width: 15vw;
  font-size: 15px;
}

button:hover {
  border: solid 2px white;
}

#log-out{
  margin-bottom: 1vw
}

</style>
