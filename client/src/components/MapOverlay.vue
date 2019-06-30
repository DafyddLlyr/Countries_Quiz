<template lang="html">

  <div id="map-overlay">
    <div id='topic-container' v-if="!selectedTopic">
      <quiz-topic topic="Capitals Quiz"/>
      <quiz-topic topic="Flags Quiz"/>
      <quiz-topic topic="Currency Quiz"/>
      <quiz-topic topic="Continents Quiz"/>
    </div>
    <div id='quiz-container' v-if="selectedTopic">
      <quiz-question v-if="(!answerSelected && questionCounter < 5)" :selectedTopic="selectedTopic" :user='user'/>
      <quiz-answer v-if="(answerSelected && questionCounter < 5)" :questionPassed="questionPassed" :answerCountry="answerCountry" :questionCounter="questionCounter"/>
      <quiz-complete v-if="quizCompleted" />
    </div>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
import QuizTopic from './QuizTopic.vue'
import QuizQuestion from './QuizQuestion.vue'
import QuizAnswer from './QuizAnswer.vue'
import QuizComplete from './QuizComplete.vue'

export default {
  name: 'map-overlay',
  props: ['user'],
  data() {
    return {
      'selectedTopic': null,
      'answerSelected': false,
      'questionPassed': null,
      'answerCountry': null,
      'questionCounter': 0,
      'quizCompleted': false
    }
  },
  components: {
    'quiz-topic': QuizTopic,
    'quiz-question': QuizQuestion,
    'quiz-answer': QuizAnswer,
    'quiz-complete': QuizComplete
  },
  mounted(){
    eventBus.$on('selected-topic', (topic) => {
      this.selectedTopic = topic
    })
    eventBus.$on('show-topics', () => {
      this.selectedTopic = null
    })
    eventBus.$on('answer-selected', result => {
      this.answerSelected = true;
      this.questionPassed = result["userAnswer"];
      this.answerCountry = result["country"]
    })
    eventBus.$on('increment-counter', () => {
      this.questionCounter += 1;
      this.answerSelected = false;
    })
    eventBus.$on('quiz-ended', () => {
      this.questionCounter += 1;
      this.quizCompleted = true;
    })
    eventBus.$on('quiz-reset', () => {
      this.selectedTopic = null;
      this.answerSelected = false;
      this.questionPassed = null;
      this.answerCountry = null;
      this.questionCounter = 0;
      this.quizCompleted = false;
    })
  }

}
</script>

<style lang="css" scoped>

#map-overlay {
  background: lightgrey;
  grid-area: map-overlay;
}

#topic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#quiz-container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
