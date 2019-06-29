<template lang="html">

  <div id="quiz-topic">
    <h2>{{topic}}</h2>

  </div>

</template>

<script>
export default {
  name: 'quiz-topic',
  props: ['topic']
}
</script>

<style lang="css" scoped>

#quiz-topic {
  width: 30vw;
  height: 20vh;
  background-color: pink;
  margin: 5vw;
}

</style>
