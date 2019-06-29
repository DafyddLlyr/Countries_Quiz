<template lang="html">

  <div id="landing-page">
    <select  v-model="user"  class="" name="">
      <option value="" disabled>Please select user:</option>
      <option v-for="user in users" :value="user">{{user.name}}</option>
    </select>
  </div>

</template>

<script>

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
    selectUser() {

    }
  }



}



</script>

<style lang="css" scoped>
</style>
