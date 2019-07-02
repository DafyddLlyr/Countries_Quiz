<template lang="html">


  <div id="quiz-question">
    <quiz-progress :questionCounter="questionCounter"/>
    <!-- <h2>{{selectedTopic}}</h2> -->
    <h3 v-if="answerCountry">{{displayQuestion(apiTopicName)}}</h3>

    <div id="answer-boxes" >

      <div class="answer-container" v-for="answer in answerArray"
      v-if="apiTopicName === 'flag'">
        <img :src="answer" alt="flag" class="flag-display" v-on:click="handleSelectAnswer(answer)" />
      </div>

      <p class="answer-display" v-for="answer in answerArray"  v-if="apiTopicName === 'currencies'"
      v-on:click="handleSelectAnswer(answer)">
      {{answer[0].name}} </p>

      <p class="answer-display" v-for="answer in answerArray"  v-if="apiTopicName !== 'flag' && apiTopicName !== 'currencies'"
      v-on:click="handleSelectAnswer(answer)">
      {{answer}} </p>

    </div>

</div>

</template>

<script>
import {eventBus} from '../main.js'
import UserService from '@/services/UserService.js'
import QuizProgress from './QuizProgress.vue'

export default {
  name: 'quiz-question',
  props: ['selectedTopic', 'user', 'questionCounter'],
  data(){
    return {
      'countryData': [],
      'answerCountry': {},
      'answerArray': [],
    }
  },
  components: {
    'quiz-progress': QuizProgress
  },
  computed: {
    dbTopicName(){
      return this.selectedTopic.split(" ")[0].toLowerCase() + "Quiz"
    },
    apiTopicName(){
      if (this.selectedTopic === "Capitals Quiz") { return "capital" }
      else if (this.selectedTopic === "Flags Quiz") { return "flag" }
      else if (this.selectedTopic === "Continents Quiz") { return "region" }
      else if (this.selectedTopic === "Currencies Quiz") { return "currencies" }
    },
  },
  mounted() {
    this.fetchCountryData()
  },
  methods: {
    fetchCountryData(){
      fetch('https://restcountries.eu/rest/v2/all')
      .then( res => res.json())
      .then( result => this.countryData = result)
      .then( () => this.prepareQuiz() )
    },
    prepareQuiz(){
      // Filter out answered questions
      let availableCountries = this.countryData
      .filter(country =>
        !this.user[this.dbTopicName].includes(country.name)
        && country[this.apiTopicName] !== ""
        && country.hasOwnProperty(this.apiTopicName)
      )

      // Pick random country for question
      this.answerCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)]

      // Put correct answer into array
      this.answerArray.push(this.answerCountry[this.apiTopicName])

      // Ensure correct answer can only be in array once
      let remainingCountries = this.countryData
      .filter(country =>
        country[this.apiTopicName] !== this.answerCountry[this.apiTopicName]
        && country[this.apiTopicName] !== ""
        && country.hasOwnProperty(this.apiTopicName)
      )

      // Put 3 incorrect answers into array
      for(let i=0; i < 3; i++) {
        let randomCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)]

        this.answerArray.push(randomCountry[this.apiTopicName])

        // Ensure no duplicates in answer array
        remainingCountries = remainingCountries.filter(country => country[this.apiTopicName] !== randomCountry[this.apiTopicName])
      }

      // Shuffle array of answers
      this.answerArray.sort(function() {return 0.5 - Math.random()});

    },
    handleSelectAnswer(answer){
      // Work out if answer is correct
      const passed = (answer === this.answerCountry[this.apiTopicName])

      // If correct save result for user in passed
      if(passed) {
        UserService.updateUser(this.user._id, {[this.dbTopicName]:  this.answerCountry.name})
        eventBus.$emit('correct-answer')
      }

      // Handle previously failed question - later date

      // If incorreect save result in failed - later date

      // Move onto quiz answer
      eventBus.$emit('answer-selected', {country: this.answerCountry, userAnswer: passed})
    },
    displayQuestion(topic) {
      if (topic === "region") {
        return `On which continent is ${this.answerCountry.name}?`
      } else if (topic === 'flag') {
        return `Which of these is the flag of ${this.answerCountry.name}?`
      } else if (topic === 'currencies') {
        return `What is the currency of ${this.answerCountry.name}?`
      }
      return `What is the ${topic} of ${this.answerCountry.name}?`
    }
  }
}
</script>

<style lang="css" scoped>


#quiz-question {
  width: 70vw;
  min-height: 60vh;
  padding: 2vw;
  background-color: rgba(255, 255, 255, 0.75);
  color: black;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  font-size: 30px;
}

#answer-boxes {
  margin-top: 45px;
  width: 70vw;
  height: 30vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 1vw;
  align-items: space-around;
}

.flag-display {
  height: 8vw;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0.0);

}

.answer-display {
  cursor:pointer;
  border: 4px solid rgba(0, 0, 0, 0.0);
  background: lightgrey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.answer-display:hover, .flag-display:hover {
  border: 4px solid white;
}

</style>
