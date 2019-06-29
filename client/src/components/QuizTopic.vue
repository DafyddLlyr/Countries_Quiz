<template lang="html">

  <div id="quiz-topic">
    <h2>{{topic}}</h2>
    <button v-on:click="handleTakeQuiz" type="button" name="button">Take Quiz!</button>
  </div>

</template>

<script>
import {eventBus} from '../main.js'

export default {
  name: 'quiz-topic',
  props: ['topic', 'topic_keyword'],
  methods: {
    handleTakeQuiz(){
      eventBus.$emit('selected-topic', this.topic_keyword)
    }
  }
}
</script>

<style lang="css" scoped>

#quiz-topic {
  width: 30vw;
  height: 20vh;
  background-color: pink;
  margin: 5vw;
}

</style>
