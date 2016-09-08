var knex = require('./knex');

function Posts() {
  return knex('post');
}

function newPost(title, author_id, body, can_comment) {
  return knex('post').insert({
    title: title,
    author_id: author_id,
    body: body,
    can_comment: can_comment
  })
}



module.exports = {
  Posts,
  newPost
};
