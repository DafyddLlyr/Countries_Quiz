use countries_quiz;
db.dropDatabase();


db.users.insertMany ([
  {
    name: "Sarab",
    capitalsQuiz: {passed: [], failed: []},
    flagsQuiz: {passed: [], failed: []},
    currenciesQuiz: {passed: [], failed: []},
    continentsQuiz: {passed: [], failed: []}
  },

  {
    name: "Laura",
    capitalsQuiz: {passed: [], failed: []},
    flagsQuiz: {passed: [], failed: []},
    currenciesQuiz: {passed: [], failed: []},
    continentsQuiz: {passed: [], failed: []}
  },

  {
    name: "Dafydd",
    capitalsQuiz: {passed: [], failed: []},
    flagsQuiz: {passed: [], failed: []},
    currenciesQuiz: {passed: [], failed: []},
    continentsQuiz: {passed: [], failed: []}
  }
])
