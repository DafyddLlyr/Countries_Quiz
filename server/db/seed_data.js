use countries_quiz;
db.dropDatabase();


db.users.insertMany ([
  {
    name: "Sarab",
    capitalsQuiz: [],
    flagsQuiz: [],
    currenciesQuiz: [],
    continentsQuiz: []
    // capitalsQuiz: {passed: [], failed: []},
    // flagsQuiz: {passed: [], failed: []},
    // currenciesQuiz: {passed: [], failed: []},
    // continentsQuiz: {passed: [], failed: []}
  },

  {
    name: "Laura",
    capitalsQuiz: [],
    flagsQuiz: [],
    currenciesQuiz: [],
    continentsQuiz: []
    // capitalsQuiz: {passed: [], failed: []},
    // flagsQuiz: {passed: [], failed: []},
    // currenciesQuiz: {passed: [], failed: []},
    // continentsQuiz: {passed: [], failed: []}
  },

  {
    name: "Dafydd",
    capitalsQuiz: [],
    flagsQuiz: [],
    currenciesQuiz: [],
    continentsQuiz: []
    // capitalsQuiz: {passed: [], failed: []},
    // flagsQuiz: {passed: [], failed: []},
    // currenciesQuiz: {passed: [], failed: []},
    // continentsQuiz: {passed: [], failed: []}
  }
])
