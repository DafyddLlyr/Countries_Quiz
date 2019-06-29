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
      if (this.selectedTopic = "Capitals Quiz") { return "capital" }
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
      console.log(this.countryData);
      console.log(randomCountry);
      // Check user hasn't answered question
      if(this.user[this.dbTopicName]["passed"].includes(randomCountry.name)){
        console.log("passed question");
        this.prepareQuiz()
      } else {
        console.log("not passed question");
        this.answerCountry = randomCountry
      }
      // Put correct answer into array
      this.answerArray.push(this.answerCountry[this.apiTopicName])
      // Put 3 incorrect answers into array
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
