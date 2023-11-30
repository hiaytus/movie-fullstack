/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {id: 1, title: 'The Hunger Games'},
    {id: 2, title: 'Harry Potter'},
    {id: 3, title: 'Twilight'}
  ]);
};
