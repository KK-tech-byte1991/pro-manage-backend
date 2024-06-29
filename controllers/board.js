require('dotenv').config();
const User = require("../models/users");
const Board = require("../models/board")



const getBoardByOwner = async (req, res, next) => {
    let owner = req.params.id


    try {
        let board = await Board.findOne({ owner })
        res.status(200).send(board);
    } catch (error) {
        next(error)
    }
}

const addUserToBoard = async (req, res, next) => {
    let boardId = req.params.id
    let { email } = req.body
    try {
        let board = await Board.findById(boardId);
        let user = await User.findOne({ email });
        let affilitationToBeAdded
        let affiliation = board.affiliation
        if (user) {

            affilitationToBeAdded = { id: user.id, email: user.email }

        } else {
            affilitationToBeAdded = { email: email }
        }

        affiliation.push(affilitationToBeAdded)
        board.affiliation = affiliation

        await Board.findByIdAndUpdate(boardId, board)
        res.status(200).send("Email Added Successfully");

    } catch (error) {

    }

}


module.exports = { getBoardByOwner, addUserToBoard }