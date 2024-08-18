const express = require('express');
const redis = require('../redis')
const router = express.Router();

const configs = require('../util/config')

let visits = 0

initialiseRedis = async () => await redis.setAsync("added_todos", 0)
initialiseRedis()

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const addedTodos = await redis.getAsync("added_todos")
  res.send({ addedTodos })
})

module.exports = router;
