var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let obj = {
    name: '小明',
    age: 23
  }
  res.send(obj);
});

module.exports = router;
