var express = require('express');
var router = express.Router();
const { addToDos, getAllToDos, editToDos, deleteToDo, getToDoByUserId } = require("../controllers/toDo")
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', function (req, res, next) {
    res.send("Hello  you r in todo")

});
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/create", addToDos)
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/all", getAllToDos)

router.get("/all/user/:id", getToDoByUserId)

router.put("/edit/:id", editToDos)

router.delete("/delete/:id", deleteToDo)

module.exports = router;
