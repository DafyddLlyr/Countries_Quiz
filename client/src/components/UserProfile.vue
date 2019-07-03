<template lang="html">

  <div id='user-profile'>
    <h1>User Profile</h1>
    <br>

    <div id="profile-charts">
      <h2>Total Progress <i class="fas fa-award"></i></h2>
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

    <div id="map-fail">
      <h2>Knowledge Gaps</h2>
      <br>
      <h3>Here are the countries you still need to learn a little more about</h3>
      <br>

      <GChart
      :settings="{ packages: ['geochart'] , mapsApiKey: myMapsApiKey}"
      type="GeoChart"
      :data="mapFailData"
      :options="mapFailOptions"
      />
<br>
      <h3 v-if="user.failedCountries.length !== 0" v-on:click="visitRandomFailedCountry" id="country-suggestion"> Why not learn about {{ randomFailedCountry }} today? <i class="fas fa-arrow-circle-right"></i></h3>
      <br>
    </div>

<button v-on:click="deleteUser" type="button">Delete Account</button>


  </div>
</div>

</template>

<script>
import {eventBus} from '../main.js'
import { GChart } from 'vue-google-charts'
import { googleMapsAPIKey } from '../../private/keys.js'
import UserService from  '../services/UserService.js'

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
      mapFailOptions: {
        colorAxis: {colors: ['#c1649f']},
        datalessRegionColor: 'white',
        backgroundColor: '#93b0e1',
        legend: 'none',
        keepAspectRatio: true,
        height: 500
      },
      mapProgressOptions: {
        colorAxis: {colors: ['#c1d79b', '#94ba52', '#799b3e']},
        datalessRegionColor: 'white',
        backgroundColor: '#93b0e1',
        legend: 'none',
        keepAspectRatio: true,
        height: 500
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
        return result
      }
    },
    mapFailData() {
      if (this.user) {
        let failObject = {}
        let uniqueFailArray = [...new Set(this.user.failedCountries)]
        uniqueFailArray.forEach(country => failObject[country] = 0)
        this.user.failedCountries.forEach(country => {
          failObject[country] += 1
        })
        let result = uniqueFailArray.map(country => {
          return [country, failObject[country]]
        })
        result.unshift(['Country', 'Incorrect Answers'])
        return result
      }
    },
    randomFailedCountry() {
      if (this.user) {
        return this.user.failedCountries[Math.floor(Math.random() * this.user.failedCountries.length)]
      }
    }
  },
  methods: {
    fetchData(){
      fetch(`http://localhost:3000/api/users/${this.userID._id}`)
      .then(res => res.json())
      .then(result => this.user = result)
    },
    visitRandomFailedCountry() {
      eventBus.$emit('failed-country', this.randomFailedCountry)
    },
    deleteUser(){
      // check user wants to delete the account.
      //message pops up
      //if yes
      //delete user
    UserService.deleteUser(this.user._id)
   //return to landing page
   eventBus.$emit('log-out')


      //if no
      //nothing happens
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
  width: 80%;
}

#map-fail {
  margin-top: 3vw;
  width: 80%;
}

#fail-container {
  display: flex;
}

#country-suggestion {
  background-color: #9fc164;
  font-size: 24px;
  border-radius: 10px;
  border: solid 2px #9fc164;
  cursor: pointer;
  padding: 0.3vw;
  color: white;
  font-weight: bolder;
}

#country-suggestion:hover {
  border: solid 2px white;
}

</style>
