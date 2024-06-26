var express = require('express');
var router = express.Router();

const { createUser, loginUser, updateUser } = require("../controllers/user")





router.get('/', function (req, res, next) {
  res.send('respond with a ');
});


router.post("/create", createUser)

router.post("/login", loginUser)

router.post("/updateUser", updateUser)

module.exports = router;
