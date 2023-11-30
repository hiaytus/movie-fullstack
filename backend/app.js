const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const app = express();
const port = 8080;


app.use(express.json());

app.listen(port, () => console.log(`express server listening on port: ${port}`))

app.get('/', (req, res) => {
  knex('movies')
  .select('*')
  .then(data =>  res.json(data))
})

app.post('/', (req, res) => {
  let movieToAdd = req.body.title;
  let movieId;
  knex('movies')
  .select("*")
  .then(data => movieId = data.length++)
  .catch(function(error) {
    console.error(error);
  })
  .then(
    knex('movies')
      .insert({
        "id": movieId,
        "title": movieToAdd
      })
      .into('movies')
        .catch(function(error) {
        console.error(error);
      })
  )
  .then(
    knex('movies')
      .select("*")
      .then((data) => {
        res.json(data)
        console.log(data)
      })
      .catch(function(error) {
        console.error(error);
      })
  )
})

app.patch('/:id', async (req, res) => {
  let movieId = req.params.id;
  let movieToUpdate = req.body.title;
  let updatePromise = new Promise((resolve) => 
  {
    knex('movies')
      .where("id", movieId)
      .update({"title": movieToUpdate})
      .then(resolve)
  })
  await updatePromise
  knex('movies')
    .where("id", movieId)
    .select("*")
    .then((data) => res.json(data))
})

// app.delete('/:id', (req, res) => {
//   let movieId = req.params.id;
//   knex('movies')
//   .where("id", movieId)
//   .del()
//   knex('movies')
//   .select("*")
//   .then((data) => res.json(data))
// })