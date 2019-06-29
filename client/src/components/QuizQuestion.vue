<template lang="html">

  <div id="quiz-question">
    <h2>{{selectedTopic}}</h2>
  </div>

</template>

<script>
export default {
  name: 'quiz-question',
  props: ['selectedTopic', 'user'],
  data(){
    return {
      'countryData': [],
      'answerCountry': null,
      'answerArray': []
    }
  },
  computed: {
    dbTopicName(){
      return this.selectedTopic.split(" ")[0].toLowerCase() + "Quiz"
    },
    apiTopicName(){
      if (this.selectedTopic === "Capitals Quiz") { return "capital" }
      else if (this.selectedTopic === "Flags Quiz") { return "flag" }
      else if (this.selectedTopic === "Currencies Quiz") { return "currencies[0].name" }
    }
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
      // Pick random country for question
      let randomCountry = this.countryData[Math.floor(Math.random() * this.countryData.length)]

      // Check user hasn't answered question
      if(this.user[this.dbTopicName]["passed"].includes(randomCountry.name)){
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


    }
  }
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
