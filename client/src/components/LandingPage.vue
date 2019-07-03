<template lang="html">

  <div id="landing-page">
    <div class="landing-page-header">
      <h1>World Quiz</h1>
    </div>
<div id="nav-bar"></div>
    <div id='earth_div'></div>

    <div id="login">

      <h3>Welcome to the World Quiz where you can learn and play with facts on countries of the World. </h3>
            <br>
      <p>Already a user? Please Login Below:</p>
      <select  v-model="user"  class="" name="">
        <option value="" disabled>Please select user:</option>
        <option v-for="user in users" :value="user">{{user.name}}</option>
      </select>
      <div>
        <button v-on:click="handleSelectUser" type="button" name="button">Log On <i class="fas fa-sign-in-alt"></i></button>
      </div>

      <br>

      <p>New User? Please Register Below:</p>
      <div id="register-box">


        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required/>


      </div>
      <button v-on:click="handleAddUser" value="save" type="button" name="button">Register <i class="fas fa-sign-in-alt"></i></button>
    </div>
  </div>
</template>

<script>
import {
  eventBus
} from '../main.js'
import UserService from '@/services/UserService.js'


export default {
  name: 'landing-page',
  data() {
    return {
      user: "",
      users: null,
      addUser: "",
      name: "",
      newUser: null
    }
  },
  mounted() {
    this.fetchData()
    this.initializeGlobe()
    this.checkGlobeSpin()
  },
  methods: {
    fetchData() {
      fetch('http://localhost:3000/api/users/')
      .then(res => res.json())
      .then(users => this.users = users)
    },
    handleSelectUser() {
      eventBus.$emit('selected-user', this.user)
    },
    handleAddUser() {
      const payload = {
        name: this.name,
        capitalsQuiz: [],
        flagsQuiz: [],
        currenciesQuiz: [],
        continentsQuiz: [],
        failedCountries: []
      }
      UserService.postUser(payload)
      .then(() => fetch('http://localhost:3000/api/users/'))
      .then(res => res.json())
      .then(users => users.filter(user => user.name === this.name))
      .then(user => this.user = user[0])
      .then(() => this.handleSelectUser())
    },
    initializeGlobe: function() {
      let options = {
        zoom: 2.2,
        position: [47.19537, 8.524404]
      };
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
        let elapsed = before ? now - before : 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1 * (elapsed / 30)]);
        requestAnimationFrame(animate);
      });
    }
  }
}
</script>

<style lang="css" scoped>


#landing-page {
  height: 100vh;
}

.landing-page-header {
  background: #3569bf;
  grid-area: header;
  color: white;
  font-size: 30px;
}

#nav-bar{
  grid-area: nav-bar;
  background-color: #e9eff9;
}

#earth_div {
  width: 80vw;
  height: 90vh;
  top: 10vh;
  right: 0;
  bottom: 0;
  left: 20vw;
  position: absolute !important;
  z-index: -1;
  background-color: #e9eff9;
  border: none;
}

#login {
  z-index: 1;
  background-color: #e9eff9;
  position: absolute;
  left: 7vw;
  top: 15vh;
  width: 30vw;
  height: 70vh;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

input {
  font-size: 20px;
  margin-left: 1vw;
}

select {
  width: 20vw;
  font-size: 20px;
}

#register-box {
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
}


#landing-page {
  display: grid;
  grid-template-rows: 10vh;
  grid-template-columns: 20vw auto;
  grid-template-areas:
  'header header'
  'nav-bar map-overlay'
}

button {
  background-color: #9fc164;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  width: 15vw;
  border: solid 2px #9fc164;
  cursor: pointer;
  height: 2vw;
  color: white;
  font-weight: bolder;
}

h3 {
  font-size: 30px;
}

button:hover {
  border: solid 2px white;
}
</style>
