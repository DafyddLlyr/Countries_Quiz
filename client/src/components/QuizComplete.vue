<template lang="html">

  <div id="quiz-complete">

    <h2>Quiz Complete!</h2>
    <h3 :correctAnswerCounter="correctAnswerCounter">You got {{correctAnswerCounter}} out of 5!</h3>
    <div id="quiz-again">
      <button v-on:click="handleQuizComplete" type="button" name="button">Quiz again! <i class="fas fa-award"></i></button>
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
  justify-content: space-around;
  font-size: 30px;
  border: solid 4px white;
  border-radius: 15px;
}

button {
  background-color: #9fc164;
  font-size: 30px;
  border: none;
  border-radius: 10px;
  width: 15vw;
  border: solid 2px #9fc164;
  cursor: pointer;
  height: 4vw;
  color: white;
  font-weight: bolder;
}

button:hover {
  border: solid 2px white;
}


</style>
