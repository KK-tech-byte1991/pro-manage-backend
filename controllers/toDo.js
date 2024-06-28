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
        const { toDoName, toDoPriority, endTime, assignedTo, checkLists, createdBy } = req.body;
        console.log(toDoName, toDoPriority, endTime, assignedTo, checkLists, createdBy)

        if (!toDoName || !toDoPriority || !endTime) {
            return res.status(400).send("Please fill all the fields!!!")
        }

        const newToDo = new ToDos({
            toDoName, toDoPriority, endTime, assignedTo, checkLists, createdBy
        })
        await ToDos.findByIdAndUpdate(a, {
            toDoName, toDoPriority, endTime, assignedTo, checkLists, createdBy
        })

        res.status(200).send("Updated Successfully");
    } catch (error) {

    }
}

const addToDos = async (req, res, next) => {

    try {
        const { toDoName, toDoPriority, endTime, assignedTo, checkList, createdBy ,status} = req.body;
        console.log(toDoName, toDoPriority, endTime, assignedTo, checkList, createdBy,checkList)
        if (!toDoName || !toDoPriority || !endTime) {
            return res.status(400).send("Please fill all the required fields!!!")
        }

        const newToDo = new ToDos({
            toDoName,
            toDoPriority,
            endTime,
            assignedTo,
            createdBy,
            checkList,
            status

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

const getToDoByUserId = async (req, res, next) => {
    let a = req.params.id

    try {

        const todos = await ToDos.find().or([{assignedTo:a},{createdBy:a}])
            
        res.status(200).send(todos)

    } catch (error) {
        console.log(error)
    }


    
}

module.exports = { addToDos, getAllToDos, editToDos, deleteToDo, getToDoByUserId }