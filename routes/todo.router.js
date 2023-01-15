const express = require('express')
const { getAllTodo, createTodo, patchTodo, deleteTodo, singleTodo } = require("../controller/todo.controller");

const todoRouter = express.Router()

todoRouter.get("/", getAllTodo);
todoRouter.get("/:todoID",singleTodo)
todoRouter.post("/create", createTodo)
todoRouter.patch("/update/:id",patchTodo )
todoRouter.delete("/delete/:id",deleteTodo )

module.exports = {todoRouter}
