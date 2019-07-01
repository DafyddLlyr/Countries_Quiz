<template lang="html">

  <div id="landing-page">
    <h1>Welcome to the Countries Quiz!!!</h1>
    <select  v-model="user"  class="" name="">
      <option value="" disabled>Please select user:</option>
      <option v-for="user in users" :value="user">{{user.name}}</option>
    </select>
    <button v-on:click="handleSelectUser" type="button" name="button">Log On</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'landing-page',
  data() {
    return {
      user: "",
      users: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      fetch('http://localhost:3000/api/users/')
      .then( res => res.json())
      .then( users => this.users = users)
    },
    handleSelectUser() {
      eventBus.$emit('selected-user', this.user)
    }
  }



}



</script>

<style lang="css" scoped>

#landing-page {
  background-color: red;
  height: 100vh;
}

h1 {
  color: red;
  font-size: 50px;
  background-color: lightgreen;
  text-decoration-style: double;
  text-shadow: 0 2px white, 0 3px #777;
  font-family: 'Orienta', sans-serif;
  font-style: italic;
  letter-spacing: 1px;
  box-shadow:
		inset 0 0 0 1px rgba(53,86,129, 0.4),
		inset 0 0 5px rgba(53,86,129, 0.5),
		inset -285px 0 35px lightblue;

}
 select {
  font-size: 30px;
  background-color: lightpink;
  text-shadow: 0 2px red, 0 3px #777;
  margin-left: 10px;
  padding-left: 2px;
  left: 10px;
  border: 2px solid black;

}



button {
  font-size: 30px;
  background-color: lightpink;
  text-shadow: 0 2px red, 0 3px #777;
  text-align: left;
  margin-left: 10px;
  padding-left: 2px;
  border: 2px solid black;
  
}

button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>
