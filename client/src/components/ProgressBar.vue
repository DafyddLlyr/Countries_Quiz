<template lang="html">
  <div id="bar-container">
    <div id="completed-progress" :style="{width: progressPercent + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: ['topic', 'user'],
  data() {
    return {
      userProgress: 0,
      progressPercent: 0
    }
  },
  computed: {
    dbTopicName() {
      return this.topic.split(" ")[0].toLowerCase() + "Quiz"
    }
  },
  mounted() {
    this.fetchUserData()
  },
  methods: {
    fetchUserData(){
      fetch(`http://localhost:3000/api/users/${this.user._id}`)
      .then(res => res.json())
      .then(user => this.userProgress = user[this.dbTopicName].length)
      .then(() => {
        if(this.userProgress !== 0) {
          this.progressPercent = Math.ceil((this.userProgress / 250) * 100)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>

#completed-progress {
  background-color: limegreen;
  height: 1vw;
  border-radius: 20px;
}

#bar-container {
  background-color: lightgrey;
  border-radius: 20px;
  margin: 1vw;
  width: 90%
}

</style>
