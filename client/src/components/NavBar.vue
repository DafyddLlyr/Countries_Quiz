<template lang="html">
  <div id="nav-bar">
    <h3>Hello, {{user.name}}!</h3>
  </div>

</template>

<script>

export default {
  name: 'nav-bar',
  props: ['user']
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
