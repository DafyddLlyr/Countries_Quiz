use countries_quiz;
db.dropDatabase();


db.users.insertMany ([
  {
    name: "Sarab",
    capitalsQuiz: {passed: [], failed: []}

  },

  {
    name: "Laura",
    capitalsQuiz: {passed: [], failed: []}
  },

  {
    name: "Dafydd",
    capitalsQuiz: {passed: [], failed: []}
  }
])
