<template lang="html">

  <div id="quiz-answer">

    <quiz-progress :questionCounter="questionCounter + 1"/>

    <h2>{{displayAnswer()}}</h2>

    <div id="next-button">
      <button  v-on:click="handleNextQuestion" type="button" name="button">Next Question</button>
    </div>

  </div>


</template>

<script>
import {eventBus} from '../main.js'
import QuizProgress from './QuizProgress.vue'

export default {
  name: 'quiz-answer',
  props: ['questionPassed', 'answerCountry', 'questionCounter'],
  components: {
    'quiz-progress': QuizProgress
  },
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
  background-color: rgba(255, 255, 255, 0.75);
  color: black;
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 30px;
}



</style>
