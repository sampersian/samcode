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
  query.Posts().then( (data) =>{
    let posts = data
    console.log(posts[0]);
    res.render('index', {
      posts: posts
    });
  })
});

router.get('/users', function(req, res, next) {
  if (typeof req.cookies.authorId === "undefined") {
    res.render("signup")
  } else {
    res.render("login")
  }
})

router.get('/new', function(req, res, next) {
  res.render('new');
})

router.post('/new', function(req, res, next) {
  console.log(req.body)
  let can_comment = false;
  if (req.body.can_comment === "true") can_comment = true;

  query.newPost(req.body.title, req.body.author_id, req.body.body, can_comment).then(function() {
    res.render('new', {
      message: "New Post Added Successfully!"
    });
  }).catch(function(err) {
    return next(error)
  })

})


module.exports = router;
