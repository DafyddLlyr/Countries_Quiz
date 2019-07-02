<template lang="html">

  <div id="landing-page">
    <h1>Welcome to the Countries Quiz!!!</h1>
    <select  v-model="user"  class="" name="">
      <option value="" disabled>Please select user:</option>
      <option v-for="user in users" :value="user">{{user.name}}</option>
    </select>
    <div>
    <button v-on:click="handleSelectUser" type="button" name="button">Log On</button>
  </div>

  <h2>Add New User</h2>
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name" required/>
    <button v-on:click="handleAddUser" value="save" type="button" name="button">Log On</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
import UserService from '@/services/UserService.js'


export default {
  name: 'landing-page',
  data() {
    return {
      user: "",
      users: null,
      addUser: "",
      name: "",
      newUser: null
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
    },
    handleAddUser() {
    const payload = {
      name: this.name,
      capitalsQuiz: [],
      flagsQuiz: [],
      currenciesQuiz: [],
      continentsQuiz: []
    }
    UserService.postUser(payload)
    .then(() => fetch('http://localhost:3000/api/users/'))
    .then( res => res.json())
    .then( users => users.filter(user => user.name === this.name))
    .then( user => this.user = user[0])
    .then( () => this.handleSelectUser())
    }
  }
  }







</script>

<style lang="css" scoped>

#landing-page {
  background-color: red;
  height: 100vh;
}

</style>
