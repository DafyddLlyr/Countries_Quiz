<template lang="html">
  <div id="bar-container">
    <div id="completed-progress" :style="{width: quizProgress + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'quiz-progress',
  props: ['questionCounter'],
  computed: {
    quizProgress() {
      return this.questionCounter === 0 ? 0 : (this.questionCounter / 5) * 100
    }
  }
}
</script>

<style lang="css" scoped>

#completed-progress {
  background-color: limegreen ;
  height: 1vw;
  border-radius: 20px;
}

#bar-container {
  background-color: lightgrey;
  border-radius: 20px;
  margin: 1vw;
}

</style>
