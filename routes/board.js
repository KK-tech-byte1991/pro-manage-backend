var express = require('express');
var router = express.Router();
const { getBoardByOwner, addUserToBoard } = require("../controllers/board")


router.get('/:id/owner', getBoardByOwner);

router.post("/:id", addUserToBoard)

module.exports = router;