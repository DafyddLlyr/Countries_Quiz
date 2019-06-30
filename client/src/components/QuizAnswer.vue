<template lang="html">

  <div id="quiz-answer">
    <h2>{{displayAnswer()}}</h2>
  </div>

</template>

<script>

export default {
  name: 'quiz-answer',
  props: ['questionPassed', 'answerCountry'],
  methods: {
    displayAnswer() {
      if (this.questionPassed) {
        return "That's right!"
      } else {
        return "That's incorrect :("
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
