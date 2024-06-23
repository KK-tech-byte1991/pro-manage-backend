var express = require('express');
var router = express.Router();
const { createUser, loginUser, updateUser } = require("../controllers/user")
/* GET users listing. */


/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a simple message
 *     responses:
 *       200:
 *         description: A simple message
 */

router.get('/', function (req, res, next) {
  res.send('respond with a ');
});


router.post("/create", createUser)

router.post("/login", loginUser)

router.post("/updateUser", updateUser)

module.exports = router;
