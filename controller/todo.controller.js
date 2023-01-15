const { TodoModel } = require("../model/todo.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const getAllTodo = async (req, res) => {
    const token = req.headers.authorization;
    let yourID;
    if (token) {
        const decode = jwt.verify(token, process.env.KEY);
        if (decode) {
            const userID = decode.userID;
            yourID = userID;
           
        }
    }
    const { status, tag } = req.query;
    const queryObject = {userID: yourID}
    if (status) {
        queryObject.status = status;
    }
    if (tag) {
        queryObject.tag = tag;
    }
    try {
        const getTodo = await TodoModel.find(queryObject)
        res.status(200).send(getTodo)
    } catch (err) { 
        console.log("Data cant find");
        res.status(404).send(error)
    }

}

const singleTodo = async (req, res) => {
    const id = req.params.todoID;
    const todo = await TodoModel.findOne({ _id: id });
    const todo_userID = todo.userID;
    const todo_req = req.body.userID;
    try {
        if (todo_req !== todo_userID) {
          res.send("not allowed to get todo u not created this todo")
        console.log("not allowed to get todo");
      } else {
          const userTodo = await TodoModel.findById({_id:id})
            res.send(userTodo)
            console.log("todo get successfully");
      }
    } catch (err) {
      console.log("error to show");
      res.send("error to show todo");
    }
}

const createTodo = async(req, res) => {
    const newTodo = req.body
    try {
        const addTodo = new TodoModel(newTodo)
        await addTodo.save()
        res.send("Todo created  successfully")
    } catch (err) { 
        console.log("cant create todo")
        res.send(err)
    }
};

const patchTodo = async (req, res) => { 
    const todoData = req.body
    const id = req.params.id;
    const todo = await TodoModel.findOne({ _id: id });
    const todo_userID = todo.userID
    const todo_req = req.body.userID;
    try {
        if (todo_req !== todo_userID) { 
            res.send("not allow to update u not created this todo")
            console.log("not allowed to updated")
        } else {
            await TodoModel.findByIdAndUpdate({ _id: id }, todoData, { new: true })
            res.send("todo updated successfully")
        }
        
    } catch (err) { 
        console.log("error updating")
        res.send("error updating todo")
    }
}

const deleteTodo = async(req, res) => { 
    
    const id = req.params.id;
    const todo = await TodoModel.findOne({ _id: id });
    const todo_userID = todo.userID
    const todo_req = req.body.userID;
    try {
        if (todo_req !== todo_userID) { 
            res.send("not allowed to delete");
            console.log("not allowed to delete")
        } else {
            await TodoModel.findByIdAndDelete({ _id: id }, todoData, { new: true })
            res.send("todo deleted successfully")
        }
        
    } catch (err) { 
        console.log("error deleting")
        res.send("error deleting todo")
    }
}

module.exports = { getAllTodo, createTodo, patchTodo, deleteTodo,singleTodo };