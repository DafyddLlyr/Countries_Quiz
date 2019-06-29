<template lang="html">

  <div id="map-overlay">
    <quiz-topic topic="Capitals Quiz"/>
    <quiz-topic topic="Flags Quiz"/>
    <quiz-topic topic="Currency Quiz"/>
  </div>

</template>

<script>
import QuizTopic from './QuizTopic.vue'

export default {
  name: 'map-overlay',
  components: {
    'quiz-topic': QuizTopic
  }

}
</script>

<style lang="css" scoped>

#map-overlay {
  background: lightgrey;
  grid-area: map-overlay;
}

</style>
