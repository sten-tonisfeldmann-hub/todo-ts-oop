import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

export class TodosController {
    private todos: Todo[] = [];

    createTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = (req.body as { task?: string }).task;

            if (!task || task.trim().length === 0) {
                throw new Error("Task cannot be empty");
            }

            const newTodo = new Todo(Math.random().toString(), task.trim());
            this.todos.push(newTodo);

            res.status(201).json({
                message: "Created new todo",
                createdTask: newTodo
            });
        } catch (error) {
            next(error);
        }
    };

    getTodos = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({
                message: "Todos fetched",
                todos: this.todos
            });
        } catch (error) {
            next(error);
        }
    };

    updateTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id;
            const updatedTask = (req.body as { task?: string }).task;

            if (!updatedTask || updatedTask.trim().length === 0) {
                throw new Error("Task cannot be empty");
            }

            const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

            if (todoIndex < 0) {
                throw new Error("Could not find todo with such id");
            }

            const todo = this.todos[todoIndex];

            if (!todo) {
                throw new Error("Could not find todo with such id");
            }

            this.todos[todoIndex] = new Todo(todo.id, updatedTask.trim());

            res.status(200).json({
                message: "Updated todo",
                updatedTask: this.todos[todoIndex]
            });
        } catch (error) {
            next(error);
        }
    };

    deleteTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id;
            const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

            if (todoIndex < 0) {
                throw new Error("Could not find todo with such id");
            }

            const [deletedTodo] = this.todos.splice(todoIndex, 1);

            res.status(200).json({
                message: "Deleted todo",
                deletedTodo
            });
        } catch (error) {
            next(error);
        }
    };
}