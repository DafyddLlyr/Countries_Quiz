<template lang="html">

  <div id="quiz-question">
    <quiz-progress :questionCounter="questionCounter"/>
    <h2>{{selectedTopic}}</h2>
    <h3>What is the {{apiTopicName}} of {{answerCountry.name}}?</h3>
    <div id="answer-boxes" >
      <div class="answer-container" v-for="answer in answerArray"
      v-if="apiTopicName === 'flag'">
      <img :src="answer" alt="flag" class="flag-display" v-on:click="handleSelectAnswer(answer)">
    </div>
    <p class="answer-display" v-for="answer in answerArray"  v-if="apiTopicName !== 'flag'"
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
      'answerArray': []
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
      else if (this.selectedTopic === "Currencies Quiz") { return "currencies[0].name" }
    }
  },
  mounted() {
    this.fetchCountryData()
    // this.prepareQuiz()
  },
  methods: {
    fetchCountryData(){
      fetch('https://restcountries.eu/rest/v2/all')
      .then( res => res.json())
      .then( result => this.countryData = result)
      .then( () => this.prepareQuiz() )
    },
    prepareQuiz(){
      // Pick random country for question
      let randomCountry = this.countryData[Math.floor(Math.random() * this.countryData.length)]

      // Check user hasn't answered question
      if(this.user[this.dbTopicName].includes(randomCountry.name)){
        this.prepareQuiz()
      } else {
        this.answerCountry = randomCountry
      }

      // Put correct answer into array
      this.answerArray.push(this.answerCountry[this.apiTopicName])

      // Put 3 incorrect answers into array
      const remainingCountries = this.countryData.filter(country => country.name !== this.answerCountry.name)

      for(let i=0; i < 3; i++) {
        this.answerArray.push(remainingCountries[Math.floor(Math.random() * remainingCountries.length)][this.apiTopicName])
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
      }

      // Handle previously failed question - later date

      // If incorreect save result in failed - later date

      // Move onto quiz answer
      eventBus.$emit('answer-selected', {country: this.answerCountry, userAnswer: passed})
    }
  }
}
</script>

<style lang="css" scoped>


#quiz-question {
  width: 70vw;
  min-height: 60vh;
  padding: 2vw;
  background-color: purple;
  color: white;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

#answer-boxes {
  width: 70vw;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 3vw;
}

.flag-display {
  height: 15vw;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0.0);
}

.answer-display {
  cursor:pointer;
  border: 4px solid rgba(0, 0, 0, 0.0);
}

.answer-display:hover, .flag-display:hover {
  border: 4px solid white;
}

</style>
