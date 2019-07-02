<template lang="html">

  <div id="quiz-answer">

    <quiz-progress :questionCounter="questionCounter + 1"/>

    <h2>{{displayAnswer()}}</h2>

    <div v-if="questionPassed">
      <span style="font-size: 150px; color: limegreen;">
      <i class="fas fa-check-circle"></i>
      </span>
    </div>

    <div v-if="!questionPassed">
        <span style="font-size: 150px; color: red;">
          <i class="fas fa-times-circle"></i>
        </span>
        <h3 :selectedTopic="selectedTopic" class="answer-text">{{correctAnswer(selectedTopic)}}</h3>
        <div v-if="selectedTopic === 'Flags Quiz'" :answerCountry="answerCountry" class="flag-answer">
          <h3 :answerCountry="answerCountry">The flag of {{answerCountry.name}} is</h3>
          <img :answerCountry="answerCountry" :src="answerCountry.flag" alt="Country flag" height=75 class="answer-flag">
        </div>
    </div>

    <div id="next-button">
      <button  v-on:click="handleNextQuestion" type="button" name="button">Next Question <i class="fas fa-arrow-circle-right"></i></button>
    </div>

  </div>

</template>

<script>
import {eventBus} from '../main.js'
import QuizProgress from './QuizProgress.vue'

export default {
  name: 'quiz-answer',
  props: ['questionPassed', 'answerCountry', 'questionCounter', 'selectedTopic'],
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
    },
    correctAnswer(topic) {
      if (topic === "Continents Quiz") {
        return `The country of ${this.answerCountry.name} is on the continent of ${this.answerCountry.region}`
      } else if (topic === 'Currencies Quiz') {
        return `The currency of ${this.answerCountry.name} is ${this.answerCountry.currencies[0].name}`
      } else if (topic === 'Capitals Quiz') {
        return `The capital of ${this.answerCountry.name} is ${this.answerCountry.capital}`
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
  border: solid 4px white;
  border-radius: 15px;
}

button {
  width: 20vw;
  padding: 0.5vw;
  border: none;
  border-radius: 10px;
  background-color: #6b93d6;
  font-size: 30px;
  border: solid 2px #6b93d6;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  margin-top: 1vw
}

button:hover {
  border: solid 2px white;
}

.flag-answer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.answer-flag {
    margin-left: 1.5vw;
}

.answer-text {
  margin-bottom: 1vw;
}

</style>
