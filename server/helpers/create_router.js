const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {
  const router = express.Router();

router.get('/', (req, res) => {
  collection
  .find()
  .toArray()
  .then((docs) => res.json(docs))
  .catch((err) => {
    console.error(error);
    res.status(500);
    res.json({status: 500, error: err});
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  collection
  .findOne({_id: ObjectID(id)})
  .then((doc) => res.json(doc))
  .catch((err) => {
    console.error(error);
    res.status(500);
    res.json({status: 500, error: err});
  });

})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  collection
  .findOneAndUpdate(
    {_id: ObjectID(id)},
    {$set: (updatedData)},
    {returnOriginal: false}
  )
  .then((result) => {
    res.json(result.value)
  })
  .catch((err) => {
    console.error(error);
    res.status(500);
    res.json({status: 500, error: err});
  });
});


  return router;
}

module.exports = createRouter;