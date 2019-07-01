<template lang="html">
  <div id="quiz-complete">
    <h2>Quiz Complete!</h2>
    <button v-on:click="handleQuizComplete" type="button" name="button">Quiz again!</button>
  </div>
</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'quiz-complete',
  methods: {
    handleQuizComplete() {
      eventBus.$emit('quiz-reset')
    }
  }
}
</script>

<style lang="css" scoped>

#quiz-complete {
  width: 70vw;
  min-height: 60vh;
  padding: 2vw;
  background-color: lightblue;
  color: black;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

</style>
