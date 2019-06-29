<template lang="html">

  <div id="quiz-question">
    <h2>{{selectedTopic}}</h2>
  </div>

</template>

<script>

export default {
  name: 'quiz-question',
  props: ['selectedTopic']
}
</script>

<style lang="css" scoped>

#quiz-question {
  width: 70vw;
  height: 60vh;
  background-color: purple;
  color: white;
}

</style>
