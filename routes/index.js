var express = require('express');
var router = express.Router();

var query = require('../db/query');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(cookieParser());
router.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  query.Posts().then( (data) => {
    console.log(data);
    let posts = data;
    res.render('index', { posts: posts });
  })
});

router.get('/post/:postId', function(req, res, next) {
  query.Posts().leftJoin('comment', 'post.id', 'comment.post_id')
  .select('post.id as postId', 'title', 'subtitle', 'post.author_id as author_id', 'post.body as body', 'can_comment', 'post.created_at as created_at', 'post.updated_at as updated_at', 'is_positive', 'comment.id as commentId', 'comment.body as commentBody')
  .where('post.id', req.params.postId)
  .then( (data) => {
    console.log(data);
    let post = data[0];
    console.log("post",post);
    let commentable = post.can_comment;
    console.log(post.can_comment);
    var commentForm = "";
    if (commentable) {
      console.log('its true')
      commentForm = "<form class='myForm' action='/new-comment' method='POST'>\
        <input type='hidden' name='post_id' value='"+req.params.postId+"'>\
        Author: <input type='text' id='author_id' name='author_id'>\
        New Comment: <input type='text' id='comment_body' name='comment_body'>\
        Like this post? <input type='checkbox' name='is_positive'> yes\
        <input type='submit' value='submit'>\
      </form>";
    }
    console.log(commentForm)
    res.render('post', { post: post, data:data, commentForm: commentForm});
  })
});


router.get('/new', function(req, res, next) {
  res.render('new');
});

router.post('/new', function (req, res, next) {
  console.log(req.body)
  let can_comment = false;

  if (req.body.can_comment === "true") can_comment = true;

  query.newPost(req.body.title, req.body.subtitle, req.body.author_id, req.body.body, can_comment).then(function() {
    res.render('new', {
      message: "New Post Added Successfully!"
    });
  }).catch(function(err) {
    return next(error)
  })
})

router.post('/new-comment', function (req, res, next) {
  console.log(req.body)
  let is_positive = false;

  if (req.body.is_positive === "on") is_positive = true;

  query.newComment(req.body.post_id, req.body.author_id, req.body.comment_body, is_positive)
  .then(function() {
    res.redirect('/post/'+req.body.post_id);
  }).catch(function(err) {
    return next(err)
  })
})

router.delete('/delete-comment/:commentId', function(req, res, next) {
  console.log("deleting comment "+req.params.commentId);
  query.deleteComment(req.params.commentId)
  .then(function() {
    res.end();
  }).catch(function(err) {
    return next(err)
  })
})

router.delete('/delete-post/:postId', function(req, res, next) {
  console.log("deleting post "+req.params.postId);
  query.deletePost(req.params.postId)
  .then(function() {
    res.end();
  }).catch(function(err) {
    return next(err)
  })
})

module.exports = router;
