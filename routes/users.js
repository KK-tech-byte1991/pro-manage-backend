var express = require('express');
var router = express.Router();
const ToDos = require("../models/toDos");
const { createUser, loginUser, updateUser } = require("../controllers/user")



const getToDo = async (req, res, next) => {
  let a = req.params.id


  try {
    let todo = await ToDos.findById(a)
    res.status(200).send(todo);
  } catch (error) {

  }
}

router.get('/task/:id', getToDo);


router.post("/create", createUser)

router.post("/login", loginUser)

router.post("/updateUser", updateUser)

module.exports = router;
