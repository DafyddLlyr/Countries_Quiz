<template lang="html">

  <div id="map-overlay">
    <div id='topic-container'>
      <quiz-topic topic="Capitals Quiz"/>
      <quiz-topic topic="Flags Quiz"/>
      <quiz-topic topic="Currency Quiz"/>
    </div>
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

#topic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
