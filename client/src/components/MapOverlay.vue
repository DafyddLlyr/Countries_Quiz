<template lang='html'>

  <div id='map-overlay'>

    <div id='earth_div'></div>

    <div id="select-quiz" v-if="quizChoice">

      <div id='topic-container' v-if='!selectedTopic'>
        <quiz-topic topic='Capitals Quiz' :user="user"/>
        <quiz-topic topic='Flags Quiz' :user="user" />
        <quiz-topic topic='Currencies Quiz' :user="user" />
        <quiz-topic topic='Continents Quiz' :user="user" />
      </div>

      <div id='quiz-container' v-if='selectedTopic'>
        <quiz-question v-if='(!answerSelected && questionCounter < 5)' :selectedTopic='selectedTopic' :user='user' :questionCounter="questionCounter"/>
        <quiz-answer v-if='(answerSelected && questionCounter < 5)' :questionPassed='questionPassed' :answerCountry='answerCountry' :questionCounter='questionCounter':selectedTopic="selectedTopic"/>
        <quiz-complete v-if='quizCompleted' :correctAnswerCounter="correctAnswerCounter" />
      </div>

    </div>

    <div v-if="profileSelected" id="profile">
      <user-profile :userID='user'/>
    </div>

  </div>

</template>

<script>
import {eventBus} from '../main.js'
import QuizTopic from './QuizTopic.vue'
import QuizQuestion from './QuizQuestion.vue'
import QuizAnswer from './QuizAnswer.vue'
import QuizComplete from './QuizComplete.vue'
import UserProfile from './UserProfile.vue'

export default {
  name: 'map-overlay',
  props: ['user'],
  data() {
    return {
      'selectedTopic': null,
      'answerSelected': false,
      'questionPassed': null,
      'answerCountry': null,
      'questionCounter': 0,
      'quizCompleted': false,
      'quizChoice': false,
      'correctAnswerCounter': 0,
      'mapDisplayCountry': null,
      'globe': null,
      'displayMarker': null,
      'globeSpin': false, // Change me to turn animation on
      'profileSelected': false
    }
  },
  components: {
    'quiz-topic': QuizTopic,
    'quiz-question': QuizQuestion,
    'quiz-answer': QuizAnswer,
    'quiz-complete': QuizComplete,
    'user-profile': UserProfile
  },
  mounted(){
    this.initializeGlobe()
    // this.checkGlobeSpin() Comment me in to turn animation on
    eventBus.$on('selected-topic', (topic) => {
      this.selectedTopic = topic
    })
    eventBus.$on('show-topics', () => {
      this.selectedTopic = null;
      this.quizChoice = true;
      this.profileSelected = false;
    })
    eventBus.$on('globe-selected', () => {
      this.quizChoice = false;
      this.profileSelected = false;
    })
    eventBus.$on('answer-selected', result => {
      this.answerSelected = true;
      this.questionPassed = result['userAnswer'];
      this.answerCountry = result['country']
    })
    eventBus.$on('increment-counter', () => {
      this.questionCounter += 1;
      this.answerSelected = false;
    })
    eventBus.$on('quiz-ended', () => {
      this.questionCounter += 1;
      this.quizCompleted = true;
    })
    eventBus.$on('correct-answer', () => {
      this.correctAnswerCounter +=1;
    })
    eventBus.$on('quiz-reset', () => {
      this.selectedTopic = null;
      this.answerSelected = false;
      this.questionPassed = null;
      this.answerCountry = null;
      this.questionCounter = 0;
      this.quizCompleted = false;
      this.correctAnswerCounter = 0;
    })
    eventBus.$on('country-choice', country => {
      this.mapDisplayCountry = country;
      if(this.displayMarker) { this.displayMarker.removeFrom(this.globe) };
      this.displayMarker = WE.marker(country.latlng).addTo(this.globe);
      this.globe.panTo(country.latlng);
    })
    eventBus.$on('profile-selected', () => {
      this.profileSelected = true;
      this.quizChoice = false;
    })
  },
  methods: {
    initializeGlobe: function() {
      let options = { zoom: 2.2, position: [47.19537,8.524404] };
      this.globe = new WE.map('earth_div', options);
      WE.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 0,
        maxZoom: 10,
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
      }).addTo(this.globe);
    },
    checkGlobeSpin: function() { // Not yet called
      let before = null;
      let earth = this.globe
      requestAnimationFrame(function animate(now) {
        let c = earth.getPosition();
        let elapsed = before ? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
        requestAnimationFrame(animate);
      });
    }
  }
}
</script>

<style lang='css' scoped>

#map-overlay {
  background: none;
  grid-area: map-overlay;
  display: flex;
  justify-content: center;
}

#select-quiz {
  background: none;
  position: absolute;
  width: 80vw;
  height: 90vh;
  margin: 0;
  padding: 0;
}

#topic-container {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.0);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#quiz-container {
  background-color: rgba(0, 0, 0, 0.0);
  width: 80vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#earth_div {
  width: 80vw;
  height: 90vh;
  top: 10vh;
  right: 0;
  bottom: 0;
  left: 20vw;
  position: absolute !important;
  background-color: lightgrey;
}

#profile {
  position: absolute;
  width: 80vw;
  height: 90vh;
  top: 10vh;
  right: 0;
  bottom: 0;
  left: 20vw;
}

</style>
