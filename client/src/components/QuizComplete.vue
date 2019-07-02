<template lang="html">

  <div id="quiz-complete">

    <h2>Quiz Complete!</h2>
    <h3 :correctAnswerCounter="correctAnswerCounter">You got {{correctAnswerCounter}} out of 5!</h3>
    <div id="quiz-again">
      <button v-on:click="handleQuizComplete" type="button" name="button">Quiz again!</button>
    </div>

  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'quiz-complete',
  props: ['correctAnswerCounter'],
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
  background-color: rgba(255, 255, 255, 0.75);
  color: black;
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 30px;
}

</style>
