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
        <h3>Continents Quiz</h3>
        <GChart class="quiz-process"
        type="PieChart"
        :data="continentsProgress"
        :options="quizProgressOptions"
        />
      </div>


    </div>
    <div id="map-progress">
      <h2>Progress Map</h2>
      <h4>How close are you to exploring the entire world?</h4>
      <GChart
      :settings="{ packages: ['geochart'] , mapsApiKey: myMapsApiKey}"
      type="GeoChart"
      :data="mapProgressData"
      :options="mapProgressOptions"
      />
    </div>


  </div>
</div>

</template>

<script>
import { GChart } from 'vue-google-charts'
import { googleMapsAPIKey } from '../../private/keys.js'

export default {
  name: 'user-profile',
  props: ['userID'],
  mounted() {
    this.fetchData()
  },
  components: {
    'GChart': GChart
  },
  data() {
    return {
      myMapsApiKey: googleMapsAPIKey,
      user: null,
      mapProgressOptions: {
        colorAxis: {colors: ['lightgreen', 'green', 'green']},
        datalessRegionColor: 'white',
        backgroundColor: '',
        legend: 'none'
      },
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
      if (this.user) {
        let progress = this.user.capitalsQuiz.length +
        this.user.flagsQuiz.length +
        this.user.currenciesQuiz.length +
        this.user.continentsQuiz.length
        return [
          ['Status', 'Completed'],
          ['Completed', progress],
          ['Remaining', 1000]
        ]
      }
    },
    capitalsProgress() {
      if (this.user) {
        return [
          ['Status', 'Completed'],
          ['Completed', this.user.capitalsQuiz.length],
          ['Remaining', 250 - this.user.capitalsQuiz.length]
        ]
      }
    },
    flagsProgress() {
      if (this.user) {
        return [
          ['Status', 'Completed'],
          ['Completed', this.user.flagsQuiz.length],
          ['Remaining', 250 - this.user.flagsQuiz.length]
        ]
      }
    },
    currenciesProgress() {
      if (this.user) {
        return [
          ['Status', 'Completed'],
          ['Completed', this.user.currenciesQuiz.length],
          ['Remaining', 250 - this.user.currenciesQuiz.length]
        ]
      }
    },
    continentsProgress() {
      if (this.user) {
        return [
          ['Status', 'Completed'],
          ['Completed', this.user.continentsQuiz.length],
          ['Remaining', 250 - this.user.continentsQuiz.length]
        ]
      }
    },
    mapProgressData() {
      if (this.user) {
        let flagsResult = this.user.flagsQuiz.map(country => [country, 1])
        let capitalsResult = this.user.capitalsQuiz.map(country => [country, 1])
        let currenciesResult = this.user.currenciesQuiz.map(country => [country, 1])
        let continentsResult = this.user.continentsQuiz.map(country => [country, 1])

        let result = flagsResult.concat(capitalsResult, currenciesResult, continentsResult)

        result.sort()

        for(let i=0; i < result.length - 1; i++){
          if(result[i][0] === result[i + 1][0]) {
            result[i][1] += 1;
            result.splice(i + 1, 1)
          }
        }
        result.unshift(['Country', 'Correct Answers'])
        return result
      }
    }
  },
  methods: {
    fetchData(){
      fetch(`http://localhost:3000/api/users/${this.userID._id}`)
      .then(res => res.json())
      .then(result => this.user = result)
    }
  }
}
</script>

<style lang="css" scoped>

#user-profile {
  max-height: 90vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
}

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

#map-progress {
  margin-top: 3vw;
  width: 90%;
}

</style>
