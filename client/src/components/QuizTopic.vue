<template lang="html">

  <div id="quiz-topic">
    <h2>{{topic}}</h2>
    <button v-on:click="handleTakeQuiz" type="button" name="button">Take Quiz!</button>
    <progress-bar :topic="topic" :user="user"/>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'quiz-topic',
  props: ['topic', 'user'],
  methods: {
    handleTakeQuiz(){
      eventBus.$emit('selected-topic', this.topic)
    }
  },
  components: {
    'progress-bar': ProgressBar
  }
}
</script>

<style lang="css" scoped>

#quiz-topic {
  width: 30vw;
  height: 20vh;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  width: 10vw;
}

</style>
