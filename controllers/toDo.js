const ToDos = require("../models/toDos");
const User = require("../models/users");

const getToDo = async (req, res, next) => {
    let a = req.params.id
    try {
        let todo = await ToDos.findById(a)
        res.status(200).send(todo);
    } catch (error) {

    }
}
const deleteToDo = async (req, res, next) => {
    let a = req.params.id
    try {
        await ToDos.findByIdAndDelete(a)
        res.status(200).send("Deleted Successfully");
    } catch (error) {

    }
}
const editToDos = async (req, res, next) => {
    let a = req.params.id


    try {
        const { toDoName, toDoPriority, endTime, assignedTo, checkList, createdBy, status } = req.body;
       

        if (!toDoName || !toDoPriority || !endTime) {
            return res.status(400).send("Please fill all the fields!!!")
        }


        await ToDos.findByIdAndUpdate(a, {
            toDoName, toDoPriority, endTime, assignedTo, checkList, createdBy, status
        })

        res.status(200).send("Updated Successfully");
    } catch (error) {
        console.log("error", error)
    }
}

const addToDos = async (req, res, next) => {

    try {
        const { toDoName, toDoPriority, endTime, assignedTo, checkList, createdBy, status } = req.body;
      
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
function normalizeToDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
const getToDoByUserId = async (req, res, next) => {

    let userId = req.params.id
    let filter = req.query.filter

    let user = await User.findById(userId)

    try {

        const normalizedDate = normalizeToDate(new Date())
        const nextDay = new Date(normalizedDate);

        if (filter == "today") {
            nextDay.setDate(normalizedDate.getDate() + 1);
        }
        else if (filter == "month") {
            nextDay.setDate(normalizedDate.getDate() + 30);
        } else {
            nextDay.setDate(normalizedDate.getDate() + 7);
        }



        const todos = await ToDos.find()
            .or([{ assignedTo: userId }, { createdBy: userId }, { assignedTo: user.email }])
            .and([{
                endTime: {
                    $gte: normalizedDate,
                    $lt: nextDay
                }
            }])




        res.status(200).send(todos)

    } catch (error) {
        console.log(error)
    }



}

const getAnalytics = async (req, res, next) => {
    let a = req.params.id
    let user = await User.findById(a)

    try {

        const todos = await ToDos.find().or([{ assignedTo: a }, { createdBy: a }, { assignedTo: user.email }])

        let BACKLOG = 0;
        let TODO = 0;
        let INPROGRESS = 0;
        let DONE = 0;
        let HIGH = 0;
        let LOW = 0;
        let MODERATE = 0;
        let DUE = 0;

        todos.map((task) => {
            task.status == "BACKLOG" && ++BACKLOG
            task.status == "TODO" && ++TODO
            task.status == "INPROGRESS" && ++INPROGRESS
            task.status == "DONE" && ++DONE
            task.toDoPriority == "HIGH" && ++HIGH
            task.toDoPriority == "MODERATE" && ++MODERATE
            task.toDoPriority == "LOW" && ++LOW
            task.dueDate?.length > 0 && ++DUE
        })

        let analytics = {
            BACKLOG, TODO, INPROGRESS, DONE, HIGH, LOW, MODERATE, DUE
        }

        res.status(200).send(analytics)

    } catch (error) {
        console.log(error)
    }



}

module.exports = { addToDos, getAllToDos, editToDos, deleteToDo, getToDoByUserId, getToDo, getAnalytics }