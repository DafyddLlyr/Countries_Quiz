<template lang="html">

  <div id="map-overlay">
    <div id='topic-container' v-if="!selectedTopic">
      <quiz-topic topic="Capitals Quiz"/>
      <quiz-topic topic="Flags Quiz"/>
      <quiz-topic topic="Currency Quiz"/>
    </div>
    <div id='quiz-container' v-if="selectedTopic">
      <quiz-question :selectedTopic="selectedTopic"/>
    </div>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
import QuizTopic from './QuizTopic.vue'
import QuizQuestion from './QuizQuestion.vue'

export default {
  name: 'map-overlay',
  data() {
    return {
      'selectedTopic': null
    }
  },
  components: {
    'quiz-topic': QuizTopic,
    'quiz-question': QuizQuestion
  },
  mounted(){
    eventBus.$on('selected-topic', (topic) => {
      this.selectedTopic = topic
    })
    eventBus.$on('show-topics', () => {
      this.selectedTopic = null
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
