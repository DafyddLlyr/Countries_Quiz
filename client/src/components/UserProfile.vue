<template lang="html">

  <div id='user-profile'>
    <h1>User Profile</h1>
    <br>

    <div id="profile-charts">
      <h2>Total Progress</h2>
      <br>
      <h3>Your progress across all of our quizzes</h3>
      <GChart id="total-progress"
      type="PieChart"
      :data="totalProgress"
      :options="totalProgressOptions"
      />
    </div>

    <div id="quiz-charts">
      <div>
        <h2>Capitals Quiz</h2>
        <GChart class="quiz-process"
        type="PieChart"
        :data="capitalsProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h2>Flags Quiz</h2>
        <GChart class="quiz-process"
        type="PieChart"
        :data="flagsProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h2>Currencies Quiz</h2>
        <GChart class="quiz-process"
        type="PieChart"
        :data="currenciesProgress"
        :options="quizProgressOptions"
        />
      </div>

      <div>
        <h2>Continents Quiz</h2>
        <GChart class="quiz-process"
        type="PieChart"
        :data="continentsProgress"
        :options="quizProgressOptions"
        />
      </div>

    </div>

    <br>

    <div id="map-progress">
      <h2>Progress Map</h2>
      <br>
      <h3>How close are you to exploring the entire world?</h3>
      <br>
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
        colorAxis: {colors: ['#c1d79b', '#94ba52', '#799b3e']},
        datalessRegionColor: 'white',
        backgroundColor: '#93b0e1',
        legend: 'none',
        keepAspectRatio: true,
        height: 600
      },
      totalProgressOptions: {
        pieHole: 0.3,
        backgroundColor: {
          fill: 'transparent'
        },
        legend: {
          alignment: 'center',
          textStyle: {fontSize: 20, bold: true}
        },
        chartArea: {
          height: '90%',
          width: '90%'
        },
        colors: ['#9fc164', '#6b93d6']
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
        colors: ['#9fc164', '#6b93d6']
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

        for(let i=0; i < result.length - 1; i++){
          if(result[i][0] === result[i + 1][0]) {
            result[i][1] += result[i + 1][1];
            result.splice(i + 1, 1)
          }
        }

        result.unshift(['Country', 'Correct Answers'])
        console.log(result);
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
  background-color: #e9eff9;
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
