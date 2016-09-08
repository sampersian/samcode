var express = require('express');
var router = express.Router();
var query = require('../db/query');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users listing. */
router.get('/:pass', function(req, res, next) {
  var before = req.params.pass;
  var hash = bcrypt.hashSync(before, salt);
  console.log(bcrypt.compareSync("password", hash));
  console.log(hash);
  console.log(salt);
  console.log("hello")
  res.send('respond with a resource');
});

module.exports = router;
