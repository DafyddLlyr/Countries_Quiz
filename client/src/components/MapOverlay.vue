<template lang="html">

  <div id="map-overlay">
    <div id='topic-container' v-if="!selectedTopic">
      <quiz-topic topic="Capitals Quiz" topic_keyword="capital"/>
      <quiz-topic topic="Flags Quiz" topic_keyword="flag"/>
      <quiz-topic topic="Currency Quiz" topic_keyword="currencies[0].name"/>
    </div>
  </div>

</template>

<script>
import {eventBus} from '../main.js'
import QuizTopic from './QuizTopic.vue'

export default {
  name: 'map-overlay',
  data() {
    return {
      'selectedTopic': null
    }
  },
  components: {
    'quiz-topic': QuizTopic
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

</style>
