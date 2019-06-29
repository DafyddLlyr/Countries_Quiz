<template lang="html">



</template>

<script>

export default {
  name: 'landing-page',
  data() {
    return {
      user: null,
      users: []
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
    }
  }



}



</script>

<style lang="css" scoped>
</style>
