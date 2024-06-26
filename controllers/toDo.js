const ToDos = require("../models/toDos");



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
   

    try {
        const { toDoName, toDoPriority, endTime, assignedTo, checkLists } = req.body;
        console.log(toDoName, toDoPriority, endTime, assignedTo, checkLists)

        if (!toDoName || !toDoPriority || !endTime) {
            return res.status(400).send("Please fill all the fields!!!")
        }

        const newToDo = new ToDos({
            toDoName, toDoPriority, endTime, assignedTo, checkLists
        })
        await ToDos.findByIdAndUpdate(a, {
            toDoName, toDoPriority, endTime, assignedTo, checkLists
        })

        res.status(200).send("Updated Successfully");
    } catch (error) {

    }
}

const addToDos = async (req, res, next) => {

    try {
        const { toDoName, toDoPriority, endTime, assignedTo, checkLists } = req.body;
        console.log(toDoName, toDoPriority, endTime)
        if (!toDoName || !toDoPriority || !endTime) {
            return res.status(400).send("Please fill all the required fields!!!")
        }

        const newToDo = new ToDos({
            toDoName,
            toDoPriority,
            endTime,
            assignedTo,
            checkLists
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