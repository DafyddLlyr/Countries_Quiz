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
}

</style>
