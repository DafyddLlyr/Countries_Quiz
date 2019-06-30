<template lang="html">

  <div id="quiz-answer">
    <h2>{{displayAnswer()}}</h2>
    <button v-on:click="handleNextQuestion" type="button" name="button">Next Question</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: 'quiz-answer',
  props: ['questionPassed', 'answerCountry', 'questionCounter'],
  methods: {
    displayAnswer() {
      if (this.questionPassed) {
        return "That's right!"
      } else {
        return "That's incorrect :("
      }
    },
    handleNextQuestion() {
      if (this.questionCounter === 4) {
        eventBus.$emit('quiz-ended')
      } else {
        eventBus.$emit('increment-counter')
      }
    }
  }
}
</script>

<style lang="css" scoped>

#quiz-answer {
  width: 70vw;
  min-height: 60vh;
  padding: 2vw;
  background-color: yellow;
  color: black;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

</style>
