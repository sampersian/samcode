var knex = require('./knex');

// This gets all the posts
function Posts() {
  return knex('post');
}


// For new posts
function newPost(title, subtitle, author_id, body, can_comment, created_at, updated_at) {
  return knex('post').insert({
    title: title,
    subtitle: subtitle,
    author_id: author_id,
    body: body,
    can_comment: can_comment,
    created_at: created_at,
    updated_at: updated_at
  })
}

function newComment(post_id, author_id, body, is_positive) {
  return knex('comment').insert({
    post_id: post_id,
    author_id: author_id,
    body: body,
    is_positive: is_positive
  })
}

function deleteComment(id) {
  return knex('comment').where('id', id).del();
}

function deletePost(id) {
  return knex('post').where('id', id).del();
}

module.exports = {
  Posts,
  newPost,
  newComment,
  deleteComment,
  deletePost
}
