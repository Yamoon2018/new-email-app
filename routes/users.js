var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.json([
      {id: 1, username: "name1"},
     {id: 2, username: "name2"},
      //{id: 3, username: "name3"}
  ]);
});

module.exports = router;
