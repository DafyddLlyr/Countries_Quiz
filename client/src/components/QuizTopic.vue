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
  width: 28vw;
  height: 20vh;
  background-color: rgba(255,255,255, 0.8);
  margin: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: solid 4px white;
  border-radius: 15px;
  font-size: 20px;
}

button {
  width: 10vw;
  border: none;
  border-radius: 10px;
  background-color: #6b93d6;
  font-size: 1.2rem;
  border: solid 2px #6b93d6;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  padding: 0.3vw;
}
button:hover {
  border: solid 2px white;
}

</style>
