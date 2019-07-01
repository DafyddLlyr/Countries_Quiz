<template lang="html">
  <div id='user-profile'>
    <h2>User Profile</h2>

    <div id="profile-charts">
      <h3>Total Progress</h3>
      <h4>Your progress across all of our quizzes</h4>
      <GChart id="total-progress"
      type="PieChart"
      :data="totalProgress"
      :options="totalProgressOptions"
      />
    </div>

    <div id="quiz-charts">
      <div>
        <h3>Capitals Quiz</h3>
        <GChart class="quiz-process"
        type="PieChart"
        :data="capitalsProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h3>Flags Quiz</h3>
        <GChart class="quiz-process"
        type="PieChart"
        :data="flagsProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h3>Currencies Quiz</h3>
        <GChart class="quiz-process"
        type="PieChart"
        :data="currenciesProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h3>Contients Quiz</h3>
        <GChart class="quiz-process"
        type="PieChart"
        :data="continentsProgress"
        :options="quizProgressOptions"
        />
      </div>


    </div>

  </div>
</div>

</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'user-profile',
  props: ['user'],
  components: {
    'GChart': GChart
  },
  data() {
    return {
      totalProgressOptions: {
        pieHole: 0.3,
        backgroundColor: {
          fill: 'transparent'
        },
        legend: {
          alignment: 'center',
          textStyle: {fontSize: 20}
        },
        chartArea: {
          height: '90%',
          width: '90%'
        },
        colors: ['green', 'blue']
      },
      quizProgressOptions: {
        pieHole: 0.3,
        backgroundColor: {
          fill: 'transparent'
        },
        legend: {
          position: 'none'
        },
        chartArea: {
          height: '90%',
          width: '90%',
        },
        colors: ['green', 'blue']
      }
    }
  },
  computed: {
    totalProgress() {
      let progress = this.user.capitalsQuiz.length +
      this.user.flagsQuiz.length +
      this.user.currenciesQuiz.length +
      this.user.continentsQuiz.length
      return [
        ['Status', 'Completed'],
        ['Completed', progress],
        ['Remaining', 1000]
      ]
    },
    capitalsProgress() {
      return [
        ['Status', 'Completed'],
        ['Completed', this.user.capitalsQuiz.length],
        ['Remaining', 1000]
      ]
    },
    flagsProgress() {
      return [
        ['Status', 'Completed'],
        ['Completed', this.user.flagsQuiz.length],
        ['Remaining', 1000]
      ]
    },
    currenciesProgress() {
      return [
        ['Status', 'Completed'],
        ['Completed', this.user.currenciesQuiz.length],
        ['Remaining', 1000]
      ]
    },
    continentsProgress() {
      return [
        ['Status', 'Completed'],
        ['Completed', this.user.continentsQuiz.length],
        ['Remaining', 1000]
      ]
    }
  }
}
</script>

<style lang="css" scoped>

#profile-charts {
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw
}

#total-progress {
  width: 40vw;
  height: 40vh;
}

#quiz-charts {
  display: flex;
  width: 80vw;
  justify-content: space-around;
}

.quiz-process {
  width: 10vw;
  height: 10vw;
}

</style>
