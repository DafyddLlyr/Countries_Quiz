<template lang="html">
  <div id="nav-bar">
    <h3>Hello, {{user.name}}!</h3>
    <button v-on:click="handleLogOut" type="button" name="button">Log out</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'nav-bar',
  props: ['user'],
  methods: {
    handleLogOut(){
      eventBus.$emit('log-out')
    }
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
