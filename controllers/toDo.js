const ToDos = require("../models/toDos");
const Kitten = require("../models/kitten")


const deleteToDo = async (req, res, next) => {
    let a = req.params.id
    // console.log("aaaaaaa",a,req)

    try {


        await ToDos.findByIdAndDelete(a)
        res.status(200).send("Deleted Successfully");
    } catch (error) {

    }
}
const editToDos = async (req, res, next) => {
    let a = req.params.id
    // console.log("aaaaaaa",a,req)

    try {
        const { toDoName, toDoPriority, startTime, endTime } = req.body;
        console.log(toDoName, toDoPriority, startTime, endTime)
        if (!toDoName || !toDoPriority || !startTime || !endTime) {
            return res.status(400).send("Please fill all the fields!!!")
        }
        const newToDo = new ToDos({
            toDoName,
            toDoPriority,
            startTime,
            endTime
        })
        await ToDos.findByIdAndUpdate(a, {
            toDoName,
            toDoPriority,
            startTime,
            endTime
        })

        res.status(200).send("Updated Successfully");
    } catch (error) {

    }
}

const addToDos = async (req, res, next) => {

    try {
        const { toDoName, toDoPriority, startTime, endTime } = req.body;
        console.log(toDoName, toDoPriority, startTime, endTime)
        if (!toDoName || !toDoPriority || !startTime || !endTime) {
            return res.status(400).send("Please fill all the fields!!!")
        }
       
        const newToDo = new ToDos({
            toDoName,
            toDoPriority,
            startTime,
            endTime
        })

        await newToDo.save();
        res.status(201).send("Task Created Successfully");

    } catch (err) {
        next(err)
    }
}

const getAllToDos = async (req, res, next) => {
    try {

        const todos = await ToDos.find()
        res.status(200).send(todos)

    } catch (error) {

    }
}

module.exports = { addToDos, getAllToDos, editToDos, deleteToDo }